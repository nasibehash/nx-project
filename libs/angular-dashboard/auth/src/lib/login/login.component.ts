import {
  ChangeDetectionStrategy,
  Component, inject, OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '@nx-project/user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError = false;

  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [''],
      password: [''],
    });
  }

  onLogin(): void {
    if (this.authService.login(this.loginForm.value['userName'], this.loginForm.value['password'])) {
      this.router.navigate(['/home']);
    } else {
      this.loginError = true;
      this.loginForm.patchValue({
        userName: null,
        password: null,
      });
    }
  }
}
