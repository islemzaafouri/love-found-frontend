import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PetService } from '../../services/pet-service';
import { PetResponse } from '../../models/pet-response';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/AuthService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pet-detail',
  imports: [RouterLink,CommonModule],
  templateUrl: './pet-detail.html',
  styleUrl: './pet-detail.scss',
})
export class PetDetail {
  @Input() id!:string;

  private readonly petService=inject(PetService);
  private readonly cdr = inject(ChangeDetectorRef);
  private  authService=inject(AuthService)

  pet?: PetResponse;
  isLoading = true;
  errorMessage = '';
  isShelterOwner = false;

  ngOnInit(): void {
    const numericId = Number(this.id);

    if (isNaN(numericId)) {
      this.errorMessage = 'Invalid pet ID.';
      this.isLoading = false;
      this.cdr.detectChanges();
      return;
    }
    const currentUser = this.authService.getCurrentUser();
    console.log('Current user:', currentUser);
    console.log(' Current user:', currentUser);
    console.log(' Current user role:', currentUser?.role);
    console.log(' Current user profileId:', currentUser?.profileId);


    this.petService.getPetById(numericId).subscribe({
      next: (pet) => {
        this.pet = pet;
        console.log('Pet:', pet);
        console.log('Pet shelterId:', pet.shelter?.id);

        this.isShelterOwner =currentUser?.role === 'SHELTER'&&
        currentUser?.profileId === pet.shelter?.id;

        console.log(' Profile ID check:',currentUser?.profileId === pet.shelter?.id);

        this.isShelterOwner =
          currentUser?.role === 'SHELTER' &&
          currentUser?.profileId === pet.shelter?.id;

        console.log(' FINAL isShelterOwner:',this.isShelterOwner);

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Could not load pet details.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
  deactivatePet(id: number): void {
    console.log(' DELETE request → /pets/' + id + '/deactivate');
   this.petService.deactivatePet(id).subscribe({
    next: () => {
      console.log('Pet deactivated successfully!');
    
    },
    error: (err) => {
      console.error('Failed to deactivate pet:', err);
      this.errorMessage = err?.error?.message || 'Failed to deactivate pet.';
    }
  });
  }

}
