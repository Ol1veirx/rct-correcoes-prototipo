import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AcceptTermComponent } from './pages/accept-term/accept-term.component';
import { VisualizationComponent } from './pages/visualization/visualization.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'acceptTerm', component: AcceptTermComponent },
    { path: 'visualization', component: VisualizationComponent },
];
