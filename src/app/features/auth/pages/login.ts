import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent],
  templateUrl: './login.html'
})
export class LoginComponent {
  onLogin(): void {
    console.log('Login clicked');
  }
}
