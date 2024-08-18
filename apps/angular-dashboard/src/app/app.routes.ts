import { Route } from '@angular/router';
import { LayoutComponent } from './features/layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./features/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('@nx-project/auth').then((lib) => lib.authRoutes),
  },
];
