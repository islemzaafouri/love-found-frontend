import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ShelterProfileResponse } from '../models/shelter-profile-response';
import { AdopterProfileResponse } from '../models/adopter-profile-response';
import { ShelterProfileRequest } from '../models/shelter-profile-request';
import { AdopterProfileRequest } from '../models/adopte-profile-request';

@Service()
export class ProfileService {
    private readonly http=inject(HttpClient);
    private readonly API_URL = 'http://localhost:8080/api/profile';

    //SHELTER
    getMyShelterProfile():Observable<ShelterProfileResponse>{
        console.log(' Fetching my shelter profile...');

        return this.http.get<ShelterProfileResponse>(
        `${this.API_URL}/shelter/me`
        );
    }

    updateMyShelterProfile(request: ShelterProfileRequest): Observable<ShelterProfileResponse> {

    return this.http.put<ShelterProfileResponse>(`${this.API_URL}/shelter/me`,request);
    }

    //AOPTER
    getMyAdopterProfile(): Observable<AdopterProfileResponse> {
    console.log(' Fetching my adopter profile...');

    return this.http.get<AdopterProfileResponse>(`${this.API_URL}/adopter/me`);
  }

  updateMyAdopterProfile(request: AdopterProfileRequest): Observable<AdopterProfileResponse> {
    return this.http.put<AdopterProfileResponse>(`${this.API_URL}/adopter/me`,request);
  }



}
