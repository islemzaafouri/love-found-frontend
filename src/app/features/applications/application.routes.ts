import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role-guard';

export const APPLICATION_ROUTES: Routes = [
    {
        path:'/:petId',
        canActivate: [roleGuard],
        data: { role: 'ADOPTER' },
        loadComponent:() => 
        import('./adopter-application/adopter-application').then(m => m.AdopterApplication)
    },
        
    
    

    
    
      
];