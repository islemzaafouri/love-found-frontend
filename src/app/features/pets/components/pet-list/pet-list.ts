// pet-list.ts
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { PetService } from '../../services/pet-service';
import { PetResponse } from '../../models/pet-response';
import { PetCard } from '../pet-card/pet-card';
import { PetSpecies } from '../../models/pet-enums';
import { FormsModule } from '@angular/forms';
import { LowerCasePipe ,TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [PetCard,FormsModule,LowerCasePipe,TitleCasePipe],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.scss',
})
export class PetList implements OnInit {
  private petService = inject(PetService);
  private readonly cdr = inject(ChangeDetectorRef);

  pets: PetResponse[] = [];
  isLoading = true;
  errorMessage = '';

  // Species available in the search
  species: PetSpecies[] = [
    'DOG',
    'CAT',
    'RABBIT',
    'OTHER'
  ];

  selectedSpecies: PetSpecies | '' = '';


  ngOnInit(): void {
    this.loadPets();
  }

  loadPets():void{
    this.petService.getAvailablePets().subscribe({
      next: (pets) => {
        this.pets = pets;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to load pets. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  searchBySpecies():void{
    // If no species is selected, show all pets again
    if(!this.selectedSpecies){
      this.loadPets();
      return;
    }
    this.petService.getPetsBySpecies(this.selectedSpecies).subscribe(
      {
        next:(pets)=>{this.pets=pets;
          this.isLoading = false;
        this.cdr.detectChanges();
        },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to load pets by species. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }

      }
    )
  }
  // Clear the search
  clearSearch(): void {
    this.selectedSpecies = '';
    this.loadPets();
  }
}

