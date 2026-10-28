import { Component, input, computed } from '@angular/core';

type CardSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
})
export class CardComponent {
  size = input<CardSize>('md');

  cardClass = computed(() => {
    const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden w-full';

    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    };

    return `${baseClasses} ${sizeClasses[this.size()]}`;
  });
}
