import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role-guard';

export const PETS_ROUTES: Routes = [
    {
        path:'',
        loadComponent:() => 
        import('./components/pet-list/pet-list').then(m => m.PetList)

    },

    // Create pet
    {
    path: 'create',
    canActivate: [roleGuard], 
    data: { role: 'SHELTER' },
    loadComponent: () =>
      import('./components/create-pet/create-pet')
        .then(m => m.CreatePet)
    },

    //update pet
    {
        path:'update/:id',
        canActivate: [roleGuard], 
        data: { role: 'SHELTER' },
        loadComponent: () =>
        import('./components/update-pet/update-pet')
        .then(m => m.UpdatePet)
    },

    //get pet by id
    {   
        path:':id',
        loadComponent:() => 
        import('./components/pet-detail/pet-detail').then(m => m.PetDetail)
    },

    
      
];