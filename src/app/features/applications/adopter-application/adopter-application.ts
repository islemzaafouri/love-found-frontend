import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationRequest } from '../application-model';
import { ApplicationService } from '../application-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adopter-application',
  imports: [],
  templateUrl: './adopter-application.html',
  styleUrl: './adopter-application.scss',
})
export class AdopterApplication {
  private fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly applicationService = inject(ApplicationService);
  private readonly router = inject(Router);

  @Input() petId!: string;
  loading = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    const numericId = Number(this.petId);

    if (isNaN(numericId)) {
      this.errorMessage = 'Invalid pet ID.';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }
  }

  applicationForm = this.fb.nonNullable.group({motivation: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]]});

  submitApplication() {
  if (this.applicationForm.invalid) {
    this.applicationForm.markAllAsTouched();
    return;}
  this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

  const request: ApplicationRequest = {
    petId: Number(this.petId),
    motivation: this.applicationForm.getRawValue().motivation
    };

  this.applicationService.createApplication(request).subscribe({
    next: (response) => {
      this.successMessage = 'Application submitted successfully!';
      this.loading = false;
      this.applicationForm.reset();
      this.cdr.detectChanges();
    },
    error: (error) => {
      this.errorMessage = 'Failed to submit application. Please try again.';
      this.loading = false;
      this.cdr.detectChanges();
    }
  })
}

goBack(): void {
    this.router.navigate(['/pets', this.petId]);
  }

}
