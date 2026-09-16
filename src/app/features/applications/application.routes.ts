import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role-guard';

export const APPLICATION_ROUTES: Routes = [
  {
    path: 'my',
    canActivate: [roleGuard],
    data: { role: 'ADOPTER' },
    loadComponent: () =>
      import('./my-applications/my-applications').then(m => m.MyApplications)
  },
  {
    path: 'my/:applicationId',
    canActivate: [roleGuard],
    data: { role: 'ADOPTER' },
    loadComponent: () =>
      import('./application-details/application-details').then(m => m.ApplicationDetails)
  },
  {
    path: 'shelter',
    canActivate: [roleGuard],
    data: { role: 'SHELTER' },
    loadComponent: () =>
      import('./my-applications/my-applications').then(m => m.MyApplications)
  },
  {
    path: 'shelter/:applicationId',
    canActivate: [roleGuard],
    data: { role: 'SHELTER' },
    loadComponent: () =>
      import('./application-details/application-details').then(m => m.ApplicationDetails)
  },

  
  {
    path: ':petId',
    canActivate: [roleGuard],
    data: { role: 'ADOPTER' },
    loadComponent: () =>
      import('./adopter-application/adopter-application').then(m => m.AdopterApplication)
  }
];