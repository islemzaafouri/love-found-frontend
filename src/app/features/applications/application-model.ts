import { AdopterProfileResponse } from '../profile/models/adopter-profile-response';
import { PetResponse } from '../pets/models/pet-response';

export interface ApplicationResponse {
  id: number;
  adopter: AdopterProfileResponse;
  pet: PetResponse;
  motivation: string;
  status: ApplicationStatus;
  createdAt: string;
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

export interface ApplicationRequest {
  petId: number;
  motivation: string;
}

export interface ApplicationUpdateRequest {
  motivation: string;
}
export interface ApplicationStatusUpdateRequest {
  status: ApplicationStatus;
}