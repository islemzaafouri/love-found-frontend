import { Routes } from '@angular/router';

import { AdopterProfile } from './components/adopter-profile/adopter-profile';
import { ShelterProfile } from './components/shelter-profile/shelter-profile';

import { authGuard } from '../../core/guards/auth-guard';
import { roleGuard } from '../../core/guards/role-guard';

export const PROFILE_ROUTES: Routes = [

  {
    path: 'adopter',
    component: AdopterProfile,
    canActivate: [authGuard, roleGuard],
    data: {
      role: ['ADOPTER']
    }
  },

  {
    path: 'shelter',
    component: ShelterProfile,
    canActivate: [authGuard, roleGuard],
    data: {
      role: ['SHELTER']
    }
  }

];