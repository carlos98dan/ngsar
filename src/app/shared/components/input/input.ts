import { Component, input, computed, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// @ts-ignore
import featherIcons from 'feather-icons';
import { ButtonComponent } from '../button/button';

type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
type InputSize = 'sm' | 'md' | 'lg';
type IconPosition = 'left' | 'right';

@Component({
  selector: 'app-input',
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './input.html',
})
export class InputComponent implements OnInit {
  type = input<InputType>('text');
  size = input<InputSize>('md');
  label = input('');
  placeholder = input('');
  disabled = input(false);
  fullWidth = input(false);
  required = input(false);
  iconSvg = input<SafeHtml>('');
  iconSrc = input('');
  iconPosition = input<IconPosition>('right');
  value = signal('');
  showPassword = signal(false);
  eyeIcon = signal<SafeHtml>('');
  eyeOffIcon = signal<SafeHtml>('');

  private sanitizer = inject(DomSanitizer);

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

  instanceIcons(): void {
    const eyeSvg = featherIcons.icons['eye'].toSvg({ class: 'w-5 h-5', stroke: 'currentColor' });
    const eyeOffSvg = featherIcons.icons['eye-off'].toSvg({
      class: 'w-5 h-5',
      stroke: 'currentColor',
    });

    this.eyeIcon.set(this.sanitizer.bypassSecurityTrustHtml(eyeSvg));
    this.eyeOffIcon.set(this.sanitizer.bypassSecurityTrustHtml(eyeOffSvg));
  }

  ngOnInit(): void {
    this.instanceIcons();
  }

  getEyeIcon(): SafeHtml {
    return this.showPassword() ? this.eyeIcon() : this.eyeOffIcon();
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

    return [baseClasses, sizeClasses[this.size()], widthClasses].join(' ');
  });
}
