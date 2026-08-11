import { inject, Service, signal, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../../features/auth/models/login-request.model';
import { AuthResponse } from '../../features/auth/models/auth-response.model';
import { Register } from '../../features/auth/components/register/register';
import { RegisterAdopterRequest } from '../../features/auth/models/register-adopter-request.model';
import {UserModel} from "../../core/models/user.model";
import { TokenService } from './TokenService';
import { RegisterShelterRequest } from '../../features/auth/models/register-shelter-request.model';


@Service()
export class AuthService {
    private http = inject(HttpClient);
    private tokenService = inject(TokenService);

    private API_URL = 'http://localhost:8080/api/auth';

    currentUser=signal<UserModel | null>(this.loadUserFromStorage());

    login (request:LoginRequest):Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/login`, request)
        .pipe(
            // Save the token and user information upon successful login
            tap((authResponse: AuthResponse) => {
                this.SaveSession(authResponse);
            })
        );
    }

    registerAdopter(request:RegisterAdopterRequest):Observable<String> {
        return this.http.post<String>(`${this.API_URL}/register/adopter`, request,{responseType: 'text'});
    }

    registerShelter(request:RegisterShelterRequest):Observable<String> {
        return this.http.post<String>(`${this.API_URL}/register/shelter`, request ,{responseType: 'text'});
    }

    logout(): void {
        this.tokenService.removeToken();
        localStorage.removeItem('user');
        this.currentUser.set(null);
    }

    isloggedIn(): boolean {
        return this.tokenService.hasToken();
    }

    private SaveSession(authResponse: AuthResponse): void {
        this.tokenService.saveToken(authResponse.token);
        const user: UserModel = { email: authResponse.email, role: authResponse.role };
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.set(user);
    }

    private loadUserFromStorage(): UserModel | null {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            return JSON.parse(storedUser) as UserModel;
        }
        return null;
    }


}
