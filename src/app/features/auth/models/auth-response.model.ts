export interface AuthResponse {
  token: string;
  email: string;
  role: 'ADOPTER' | 'SHELTER' | 'ADMIN';
  profileId:number;
}