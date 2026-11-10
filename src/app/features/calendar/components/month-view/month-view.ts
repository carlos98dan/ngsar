import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { type Reserva } from '../../../../core/reservas/reservas.service';

interface Day {
  date: moment.Moment;
  isCurrentMonth: boolean;
  isToday: boolean;
}

@Component({
  selector: 'app-month-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './month-view.html',
})
export class MonthViewComponent {
  currentDate = input.required<moment.Moment>();
  reservas = input<Reserva[]>([]);

  daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];

  monthDays = computed(() => {
    const date = this.currentDate();
    const startOfMonth = date.clone().startOf('month');
    const endOfMonth = date.clone().endOf('month');
    const startDate = startOfMonth.clone().startOf('week');

    const days: Day[] = [];
    let current = startDate.clone();

    while (current.isBefore(endOfMonth.clone().endOf('week'))) {
      days.push({
        date: current.clone(),
        isCurrentMonth: current.month() === date.month(),
        isToday: this.isToday(current),
      });
      current.add(1, 'day');
    }

    return days;
  });

  private isToday(date: moment.Moment): boolean {
    return date.isSame(moment(), 'day');
  }

  getReservasByDay(date: moment.Moment): Reserva[] {
    const dateString = date.format('YYYY-MM-DD');
    return this.reservas().filter((reserva) => reserva.fecha === dateString);
  }

  getColorClass(color: string): string {
    const colorMap: { [key: string]: string } = {
      primary: 'bg-primary-100 text-primary-700',
      success: 'bg-success-100 text-success-700',
      warning: 'bg-warning-100 text-warning-700',
      info: 'bg-info-100 text-info-700',
      danger: 'bg-danger-100 text-danger-700',
    };
    return colorMap[color] || 'bg-primary-100 text-primary-700';
  }
}
