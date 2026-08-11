import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/AuthService';
import { inject } from '@angular/core/primitives/di';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isloggedIn()) {
    return true;
  }
  // Redirect to the login page if the user is not authenticated
  return router.createUrlTree(['/login']);
};
