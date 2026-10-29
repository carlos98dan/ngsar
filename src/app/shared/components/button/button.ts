import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
})
export class ButtonComponent {
  label = input('Button');
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input(false);
  fullWidth = input(false);
  iconSrc = input('');
  clicked = output<void>();

  buttonClasses = computed(() => {
    const baseClasses =
      'font-medium rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3.5 text-lg',
    };

    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
      secondary:
        'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 active:bg-gray-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
      success:
        'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800',
    };

    const widthClasses = this.fullWidth() ? 'w-full' : '';

    return [
      baseClasses,
      sizeClasses[this.size()],
      variantClasses[this.variant()],
      widthClasses,
    ].join(' ');
  });

  onClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}
