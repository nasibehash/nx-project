import { Route } from '@angular/router';

export const usersRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./users-list/users-list.component').then((c) => c.UsersListComponent),
  },
];
