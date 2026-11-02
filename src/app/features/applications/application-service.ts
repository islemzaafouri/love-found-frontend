import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ApplicationRequest, ApplicationResponse, ApplicationStatusUpdateRequest, ApplicationUpdateRequest } from './application-model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Service()
export class ApplicationService {
    private http=inject(HttpClient);
    private readonly baseUrl = `${environment.apiBaseUrl}/applications`;
    //ADOPTER
    createApplication(request:ApplicationRequest):Observable<ApplicationResponse>{
        return this.http.post<ApplicationResponse>(this.baseUrl,request);
    }
    getMyApplications():Observable<ApplicationResponse[]>{
        return this.http.get<ApplicationResponse[]>(`${this.baseUrl}/my-applications`);
    }
    getApplicationById(applicationId:number):Observable<ApplicationResponse>{
        return this.http.get<ApplicationResponse>(`${this.baseUrl}/${applicationId}`);
    }
    updateMyApplication(applicationId:number,request:ApplicationUpdateRequest):Observable<ApplicationResponse>{
        return this.http.put<ApplicationResponse>(`${this.baseUrl}/${applicationId}`,request);
    }
    cancelMyApplication(applicationId:number):Observable<void>{
        return this.http.put<void>(`${this.baseUrl}/${applicationId}/cancel`,{});
    }
    //SHELTER
    getApplicationsForMyShelter():Observable<ApplicationResponse[]>{
        return this.http.get<ApplicationResponse[]>(`${this.baseUrl}/shelter-applications`);
    }
    updateApplicationStatus(applicationId:number,request:ApplicationStatusUpdateRequest):Observable<ApplicationResponse>{
        return this.http.put<ApplicationResponse>(`${this.baseUrl}/${applicationId}/status`,request);
    }

    
}
