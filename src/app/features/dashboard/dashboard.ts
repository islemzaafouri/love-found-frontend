import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../profile/services/profile-service';
import { ShelterProfileResponse } from '../profile/models/shelter-profile-response';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  // SHELTER PROFILE
  shelter?: ShelterProfileResponse;
  isLoadingProfile = true;
  profileErrorMessage = '';

  ngOnInit(): void {
    this.loadShelterProfile();
  }

  private loadShelterProfile(): void {
    console.log('Loading shelter profile...');
    this.isLoadingProfile = true;
    this.profileErrorMessage = '';

    this.profileService.getMyShelterProfile().subscribe({
      next: (shelter) => {
        console.log('Shelter profile loaded:', shelter);
        this.shelter = shelter;
        this.isLoadingProfile = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Failed to load shelter profile:', error);
        this.profileErrorMessage =
          error?.error?.message || 'Could not load your shelter profile.';
        this.isLoadingProfile = false;
        this.cdr.markForCheck();
      }
    });
  }

  // NAVIGATE TO SHELTER PETS PAGE
  goToMyPets(): void {
    this.router.navigate(['/my-pets']);
  }

  goToCreatePet(): void {
    this.router.navigate(['/pets/create']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile/shelter']);
  }

  goToApplications(): void {
  this.router.navigate(['/applications/shelter']);
}
}