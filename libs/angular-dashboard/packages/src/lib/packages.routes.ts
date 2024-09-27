import { Route } from '@angular/router';

export const packagesRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./packages/packages.component').then((c) => c.PackagesComponent),
  },
];
