import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string;
  };
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  token = signal<string | null>(null);

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/assets/mock-login.json', {
      email,
      password
    }).pipe(
      tap((response) => {
        this.token.set(response.token);
        localStorage.setItem('auth_token', response.token);
      })
    );
  }

  logout(): void {
    this.token.set(null);
    localStorage.removeItem('auth_token');
  }

  getToken(): string | null {
    return this.token();
  }
}
