
import { PetSpecies, PetGender, PetStatus, PersonalityTrait } from './pet-enums';
export interface ShelterSummary {
  id: number;
  name: string;
  city: string;
  phone: string;
  decription: string;
}
export interface PetResponse {
  id: number;
  name: string;
  species: PetSpecies;
  gender: PetGender;
  age:number;
  breed: string ;
  photoUrl: string ;
  personalityTraits: PersonalityTrait[];
  rescueStory: string ;
  description: string ;
  status: PetStatus;

  shelter: ShelterSummary;
}