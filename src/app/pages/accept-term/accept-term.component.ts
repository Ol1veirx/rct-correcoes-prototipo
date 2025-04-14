import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accept-term',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accept-term.component.html',
  styleUrl: './accept-term.component.css'
})
export class AcceptTermComponent {
  acceptTerms: boolean = false;

  constructor(private router: Router) {}

  startEvaluation() {
    if (this.acceptTerms) {
      localStorage.setItem('acceptTerms', 'true');
      this.router.navigate(['/visualization'])
    }
  }
}
