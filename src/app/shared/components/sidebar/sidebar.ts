import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import {
  LucideGrid2x2,
  LucideTrendingUp,
  LucideSettings,
  LucideChevronLeft,
  LucideChevronRight,
  LucideLogOut,
} from '@lucide/angular';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    LucideGrid2x2,
    LucideTrendingUp,
    LucideSettings,
    LucideChevronLeft,
    LucideChevronRight,
    LucideLogOut,
  ],
  templateUrl: './sidebar.html',
})
export class SidebarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isMinimized = signal(false);

  toggleMinimize(): void {
    this.isMinimized.update((v) => !v);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
