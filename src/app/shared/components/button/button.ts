import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'icon';
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
  clicked = output<void>();

  buttonClasses = computed(() => {
    const baseClasses =
      this.variant() === 'icon'
        ? 'flex justify-center items-center gap-2 font-medium rounded-lg transition-all duration-200 cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95'
        : 'flex justify-center items-center gap-2 font-medium rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

    const sizeClasses = {
      sm: this.variant() === 'icon' ? 'p-1.5' : 'px-3 py-1.5 text-sm',
      md: this.variant() === 'icon' ? 'p-2' : 'px-6 py-2.5 text-base',
      lg: this.variant() === 'icon' ? 'p-2.5' : 'px-8 py-3.5 text-lg',
    };

    const variantClasses = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-200 active:bg-primary-800',
      secondary:
        'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 focus:ring-secondary-200 active:bg-secondary-300',
      danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-200 active:bg-danger-800',
      success:
        'bg-success-600 text-white hover:bg-success-700 focus:ring-success-200 active:bg-success-800',
      icon: 'bg-transparent text-secondary-600 hover:text-secondary-700 hover:bg-secondary-100 focus:ring-secondary-200',
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
