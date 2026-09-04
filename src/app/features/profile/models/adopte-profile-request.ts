import {
  LifeStyleActivity,
  ExperienceLevel,
  HomeType,
  WorkSchedule,
  PreferredSpecies
} from '../enums/profile-enums';

export interface AdopterProfileRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;

  lifestyleActivity: LifeStyleActivity;
  experience: ExperienceLevel;
  homeType: HomeType;

  hasOtherPets: boolean;
  hasChildren: boolean;

  workSchedule: WorkSchedule;
  preferredSpecies: PreferredSpecies;

  hasAllergies: boolean;
}