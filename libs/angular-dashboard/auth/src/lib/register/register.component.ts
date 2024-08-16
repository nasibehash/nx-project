import {
  ChangeDetectionStrategy,
  Component, inject,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@nx-project/user';

@Component({
  selector: 'lib-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  username = '';
  password = '';
  registerError = false;
  registerSuccess = false;

  authService = inject(AuthService);
  router = inject(Router);
  onRegister(): void {
    if (this.authService.register(this.username, this.password)) {
      this.registerSuccess = true;
      this.registerError = false;
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 2000);
    } else {
      this.registerError = true;
      this.registerSuccess = false;
    }
  }

}
