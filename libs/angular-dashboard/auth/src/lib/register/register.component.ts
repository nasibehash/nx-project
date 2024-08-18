import {
  ChangeDetectionStrategy,
  Component, inject, OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@nx-project/user';

@Component({
  selector: 'lib-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  registerError = false;
  registerSuccess = false;

  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: [''],
      password: [''],
    });
  }

  onRegister(): void {
    if (this.authService.register(this.registerForm.value['userName'], this.registerForm.value['password'])) {
      this.registerSuccess = true;
      this.registerError = false;
      this.router.navigate(['/auth/login']);
    } else {
      this.registerError = true;
      this.registerSuccess = false;
      this.registerForm.patchValue({
        userName: null,
        password: null,
      });
    }
  }

}
