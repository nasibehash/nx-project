import {
  ChangeDetectionStrategy,
  Component, inject,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@nx-project/user';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  title = 'home';

  authService = inject(AuthService);
  router = inject(Router);

  onLogout(): void {
    // this.authService.logout();
    this.router.navigate(['/login']);
  }
}
