import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type Reserva } from '../../../../core/reservas/reservas.service';

interface WeekDay {
  date: Date;
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
  @Input() currentDate!: Date;
  @Input() reservas: Reserva[] = [];

  hours = Array.from({ length: 24 }, (_, i) => i);

  weekDays = computed(() => {
    const date = new Date(this.currentDate);
    const day = date.getDay();
    const diff = date.getDate() - day;

    const days: WeekDay[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(date.setDate(diff + i));
      const dayName = d.toLocaleDateString('es-ES', { weekday: 'short' });
      const dayNumber = d.getDate();
      const isToday = this.isToday(d);

      days.push({
        date: new Date(d),
        dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        dayNumber,
        isToday,
      });
    }
    return days;
  });

  private isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  formatHour(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`;
  }

  getReservasByDay(date: Date): Reserva[] {
    const dateString = date.toISOString().split('T')[0];
    return this.reservas.filter((reserva) => reserva.fecha === dateString);
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
    const [hours, minutes] = reserva.horaInicio.split(':').map(Number);
    return hours + minutes / 60;
  }

  getReservaHeight(reserva: Reserva): number {
    const [startHour, startMin] = reserva.horaInicio.split(':').map(Number);
    const [endHour, endMin] = reserva.horaFin.split(':').map(Number);
    const startTotal = startHour + startMin / 60;
    const endTotal = endHour + endMin / 60;
    return endTotal - startTotal;
  }
}
