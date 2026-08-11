import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
    //default page 
    {
        path: '',
        redirectTo:'auth',
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
            roles: ['SHELTER']
        }
    },
    //unknown URL
    {
        path:'**',
        redirectTo:'pets'
    }


];
