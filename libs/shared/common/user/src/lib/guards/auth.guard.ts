// import { CanActivateFn } from '@angular/router';
//
// export const authGuard: CanActivateFn = (route, state) => {
// if (this.authService.isLoggedIn()) {
//   return true;
// } else {
//   this.router.navigate(['/login']);
//   return false;
// }
// };

import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export class AuthGuard implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
