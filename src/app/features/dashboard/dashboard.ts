import { Component, inject } from '@angular/core';
import { PetResponse } from '../pets/models/pet-response';
import { AuthService } from '../../core/services/AuthService';
import { PetService } from '../pets/services/pet-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly authService = inject(AuthService);
  private readonly petService = inject(PetService);
  private readonly router = inject(Router);

  myPets: PetResponse[] = [];

  isLoading = false;
  errorMessage = '';

  loadMyPets(): void {

    const currentUser = this.authService.currentUser();

    if (!currentUser?.profileId) {
      console.error('Shelter profile ID not found.');
      this.errorMessage = 'Could not identify your shelter.';
      return;
    }

    const shelterId = currentUser.profileId;

    this.isLoading = true;
    this.errorMessage = '';

    console.log('Loading pets for shelter:', shelterId);

    this.petService.getPetsByShelterId(shelterId).subscribe({

      next: (pets) => {

        console.log('My pets:', pets);

        this.myPets = pets;
        this.isLoading = false;
      },

      error: (error) => {
        console.error( 'Failed to load my pets:', error);

        this.errorMessage =
          error?.error?.message ||
          'Could not load your pets.';

        this.isLoading = false;
      }
    });
  }
  goToCreatePet(): void {
    console.log('Navigating to create pet');

    this.router.navigate(['/pets/create']);
  }
}
