import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface Falha {
  tipo: string;
  linha: number;
  pagina: number;
  descricao: string;
  expandido?: boolean;
}

interface LinhaConteudo {
  numero: number;
  texto: string;
}

@Component({
  selector: 'app-view-pdf',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-pdf.component.html',
  styleUrl: './view-pdf.component.css',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', opacity: 0, overflow: 'hidden', margin: '0', padding: '0 16px' })),
      state('expanded', style({ height: '*', opacity: 1, overflow: 'hidden', margin: '10px 0 0 0', padding: '10px 16px' })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out'))
    ]),
    trigger('formToggle', [
      state('hidden', style({ opacity: 0, transform: 'translateY(-20px)', height: '0px', overflow: 'hidden' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)', height: '*' })),
      transition('hidden => visible', animate('300ms ease-out')),
      transition('visible => hidden', animate('200ms ease-in'))
    ])
  ]
})
export class ViewPdfComponent implements OnInit {
  conteudoCompleto: LinhaConteudo[] = [
    { numero: 1, texto: 'O Programa Nacional do Livro Didático (PNLD) representa uma das mais importantes politicas públicas' },
    { numero: 2, texto: 'educacionais do Brasil, garantindo o acesso a materiais didáticos de qualidade.' },
    { numero: 3, texto: 'Criado em 1985, o PNLD evoluio ao longo das décadas, ampliando seu alcanse e aprimorando seus critérios' },
    { numero: 4, texto: 'de avaliação. Hoje, o programa não apenas distribue livros impressos, mas também oferece' },
    { numero: 5, texto: 'conteúdos digitais e plataformas interativas que complementam o aprendizado em sala de aula.' },
    { numero: 6, texto: 'Os principais objetivos do PNLD incluem:' },
    { numero: 7, texto: '- Garantir o acesso universal a materiais didáticos de qualidade;' },
    { numero: 8, texto: '- Contribuir para a equidade educacional em diferentes regiões do páis;' },
    { numero: 9, texto: '- Respeitar a pluralidade e diversidade social e cultural brasileira;' },
    { numero: 10, texto: '- Apoiar a implementação da Base Nacional Comum Curricular (BNCC).' },
    { numero: 11, texto: 'A seleção dos livros didáticos que integrarão o PNLD é um processo rigoroso.' },
    { numero: 12, texto: 'Envolve diversas etapas, desde a publicação do edital até a escolha pelas escolas.' },
    { numero: 13, texto: 'A avaliação pedagógica é realizada por especialistas nas áreas de conhecimento.' },
    { numero: 14, texto: 'O Guia do Livro Didático orienta os professores na seleção das obras.' },
    { numero: 15, texto: 'É fundamental que as obras estejam livres de erros conceituais e preconceitos.' },
    { numero: 16, texto: 'Mesmo com rigor, falhas pontuais de ortografia podem ocorrer.' },
    { numero: 17, texto: 'O programa atende mais de 32 milhões de alunos anualmente.' },
    { numero: 18, texto: 'Distribui aproximadamente 150 milhões de exemplares de livros.' },
    { numero: 19, texto: 'O PNLD é essencial para a democratização do acesso ao conhecimento.' },
    { numero: 20, texto: 'Sua evolução reflete as mudanças nas políticas educacionais do Brasil.' },
    { numero: 21, texto: 'Linha adicional para a página 3.' },
    { numero: 22, texto: 'Outra linha para a página 3.' },
  ];

  linhasPorPagina: number = 10;
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  conteudoPaginaAtual: LinhaConteudo[] = [];

  mostrarFormulario: boolean = false;
  falha: Falha = this.criarFalhaVazia();
  falhas: Falha[] = [];

  ngOnInit(): void {
    this.calcularTotalPaginas();
    this.carregarConteudoPagina();
  }

  criarFalhaVazia(): Falha {
    return {
      tipo: '',
      linha: 0,
      pagina: this.paginaAtual,
      descricao: '',
      expandido: false
    };
  }

  calcularTotalPaginas(): void {
    this.totalPaginas = Math.ceil(this.conteudoCompleto.length / this.linhasPorPagina);
  }

  carregarConteudoPagina(): void {
    const inicio = (this.paginaAtual - 1) * this.linhasPorPagina;
    const fim = inicio + this.linhasPorPagina;
    this.conteudoPaginaAtual = this.conteudoCompleto.slice(inicio, fim);
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarConteudoPagina();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarConteudoPagina();
    }
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.falha = this.criarFalhaVazia();
    }
  }

  toggleDetalhesFalha(falhaSelecionada: Falha): void {
    // Fecha todos os outros itens antes de abrir o selecionado
    // this.falhas.forEach(f => {
    //   if (f !== falhaSelecionada) {
    //     f.expandido = false;
    //   }
    // });
    falhaSelecionada.expandido = !falhaSelecionada.expandido;
  }

  salvarFalha(): void {
    if (this.falha.tipo && this.falha.linha && this.falha.descricao) {
      if (this.falha.linha > 0 && this.falha.linha <= this.conteudoCompleto.length) {
        const paginaDaLinha = Math.ceil(this.falha.linha / this.linhasPorPagina);
        this.falha.pagina = paginaDaLinha;
        this.falha.expandido = false;

        this.falhas.push({ ...this.falha });
        this.falha = this.criarFalhaVazia();
        this.mostrarFormulario = false;
      } else {
        console.error('Número da linha inválido.');
      }
    } else {
       console.error('Preencha todos os campos obrigatórios.');
    }
  }
}
