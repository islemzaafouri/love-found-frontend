import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PetCard } from '../pets/components/pet-card/pet-card';
import { Router, RouterLink } from '@angular/router';
import { PetService } from '../pets/services/pet-service';
import { ProfileService } from '../profile/services/profile-service';
import { PetResponse } from '../pets/models/pet-response';

@Component({
  selector: 'app-shelter-pets',
  imports: [PetCard],
  templateUrl: './shelter-pets-component.html',
  styleUrl: './shelter-pets-component.scss',
})
export class ShelterPets implements OnInit {
  private readonly petService = inject(PetService);
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  pets: PetResponse[] = [];
  isLoadingPets = true;
  petsErrorMessage = '';

  ngOnInit(): void {
    this.loadMyPets();
  }

  loadMyPets(): void {
    this.isLoadingPets = true;
    this.petsErrorMessage = '';

    // 1. Get profile first to extract shelter ID securely
    this.profileService.getMyShelterProfile().subscribe({
      next: (shelter) => {
        if (!shelter?.id) {
          this.petsErrorMessage = 'Could not identify your shelter.';
          this.isLoadingPets = false;
          this.cdr.markForCheck();
          return;
        }

        // 2. Load pets using the shelter ID
        this.petService.getPetsByShelterId(shelter.id).subscribe({
          next: (pets) => {
            this.pets = pets;
            this.isLoadingPets = false;
            this.cdr.markForCheck();
          },
          error: (error) => {
            this.petsErrorMessage =
              error?.error?.message || 'Could not load your pets.';
            this.isLoadingPets = false;
            this.cdr.markForCheck();
          }
        });
      },
      error: (error) => {
        this.petsErrorMessage = 'Failed to load shelter details.';
        this.isLoadingPets = false;
        this.cdr.markForCheck();
      }
    });
  }

  goToPetDetails(petId: number): void {
    this.router.navigate(['/pets', petId]);
  }

  goToCreatePet(): void {
    this.router.navigate(['/pets/create']);
  }
}
