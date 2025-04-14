import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Falha {
  tipo: string;
  linha: number;
  pagina: number;
  descricao: string;
}

@Component({
  selector: 'app-view-pdf',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-pdf.component.html',
  styleUrl: './view-pdf.component.css'
})
export class ViewPdfComponent {
  paginaAtual: number = 1;
  totalPaginas: number = 3;

  falha: Falha = {
    tipo: '',
    linha: 0,
    pagina: this.paginaAtual,
    descricao: ''
  };

  falhas: Falha[] = [];

  salvarFalha() {
    if (this.falha.tipo && this.falha.linha && this.falha.descricao) {
      this.falha.pagina = this.paginaAtual;
      this.falhas.push({...this.falha});

      // Resetar o formulário
      this.falha = {
        tipo: '',
        linha: 0,
        pagina: this.paginaAtual,
        descricao: ''
      };
    }
  }
}
