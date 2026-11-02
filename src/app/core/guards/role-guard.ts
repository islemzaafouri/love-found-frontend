import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/AuthService';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const configuredRoles = route.data['role'] as string | string[] | undefined;
  const requiredRoles = Array.isArray(configuredRoles)
    ? configuredRoles
    : configuredRoles
      ? [configuredRoles]
      : [];

  const user = authService.currentUser();

  if (user && requiredRoles.includes(user.role)) {
    return true;
  }

  return router.createUrlTree(['/pets']);
};
