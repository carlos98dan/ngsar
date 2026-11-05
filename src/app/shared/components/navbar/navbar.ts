import { Component, signal, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ButtonComponent } from '../button/button';
import { LucideLogOut } from '@lucide/angular';

@Component({
  selector: 'app-navbar',
  imports: [ButtonComponent, LucideLogOut],
  templateUrl: './navbar.html',
})
export class NavbarComponent {}
