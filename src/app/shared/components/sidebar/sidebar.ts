import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  LucideGrid2x2,
  LucideTrendingUp,
  LucideSettings,
  LucideChevronLeft,
  LucideChevronRight,
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
  ],
  templateUrl: './sidebar.html',
})
export class SidebarComponent {
  isMinimized = signal(false);
  private sanitizer = inject(DomSanitizer);

  toggleMinimize(): void {
    this.isMinimized.update((v) => !v);
  }
}
