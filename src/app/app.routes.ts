import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login';
import { DashboardComponent } from './core/layout/dashboard';
import { HomeComponent } from './features/home/home';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [{ path: '', component: HomeComponent }],
  },
];
