import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// @ts-ignore
import featherIcons from 'feather-icons';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
})
export class SidebarComponent implements OnInit {
  isMinimized = signal(false);
  private sanitizer = inject(DomSanitizer);

  dashboardIcon = signal<SafeHtml>('');
  trendingIcon = signal<SafeHtml>('');
  settingsIcon = signal<SafeHtml>('');
  chevronLeftIcon = signal<SafeHtml>('');
  chevronRightIcon = signal<SafeHtml>('');

  instanceIcons(): void {
    const dashboardSvg = featherIcons.icons['grid'].toSvg({
      class: 'w-5 h-5',
      'stroke-width': '2',
    });
    const trendingSvg = featherIcons.icons['trending-up'].toSvg({
      class: 'w-5 h-5',
      'stroke-width': '2',
    });
    const settingsSvg = featherIcons.icons['settings'].toSvg({
      class: 'w-5 h-5',
      'stroke-width': '2',
    });
    const chevronLeftSvg = featherIcons.icons['chevron-left'].toSvg({
      class: 'w-5 h-5',
      'stroke-width': '2',
    });
    const chevronRightSvg = featherIcons.icons['chevron-right'].toSvg({
      class: 'w-5 h-5',
      'stroke-width': '2',
    });

    this.dashboardIcon.set(this.sanitizer.bypassSecurityTrustHtml(dashboardSvg));
    this.trendingIcon.set(this.sanitizer.bypassSecurityTrustHtml(trendingSvg));
    this.settingsIcon.set(this.sanitizer.bypassSecurityTrustHtml(settingsSvg));
    this.chevronLeftIcon.set(this.sanitizer.bypassSecurityTrustHtml(chevronLeftSvg));
    this.chevronRightIcon.set(this.sanitizer.bypassSecurityTrustHtml(chevronRightSvg));
  }

  ngOnInit(): void {
    this.instanceIcons();
  }

  toggleMinimize(): void {
    this.isMinimized.update((v) => !v);
  }
}
