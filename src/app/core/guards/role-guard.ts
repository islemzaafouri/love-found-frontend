import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/AuthService';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const reuiredRole =route.data['role'];
  const user = authService.currentUser();

  if(user&&user.role=== reuiredRole){
    return true;
  }
  // Redirect to the login page if the user is not authenticated or does not have the required role
  return router.createUrlTree(['/login']);
  
};
