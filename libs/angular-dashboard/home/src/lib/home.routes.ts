import { Route } from '@angular/router';

export const homeRoutes: Route[] = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent),
  },
];
