import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'home',
    loadComponent: () => import('@nx-project/landing-page').then((c) => c.LandingPageComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('@nx-project/about-page').then((c) => c.AboutPageComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('@nx-project/contact-page').then((c) => c.ContactPageComponent),
  },
];
