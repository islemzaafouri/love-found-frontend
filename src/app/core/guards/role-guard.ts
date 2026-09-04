import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/AuthService";

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Cast as string[] to get proper array methods
  const requiredRoles = route.data['role'] as string[];
  const user = authService.currentUser();

  console.log('🔐 Role Guard');
  console.log('Current user:', user);
  console.log('Current role:', user?.role);
  console.log('Allowed roles:', requiredRoles);

  
  if (user && requiredRoles.includes(user.role)) {
    return true;
  }

  // Redirect to /pets if unauthorized
  return router.createUrlTree(['/pets']);
};
