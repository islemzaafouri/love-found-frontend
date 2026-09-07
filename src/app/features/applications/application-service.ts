import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ApplicationRequest, ApplicationResponse, ApplicationStatusUpdateRequest, ApplicationUpdateRequest } from './application-model';
import { Observable } from 'rxjs/internal/Observable';

@Service()
export class ApplicationService {
    private http=inject(HttpClient);
    private baseUrl='http://localhost:8080/api/applications';
    //ADOPTER
    createApplication(request:ApplicationRequest):Observable<ApplicationResponse>{
        return this.http.post<ApplicationResponse>(this.baseUrl,request);
    }
    getMyApplications():Observable<ApplicationResponse[]>{
        return this.http.get<ApplicationResponse[]>(`${this.baseUrl}/my-applications`);
    }
    updateMyApplication(applicationId:number,request:ApplicationUpdateRequest):Observable<ApplicationResponse>{
        return this.http.put<ApplicationResponse>(`${this.baseUrl}/${applicationId}`,request);
    }
    cancelMyApplication(applicationId:number):Observable<void>{
        return this.http.delete<void>(`${this.baseUrl}/${applicationId}`);
    }
    //SHELTER
    getApplicationsForMyShelter():Observable<ApplicationResponse[]>{
        return this.http.get<ApplicationResponse[]>(`${this.baseUrl}/shelter-applications`);
    }
    updateApplicationStatus(applicationId:number,request:ApplicationStatusUpdateRequest):Observable<ApplicationResponse>{
        return this.http.put<ApplicationResponse>(`${this.baseUrl}/${applicationId}/status`,request);
    }


}
