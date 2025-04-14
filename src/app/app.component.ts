import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent, NgIf, AsyncPipe],
  template: `
    <router-outlet></router-outlet>
    <app-toast
      *ngIf="(toastService.toast$ | async)"
      [message]="(toastService.toast$ | async)?.message || ''"
      [type]="(toastService.toast$ | async)?.type || 'error'">
    </app-toast>
  `,
})
export class AppComponent {
  constructor(public toastService: ToastService) {}
}