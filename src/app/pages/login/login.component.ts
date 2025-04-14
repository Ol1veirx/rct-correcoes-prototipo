import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  token: string = '';
  error: string = '';

  constructor(
    private router: Router,
    private toastService: ToastService,
  ) {}

  login() {
    if (this.token.trim() == '12345') {
      localStorage.setItem('authToken', this.token);
      this.router.navigate(['/acceptTerm']);
      this.toastService.showSuccess('Login realizado com sucesso!');
    } else {
      this.toastService.showError('Token inválido');
    }
  }
}
