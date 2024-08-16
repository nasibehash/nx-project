import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@nx-project/home').then((lib) => lib.homeRoutes),
  },
  {
    path: 'login',
    loadChildren: () => import('@nx-project/auth').then((lib) => lib.authRoutes),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
