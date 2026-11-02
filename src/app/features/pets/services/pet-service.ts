import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { PetResponse } from '../models/pet-response';
import { PetRequest } from '../models/pet-request';
import { PetSpecies } from '../models/pet-enums';
import { environment } from '../../../../environments/environment';

@Service()
export class PetService {
    private http=inject(HttpClient);
    private readonly baseUrl = `${environment.apiBaseUrl}/pets`;

    getAvailablePets():Observable<PetResponse[]>{
        return this.http.get<PetResponse[]>(this.baseUrl)
    }

    getPetById(id:number):Observable<PetResponse>{
        return this.http.get<PetResponse>(`${this.baseUrl}/${id}`);
    }
    getPetsByShelterId(shelterId: number): Observable<PetResponse[]> {
    return this.http.get<PetResponse[]>(`${this.baseUrl}/shelter/${shelterId}`);
  }

  getPetsBySpecies(species: PetSpecies): Observable<PetResponse[]> {
    return this.http.get<PetResponse[]>(`${this.baseUrl}/species/${species}`);
  }

  getPetForEdit(id:number):Observable<PetResponse>{
        return this.http.get<PetResponse>(`${this.baseUrl}/${id}/edit`);
    }

  createPet(request: PetRequest): Observable<PetResponse> {
    return this.http.post<PetResponse>(this.baseUrl, request);
  }

  updatePet(id: number, request: PetRequest): Observable<PetResponse> {
    return this.http.put<PetResponse>(`${this.baseUrl}/${id}`, request);
  }

  deactivatePet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  activatePet(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/activate/${id}`, {});
  }
}

