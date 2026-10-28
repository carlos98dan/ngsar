import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button';
import { CardComponent } from '../../../shared/components/card/card';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, CardComponent],
  templateUrl: './login.html'
})
export class LoginComponent {
  onLogin(): void {
    console.log('Login clicked');
  }
}
