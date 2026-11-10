import { Component, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideChevronLeft,
  LucideChevronRight,
} from '@lucide/angular';
import moment from 'moment';
import { MonthViewComponent } from './components/month-view/month-view';
import { WeekViewComponent } from './components/week-view/week-view';
import { ButtonComponent } from '../../shared/components/button/button';
import { ReservasService, type Reserva } from '../../core/reservas/reservas.service';

type ViewType = 'month' | 'week';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    LucideChevronLeft,
    LucideChevronRight,
    MonthViewComponent,
    WeekViewComponent,
    ButtonComponent,
  ],
  templateUrl: './calendar.html',
})
export class CalendarComponent {
  private reservasService = inject(ReservasService);
  viewType = signal<ViewType>('month');
  currentDate = signal(moment());
  reservas = signal<Reserva[]>([]);

  constructor() {
    this.loadReservas();
  }

  private loadReservas(): void {
    this.reservasService.getReservas().subscribe({
      next: (response) => {
        console.log('Reservas cargadas', response);
      },
      error: (error) => {
        console.error('Error cargando reservas', error);
      },
    });

    effect(() => {
      this.reservas.set(this.reservasService.reservas());
    });
  }

  monthYear = computed(() => {
    const date = this.currentDate();
    return date.format('MMMM YYYY');
  });

  weekLabel = computed(() => {
    const date = this.currentDate();
    const startOfWeek = date.clone().startOf('week');
    const endOfWeek = date.clone().endOf('week');

    const start = startOfWeek.format('MMM D');
    const end = endOfWeek.format('MMM D');

    return `${start} - ${end}`;
  });

  toggleView(view: ViewType): void {
    this.viewType.set(view);
  }

  previousMonth(): void {
    this.currentDate.set(this.currentDate().clone().subtract(1, 'month'));
  }

  nextMonth(): void {
    this.currentDate.set(this.currentDate().clone().add(1, 'month'));
  }

  previousWeek(): void {
    this.currentDate.set(this.currentDate().clone().subtract(1, 'week'));
  }

  nextWeek(): void {
    this.currentDate.set(this.currentDate().clone().add(1, 'week'));
  }

  today(): void {
    this.currentDate.set(moment());
  }
}
