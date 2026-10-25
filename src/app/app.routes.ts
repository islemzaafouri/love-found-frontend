import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
    //default page 
    {
        path: '',
        loadComponent: () =>
        import('./features/home/home')
        .then(m => m.Home),
        pathMatch:'full'
    },

    //Authentication 
    {
        path:'auth',
        loadChildren:()=>import('./features/auth/auth.routes').then(m=>m.AUTH_ROUTES)
    },

    //Pets
    {
        path:'pets',
        loadChildren:()=>import('./features/pets/pets.routes').then(m=>m.PETS_ROUTES)
    },

    //dashboard
    {
        path:'dashboard',
        loadComponent: () =>
        import('./features/dashboard/dashboard')
        .then(m => m.Dashboard),
        canActivate: [authGuard,roleGuard],
        data: {
            role: ['SHELTER']
        }
    },

    //PROFILE
    {
    path: 'profile',
    loadChildren: () =>
        import('./features/profile/profile.routes')
        .then(m => m.PROFILE_ROUTES)
    },

    //APPLICATIONS
    {
        path: 'applications',
        loadChildren: () =>
        import('./features/applications/application.routes')
        .then(m => m.APPLICATION_ROUTES)
    },

    {
        path: 'my-pets',
        loadComponent: () =>
        import('./features/shelter-pets-component/shelter-pets-component')
        .then(m => m.ShelterPets),
    }
,
    //unknown URL
    {
        path:'**',
        redirectTo:'home',
        pathMatch:'full'
    }


];
