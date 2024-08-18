import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@nx-project/user';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@nx-project/home').then((lib) => lib.homeRoutes),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
