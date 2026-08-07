import { SignificadoComponent } from './pages/significado/significado.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'flores',
    loadComponent: () =>
      import('./pages/flores/flores.component').then(c => c.FloresComponent)
  },
  {
    path: 'floriografia',
    loadComponent: () => 
        import('./pages/floriografia/floriografia.component').then(c => c.FloriografiaComponent)
  },
  {
    path: 'flores/:flor/caracteristicas',
    loadComponent: () =>
      import('./pages/caracteristicas/caracteristicas.component')
        .then(c => c.CaracteristicasComponent)
  },
  {
    path: 'floriografia/:nome/significado',
    loadComponent: () =>
      import('./pages/significado/significado.component')
        .then(c => c.SignificadoComponent)
  },
  {
    path: 'flores/:flor/cuidados',
    loadComponent: () =>
      import('./pages/cuidados/cuidados.component')
        .then(c => c.CuidadosComponent)
  },
  {
    path: 'flores/:flor/floriografia',
    loadComponent: () =>
      import('./pages/floriografia/floriografia.component')
        .then(c => c.FloriografiaComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];