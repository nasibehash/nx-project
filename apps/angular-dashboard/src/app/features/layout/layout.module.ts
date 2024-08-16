import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { AuthGuard } from '@nx-project/user';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  providers: [AuthGuard]
})
export class LayoutModule { }
