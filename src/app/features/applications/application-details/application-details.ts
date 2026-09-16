import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { ApplicationService } from '../application-service';
import { ApplicationResponse, ApplicationStatus, ApplicationStatusUpdateRequest } from '../application-model';
import { AuthService } from '../../../core/services/AuthService';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationUpdateRequest } from '../application-model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-application-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './application-details.html',
  styleUrl: './application-details.scss',
})
export class ApplicationDetails implements OnInit {
  @Input() applicationId!: string;

  private readonly applicationService = inject(ApplicationService);
  private readonly authService = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  applicationDetails?: ApplicationResponse;
  isLoading = true;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  isShelterOwner = false;

  updateApplicationForm = this.fb.nonNullable.group({
    motivation: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]]
  });

  updateStatus = this.fb.nonNullable.group({
    status: [ApplicationStatus.PENDING as ApplicationStatus, [Validators.required]]
  });

  ngOnInit(): void {
    const numericId = Number(this.applicationId);

    if (isNaN(numericId)) {
      this.errorMessage = 'Invalid application ID provided.';
      this.isLoading = false;
      return;
    }

    const currentUser = this.authService.getCurrentUser();

    this.applicationService.getApplicationById(numericId).subscribe({
      next: (application) => {
        this.applicationDetails = application;

        this.isShelterOwner =
          currentUser?.role === 'SHELTER' &&
          currentUser?.profileId === application.pet.shelter?.id;

        this.updateApplicationForm.patchValue({ motivation: application.motivation });
        this.updateStatus.patchValue({ status: application.status });

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching application details:', error);
        this.errorMessage = error?.error?.message 
          || (typeof error?.error === 'string' ? error.error : null) 
          || 'Could not load application details. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  updateMyApplication(): void {
    if (this.updateApplicationForm.invalid) {
      this.updateApplicationForm.markAllAsTouched();
      return;
    }

    if (!this.applicationDetails) return;

    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    const request: ApplicationUpdateRequest = {
      motivation: this.updateApplicationForm.getRawValue().motivation
    };

    this.applicationService.updateMyApplication(this.applicationDetails.id, request).subscribe({
      next: (updatedApplication) => {
        this.applicationDetails = updatedApplication;
        this.successMessage = 'Application motivation updated successfully!';
        this.isSubmitting = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to update application:', error);
        this.errorMessage = error?.error?.message 
          || (typeof error?.error === 'string' ? error.error : null) 
          || 'Failed to update application. Please try again.';
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }

  cancelMyApplication(): void {
    if (!this.applicationDetails) return;

    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    this.applicationService.cancelMyApplication(this.applicationDetails.id).subscribe({
      next: () => {
        this.applicationDetails!.status = ApplicationStatus.CANCELLED;
        this.updateStatus.patchValue({ status: ApplicationStatus.CANCELLED });
        this.successMessage = 'Application cancelled successfully.';
        this.isSubmitting = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to cancel application:', error);
        this.errorMessage = error?.error?.message 
          || (typeof error?.error === 'string' ? error.error : null) 
          || 'Failed to cancel application. Please try again.';
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }

  updateApplicationStatus(): void {
    if (!this.applicationDetails) return;

    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    const request: ApplicationStatusUpdateRequest = {
      status: this.updateStatus.getRawValue().status
    };

    this.applicationService.updateApplicationStatus(this.applicationDetails.id, request).subscribe({
      next: (updatedApplication) => {
        this.applicationDetails = updatedApplication;
        this.successMessage = `Application status changed to ${updatedApplication.status}.`;
        this.isSubmitting = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to update application status:', error);
        this.errorMessage = error?.error?.message 
          || (typeof error?.error === 'string' ? error.error : null) 
          || 'Failed to update application status. Please try again.';
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/applications/my']);
  }
}