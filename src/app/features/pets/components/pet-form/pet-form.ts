import { Component, EventEmitter, inject, Input, Output,SimpleChanges } from '@angular/core';
import { PersonalityTrait, PetGender, PetSpecies } from '../../models/pet-enums';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetRequest } from '../../models/pet-request';
import { PetResponse } from '../../models/pet-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-form',
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './pet-form.html',
  styleUrl: './pet-form.scss',
})
export class PetForm {
  private readonly fb = inject(FormBuilder);

  @Input()
  pet?:PetResponse;

  @Output()
  formSubmit = new EventEmitter<PetRequest>();

  // Available choices for the form
  species: PetSpecies[] = [
    'DOG',
    'CAT',
    'RABBIT',
    'OTHER'
  ];

  genders: PetGender[] = [
    'MALE',
    'FEMALE'
  ];

  personalityTraits: PersonalityTrait[] = [
    'PLAYFUL',
    'CUDDLY',
    'AFFECTIONATE',
    'ENERGETIC',
    'CALM',
    'FRIENDLY',
    'SHY',
    'GENTLE',
    'INDEPENDENT',
    'CURIOUS',
    'PROTECTIVE',
    'LOYAL',
    'SOCIAL',
    'ADVENTUROUS'
  ];

    // Create pet form
    petForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    species: ['DOG' as PetSpecies, [Validators.required]],
    gender: ['MALE' as PetGender, [Validators.required]],
    breed: ['', [Validators.required]],
    photoUrl: ['', [Validators.required]],
    age: [0, [
    Validators.required,
    Validators.min(0)
  ]],
    rescueStory: ['', [Validators.required]],
    description: ['', [Validators.required]],
    personalityTraits: [[] as PersonalityTrait[]]
  });

  // Select / unselect a personality trait
  toggleTrait(trait: PersonalityTrait): void {
  // 1. Grab the list of traits currently selected right now
  const currentTraits = this.petForm.controls.personalityTraits.value;

  // 2. IF it's already selected, REMOVE IT
  if (currentTraits.includes(trait)) {
    this.petForm.controls.personalityTraits.setValue(
      currentTraits.filter(t => t !== trait) // Keep every trait EXCEPT this one
    );
  
  // 3. OTHERWISE, ADD IT
  } else {
    this.petForm.controls.personalityTraits.setValue([
      ...currentTraits, // Copy all existing traits
      trait             // Add the new trait to the end
    ]);
  }
}

  // Check whether a trait is selected
  isTraitSelected(trait: PersonalityTrait): boolean {
    return this.petForm.controls.personalityTraits.value.includes(trait);
  }

  onSubmit(): void {

    if (this.petForm.invalid) {
      this.petForm.markAllAsTouched();
      return;
    }

    this.formSubmit.emit(this.petForm.getRawValue());
  }

  ngOnChanges(changes: SimpleChanges): void {

  if (changes['pet'] && this.pet) {

    this.petForm.patchValue({
      name: this.pet.name,
      age: this.pet.age,
      species: this.pet.species,
      gender: this.pet.gender,
      breed: this.pet.breed,
      photoUrl: this.pet.photoUrl,
      rescueStory: this.pet.rescueStory,
      description: this.pet.description,
      personalityTraits: this.pet.personalityTraits
    });
  }
}

}
