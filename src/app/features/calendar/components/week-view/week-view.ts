import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { type Reserva } from '../../../../core/reservas/reservas.service';

interface WeekDay {
  date: moment.Moment;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
}

@Component({
  selector: 'app-week-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './week-view.html',
})
export class WeekViewComponent {
  currentDate = input.required<moment.Moment>();
  reservas = input<Reserva[]>([]);

  hours = Array.from({ length: 24 }, (_, i) => i);

  weekDays = computed(() => {
    const date = this.currentDate();
    const startOfWeek = date.clone().startOf('week');

    const days: WeekDay[] = [];
    for (let i = 0; i < 7; i++) {
      const d = startOfWeek.clone().add(i, 'day');
      const dayName = d.format('ddd').charAt(0).toUpperCase() + d.format('ddd').slice(1);
      const dayNumber = d.date();
      const isToday = this.isToday(d);

      days.push({
        date: d,
        dayName,
        dayNumber,
        isToday,
      });
    }
    return days;
  });

  private isToday(date: moment.Moment): boolean {
    return date.isSame(moment(), 'day');
  }

  formatHour(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`;
  }

  getReservasByDay(date: moment.Moment): Reserva[] {
    const dateString = date.format('YYYY-MM-DD');
    return this.reservas().filter((reserva) => reserva.fecha === dateString);
  }

  getColorClass(color: string): string {
    const colorMap: { [key: string]: string } = {
      primary: 'bg-primary-100 text-primary-700 border-primary-300',
      success: 'bg-success-100 text-success-700 border-success-300',
      warning: 'bg-warning-100 text-warning-700 border-warning-300',
      info: 'bg-info-100 text-info-700 border-info-300',
      danger: 'bg-danger-100 text-danger-700 border-danger-300',
    };
    return colorMap[color] || 'bg-primary-100 text-primary-700 border-primary-300';
  }

  getReservaPosition(reserva: Reserva): number {
    const tiempo = moment(reserva.horaInicio, 'HH:mm');
    return tiempo.hours() + tiempo.minutes() / 60;
  }

  getReservaHeight(reserva: Reserva): number {
    const inicio = moment(reserva.horaInicio, 'HH:mm');
    const fin = moment(reserva.horaFin, 'HH:mm');
    const duracion = fin.diff(inicio, 'minutes');
    return duracion / 60;
  }
}
