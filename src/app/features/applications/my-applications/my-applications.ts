import { ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApplicationService } from '../application-service';
import { ApplicationResponse } from '../application-model'; 
import { AuthService } from '../../../core/services/AuthService';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-applications.html',
  styleUrl: './my-applications.scss'
})
export class MyApplications implements OnInit {
  private readonly applicationService = inject(ApplicationService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isShelterView = false;
  cdr=inject(ChangeDetectorRef);

  applications: ApplicationResponse[] = [];
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    this.isShelterView = currentUser?.role === 'SHELTER';
    this.fetchApplications();
  }

  fetchApplications(): void {
    this.loading = true;
    this.errorMessage = '';

    const fetch$ = this.isShelterView 
      ? this.applicationService.getApplicationsForMyShelter() 
      : this.applicationService.getMyApplications();

    fetch$.subscribe({
        next: (applications) => {
        console.log('Backend Response Payload:', applications);        
        this.applications = applications;
        this.loading = false;
        this.cdr.detectChanges();

      },
      error: (error) => {
        console.error('Failed to fetch applications:', error);
        this.errorMessage = 'Failed to load applications. Please try again later.';
        this.loading = false;
        this.cdr.detectChanges();

      }
    });
  }

  viewApplication(applicationId: number): void {
  console.log('viewApplication called with:', applicationId, typeof applicationId);
  const routePrefix = this.isShelterView ? '/applications/shelter' : '/applications/my';
  console.log('routePrefix:', routePrefix);
  this.router.navigate([routePrefix, applicationId]);
}
}