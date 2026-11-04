import { Component, viewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button';
import { CardComponent } from '../../../shared/components/card/card';
import { InputComponent } from '../../../shared/components/input/input';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, CardComponent, InputComponent],
  templateUrl: './login.html',
})
export class LoginComponent {
  readonly emailInput = viewChild.required<InputComponent>('emailInput');
  readonly passwordInput = viewChild.required<InputComponent>('passwordInput');
  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin(): void {
    const email = this.emailInput()?.value();
    const password = this.passwordInput()?.value();

    if (!email || !password) {
      console.warn('Email and password are required');
      return;
    }

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }
}
