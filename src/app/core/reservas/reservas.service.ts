import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Reserva {
  id: string;
  titulo: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  color: string;
  descripcion: string;
}

export interface ReservasResponse {
  success: boolean;
  reservas: Reserva[];
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  private http = inject(HttpClient);
  reservas = signal<Reserva[]>([]);

  getReservas(): Observable<ReservasResponse> {
    return this.http.get<ReservasResponse>('/assets/mock-reservas.json').pipe(
      tap((response) => {
        if (response.success) {
          this.reservas.set(response.reservas);
        }
      }),
    );
  }

  getReservasByDate(date: Date): Reserva[] {
    const dateString = date.toISOString().split('T')[0];
    return this.reservas().filter((reserva) => reserva.fecha === dateString);
  }

  getReservasByMonth(date: Date): Reserva[] {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const monthString = `${year}-${month}`;

    return this.reservas().filter((reserva) => reserva.fecha.startsWith(monthString));
  }
}
