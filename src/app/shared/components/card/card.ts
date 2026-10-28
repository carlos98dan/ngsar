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
      sm: 'w-sm',
      md: 'w-md',
      lg: 'w-lg',
      xl: 'w-xl',
    };

    return `${baseClasses} ${sizeClasses[this.size()]}`;
  });
}
