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
    path: 'flores/:flor/caracteristicas',
    loadComponent: () =>
      import('./pages/caracteristicas/caracteristicas.component').then(
        (c) => c.CaracteristicasComponent,
      ),
  },

  {
    path: 'flores/:flor/cuidados',
    loadComponent: () =>
      import('./pages/cuidados/cuidados.component').then(
        (c) => c.CuidadosComponent,
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
    path: 'floriografia/:flor/significado',
    loadComponent: () =>
      import('./pages/significado/significado.component').then(
        (c) => c.SignificadoComponent,
      ),
  },

  {
    path: '**',
    redirectTo: '',
  },
];
