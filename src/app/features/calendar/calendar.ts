import { Component, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideChevronLeft,
  LucideChevronRight,
} from '@lucide/angular';
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
  currentDate = signal(new Date());
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
    return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  });

  weekLabel = computed(() => {
    const date = this.currentDate();
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const start = startOfWeek.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
    });
    const end = endOfWeek.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
    });

    return `${start} - ${end}`;
  });

  toggleView(view: ViewType): void {
    this.viewType.set(view);
  }

  previousMonth(): void {
    const newDate = new Date(this.currentDate());
    newDate.setMonth(newDate.getMonth() - 1);
    this.currentDate.set(newDate);
  }

  nextMonth(): void {
    const newDate = new Date(this.currentDate());
    newDate.setMonth(newDate.getMonth() + 1);
    this.currentDate.set(newDate);
  }

  previousWeek(): void {
    const newDate = new Date(this.currentDate());
    newDate.setDate(newDate.getDate() - 7);
    this.currentDate.set(newDate);
  }

  nextWeek(): void {
    const newDate = new Date(this.currentDate());
    newDate.setDate(newDate.getDate() + 7);
    this.currentDate.set(newDate);
  }

  today(): void {
    this.currentDate.set(new Date());
  }
}
