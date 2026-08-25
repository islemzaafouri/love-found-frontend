

import { PetSpecies, PetGender, PersonalityTrait } from './pet-enums';

export interface PetRequest {
  name: string;
  species: PetSpecies;
  gender: PetGender;
  breed?: string;
  age:number;
  photoUrl: string;
  personalityTraits: PersonalityTrait[];
  rescueStory: string;
  description: string;
}