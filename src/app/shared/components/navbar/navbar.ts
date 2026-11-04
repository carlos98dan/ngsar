import { Component, signal, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ButtonComponent } from '../button/button';

// @ts-ignore
import featherIcons from 'feather-icons';

@Component({
  selector: 'app-navbar',
  imports: [ButtonComponent],
  templateUrl: './navbar.html',
})
export class NavbarComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  logOutIcon = signal<SafeHtml>('');

  instanceIcons(): void {
    const logOutSvg = featherIcons.icons['log-out'].toSvg({
      class: 'w-4 h-4',
      'stroke-width': '2',
    });

    this.logOutIcon.set(this.sanitizer.bypassSecurityTrustHtml(logOutSvg));
  }

  ngOnInit(): void {
    this.instanceIcons();
  }
}
