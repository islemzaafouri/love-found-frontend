import {  Component, inject } from '@angular/core';
import { PetService } from '../../services/pet-service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PetRequest } from '../../models/pet-request';
import { PetForm } from '../pet-form/pet-form';

@Component({
  selector: 'app-create-pet',
  imports: [CommonModule,PetForm],
  templateUrl: './create-pet.html',
  styleUrl: './create-pet.scss',
})
export class CreatePet {
 
  private readonly petService = inject(PetService);
  private readonly router = inject(Router);

  

  isLoading = false;
  errorMessage = '';

  createPet(request: PetRequest): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.petService.createPet(request).subscribe({

      next: (pet) => {

        this.isLoading = false;

        this.router.navigate(['/pets',pet.id]);
      },

      error: (error) => {

        this.isLoading = false;

        this.errorMessage =
          error?.error?.message ||
          'Something went wrong while creating the pet.';
      }
    });}

}
