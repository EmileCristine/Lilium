import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },

  {
    path: 'flores',
    loadComponent: () =>
      import('./pages/flores/flores.component').then((c) => c.FloresComponent),
  },

  {
    path: 'flores/:flor',
    loadComponent: () =>
      import('./pages/caracteristicas/caracteristicas.component').then(
        (c) => c.CaracteristicasComponent,
      ),
  },

  {
    path: 'floriografia',
    loadComponent: () =>
      import('./pages/floriografia/floriografia.component').then(
        (c) => c.FloriografiaComponent,
      ),
  },

  {
    path: '**',
    redirectTo: '',
  },
];
