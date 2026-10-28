import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button';
import { CardComponent } from '../../../shared/components/card/card';
import { InputComponent } from '../../../shared/components/input/input';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, CardComponent, InputComponent],
  templateUrl: './login.html'
})
export class LoginComponent {
  onLogin(): void {
    console.log('Login clicked');
  }
}
