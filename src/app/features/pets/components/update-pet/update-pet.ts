import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { PetService } from '../../services/pet-service';
import { Router } from '@angular/router';
import { PetRequest } from '../../models/pet-request';
import { PetResponse } from '../../models/pet-response';
import { PetForm } from '../pet-form/pet-form';

@Component({
  selector: 'app-update-pet',
  standalone: true,
  imports: [PetForm],
  templateUrl: './update-pet.html',
  styleUrl: './update-pet.scss'
})
export class UpdatePet implements OnInit {
  private readonly petService = inject(PetService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);

  @Input() id!: string;
  pet?: PetResponse;

  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    const numericId = Number(this.id);

    if (isNaN(numericId)) {
      this.errorMessage = 'Invalid pet ID.';
      this.isLoading = false;
      this.cdr.detectChanges();
      return;
    }

    this.petService.getPetForEdit(numericId).subscribe({
      next: (pet) => {
        this.pet = pet;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Could not load pet.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  updatePet(request: PetRequest): void {
    if (!this.pet) {
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    this.petService.updatePet(this.pet.id, request).subscribe({
      next: (updatedPet) => {
        this.isLoading = false;
        this.router.navigate(['/pets', updatedPet.id]);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Something went wrong while updating the pet.', error);
        this.errorMessage =
          error?.error?.message ||
          'Something went wrong while updating the pet.';
        this.cdr.detectChanges();
      }
    });
  }
}