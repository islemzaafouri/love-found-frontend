import { Component, inject } from '@angular/core';
import { PetResponse } from '../pets/models/pet-response';
import { PetService } from '../pets/services/pet-service';
import {PetCard} from '../pets/components/pet-card/pet-card';
import { Router } from '@angular/router';
import { ProfileService } from '../profile/services/profile-service';
import { ShelterProfileResponse } from '../profile/models/shelter-profile-response';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [PetCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  
  private readonly petService = inject(PetService);
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  //SHELTER PROFILE
  shelter?: ShelterProfileResponse;

  isLoadingProfile = true;
  profileErrorMessage = '';

  //PETS
  pets: PetResponse[] = [];

  isLoadingPets = false;
  petsErrorMessage = '';

  showPets = false;

  //INITIALIZATION
  ngOnInit(): void {

    this.loadShelterProfile();

  }

  //LOAD SHELTER PROFILE
  private loadShelterProfile(): void {

    console.log(' Loading shelter profile...');

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

        console.error(
          ' Failed to load shelter profile:',
          error
        );

        this.profileErrorMessage =
          error?.error?.message ||
          'Could not load your shelter profile.';

        this.isLoadingProfile = false;
        this.cdr.markForCheck();
      }
    });
  }

  //LOAD PETS
  loadMyPets(): void {

    if (!this.shelter?.id) {

      console.error(
        ' Cannot load pets: shelter profile ID is missing.'
      );

      this.petsErrorMessage =
        'Could not identify your shelter.';

      return;
    }

    const shelterId = this.shelter.id;

    console.log(
      'Loading pets for shelter ID:',
      shelterId
    );

    this.isLoadingPets = true;
    this.petsErrorMessage = '';
    this.showPets = true;

    this.petService.getPetsByShelterId(shelterId).subscribe({

      next: (pets) => {

        console.log('Shelter pets loaded:', pets);

        this.pets = pets;
        this.isLoadingPets = false;
        this.cdr.markForCheck();
      },

      error: (error) => {

        console.error(
          'Failed to load shelter pets:',
          error
        );

        this.petsErrorMessage =
          error?.error?.message ||
          'Could not load your pets.';

        this.isLoadingPets = false;
        this.cdr.markForCheck();
      }

    });
  }

  
  goToCreatePet(): void {
    console.log('Navigating to create pet');

    this.router.navigate(['/pets/create']);
  }

  goToPetDetails(petId: number): void {

    console.log(
      'Navigating to pet details:',
      petId
    );

    this.router.navigate(['/pets', petId]);

  }
  goToProfile(): void {
  console.log('Navigating to shelter profile...');

  this.router.navigate(['/profile/shelter']);
}
}
