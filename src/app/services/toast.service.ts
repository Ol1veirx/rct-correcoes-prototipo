import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastData {
  message: string;
  type: 'error' | 'success' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastData | null>(null);
  toast$ = this.toastSubject.asObservable();

  showError(message: string) {
    this.toastSubject.next({ message, type: 'error' });
  }

  showSuccess(message: string) {
    this.toastSubject.next({ message, type: 'success' });
  }

  showInfo(message: string) {
    this.toastSubject.next({ message, type: 'info' });
  }

  hide() {
    this.toastSubject.next(null);
  }
}