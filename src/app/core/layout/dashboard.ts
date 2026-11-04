import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SidebarComponent, NavbarComponent, BreadcrumbComponent],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {}
