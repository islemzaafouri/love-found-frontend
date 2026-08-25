export interface UserModel {
    email: string;
    role: 'ADOPTER' | 'SHELTER' | 'ADMIN';
    profileId: number;
}
