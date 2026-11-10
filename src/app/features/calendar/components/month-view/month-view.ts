import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type Reserva } from '../../../../core/reservas/reservas.service';

interface Day {
  date: Date;
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
  currentDate = input.required<Date>();
  reservas = input<Reserva[]>([]);

  daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];

  monthDays = computed(() => {
    const date = new Date(this.currentDate());
    const year = date.getFullYear();
    const month = date.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    const days: Day[] = [];

    // Previous month days
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    // Add all days
    let current = new Date(startDate);
    while (current <= lastDay || current.getDay() !== 0) {
      days.push({
        date: new Date(current),
        isCurrentMonth: current.getMonth() === month,
        isToday: this.isToday(current),
      });
      current.setDate(current.getDate() + 1);
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

  getReservasByDay(date: Date): Reserva[] {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
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
