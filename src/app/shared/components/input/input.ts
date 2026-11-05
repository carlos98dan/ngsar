import { Component, input, computed, signal, contentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button';
import { LucideEye, LucideEyeOff } from '@lucide/angular';
import { IconLeftDirective } from '../../directives/input/icon-left.directive';
import { IconRightDirective } from '../../directives/input/icon-right.directive';

type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
type InputSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-input',
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    LucideEye,
    LucideEyeOff,
    IconLeftDirective,
    IconRightDirective,
  ],
  templateUrl: './input.html',
})
export class InputComponent {
  type = input<InputType>('text');
  size = input<InputSize>('md');
  label = input('');
  placeholder = input('');
  disabled = input(false);
  fullWidth = input(false);
  required = input(false);
  value = signal('');
  showPassword = signal(false);

  iconLeftElements = contentChildren(IconLeftDirective);
  iconRightElements = contentChildren(IconRightDirective);

  inputType = computed(() => {
    if (this.type() === 'password' && this.showPassword()) {
      return 'text';
    }
    return this.type();
  });

  togglePassword(): void {
    if (this.type() === 'password') {
      this.showPassword.update((v) => !v);
    }
  }

  inputClasses = computed(() => {
    const baseClasses =
      'border border-gray-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed';

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-5 py-3.5 text-lg',
    };

    const widthClasses = this.fullWidth() ? 'w-full' : '';

    const iconClasses = [
      this.iconLeftElements().length > 0 ? 'pl-10' : '',
      this.iconRightElements().length > 0 ? 'pr-10' : '',
      this.type() === 'password' ? 'pr-12' : '',
    ];

    return [baseClasses, sizeClasses[this.size()], widthClasses, ...iconClasses]
      .filter(Boolean)
      .join(' ');
  });
}
