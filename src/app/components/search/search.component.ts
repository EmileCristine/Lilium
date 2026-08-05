import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Flor {
  nome: string;
  nomeCientifico: string;
  resume: string;
  estacao: string;
  mes: string;
  cor: string;
  significado: string;
  imagem: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit, AfterViewInit {
  @Output() filtrosAlterados = new EventEmitter<Flor[]>();

  filtroEstacao: string = '';
  filtroMes: string = '';
  filtroCor: string = '';
  filtroSignificado: string = '';
  pesquisaTexto: string = '';
  dropdownAberto: string | null = null;

  todasAsFlores: Flor[] = [
    {
      nome: 'Orquídea',
      nomeCientifico: 'Orchidaceae',
      resume: 'Lorem Isupum dolor i dont know sei la das quantas...',
      estacao: 'primavera',
      mes: 'setembro',
      cor: 'roxo',
      significado: 'respeito',
      imagem: './images/flor-amarela.png',
    },
    {
      nome: 'Rosa',
      nomeCientifico: 'Rosa L.',
      resume: 'Lorem Isupum dolor i dont know sei la das quantas...',
      estacao: 'primavera',
      mes: 'outubro',
      cor: 'vermelho',
      significado: 'amor',
      imagem: './images/flor-amarela.png',
    },
    {
      nome: 'Margarida',
      nomeCientifico: 'Bellis perennis',
      resume: 'Lorem Isupum dolor i dont know sei la das quantas...',
      estacao: 'verao',
      mes: 'janeiro',
      cor: 'amarelo',
      significado: 'felicidade',
      imagem: './images/flor-amarela.png',
    },
    {
      nome: 'Fresia',
      nomeCientifico: 'Freesia x hybrida',
      resume: 'Lorem Isupum dolor i dont know sei la das quantas...',
      estacao: 'outono',
      mes: 'maio',
      cor: 'branco',
      significado: 'pureza',
      imagem: './images/flor-amarela.png',
    },
    {
      nome: 'Girassol',
      nomeCientifico: 'Helianthus annuus',
      resume: 'Lorem Isupum dolor i dont know sei la das quantas...',
      estacao: 'verao',
      mes: 'dezembro',
      cor: 'amarelo',
      significado: 'felicidade',
      imagem: './images/flor-amarela.png',
    },
    {
      nome: 'Tulipa',
      nomeCientifico: 'Tulipa L.',
      resume: 'Lorem Isupum dolor i dont know sei la das quantas...',
      estacao: 'inverno',
      mes: 'julho',
      cor: 'vermelho',
      significado: 'amor',
      imagem: './images/flor-amarela.png',
    },
    {
      nome: 'Lírio',
      nomeCientifico: 'Lilium L.',
      resume: 'Lorem Isupum dolor i dont know sei la das quantas...',
      estacao: 'outono',
      mes: 'abril',
      cor: 'branco',
      significado: 'pureza',
      imagem: './images/flor-amarela.png',
    },
    {
      nome: 'Hortênsia',
      nomeCientifico: 'Hydrangea macrophylla',
      resume: 'Lorem Isupum dolor i dont know sei la das quantas...',
      estacao: 'inverno',
      mes: 'junho',
      cor: 'azul',
      significado: 'gratidao',
      imagem: './images/flor-amarela.png',
    },
    {
      nome: 'Lavanda',
      nomeCientifico: 'Lavandula angustifolia',
      resume: 'Lorem Isupum dolor i dont know sei la das quantas...',
      estacao: 'primavera',
      mes: 'novembro',
      cor: 'roxo',
      significado: 'esperanca',
      imagem: './images/flor-amarela.png',
    },
    {
      nome: 'Crisântemo',
      nomeCientifico: 'Chrysanthemum',
      resume: 'Lorem Isupum dolor i dont know sei la das quantas...',
      estacao: 'outono',
      mes: 'março',
      cor: 'amarelo',
      significado: 'luto',
      imagem: './images/flor-amarela.png',
    },
    {
      nome: 'Cravina',
      nomeCientifico: 'Dianthus chinensis',
      resume: 'Lorem Isupum dolor i dont know sei la das quantas...',
      estacao: 'primavera',
      mes: 'setembro',
      cor: 'rosa',
      significado: 'amizade',
      imagem: './images/flor-amarela.png',
    },
    {
      nome: 'Copo de Leite',
      nomeCientifico: 'Zantedeschia aethiopica',
      resume: 'Lorem Isupum dolor i dont know sei la das quantas...',
      estacao: 'inverno',
      mes: 'agosto',
      cor: 'branco',
      significado: 'respeito',
      imagem: './images/flor-amarela.png',
    },
    {
      nome: 'Gérbera',
      nomeCientifico: 'Gerbera jamesonii',
      resume: 'Lorem Isupum dolor i dont know sei la das quantas...',
      estacao: 'verao',
      mes: 'fevereiro',
      cor: 'laranja',
      significado: 'felicidade',
      imagem: './images/flor-amarela.png',
    },
    {
      nome: 'Antúrio',
      nomeCientifico: 'Anthurium andraeanum',
      resume: 'Lorem Isupum dolor i dont know sei la das quantas...',
      estacao: 'outono',
      mes: 'maio',
      cor: 'vermelho',
      significado: 'gratidao',
      imagem: './images/flor-amarela.png',
    },
    {
      nome: 'Azaleia',
      nomeCientifico: 'Rhododendron',
      resume: 'Lorem Isupum dolor i dont know sei la das quantas...',
      estacao: 'inverno',
      mes: 'julho',
      cor: 'rosa',
      significado: 'amor',
      imagem: './images/flor-amarela.png',
    },
  ];

  floresFiltradas: Flor[] = [];

  ngOnInit(): void {
    this.aplicarFiltros();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.filtrosAlterados.emit(this.floresFiltradas);
    });
  }

  toggleDropdown(menu: string): void {
    this.dropdownAberto = this.dropdownAberto === menu ? null : menu;
  }

  selecionarOpcao(filtro: string, valor: string): void {
    if (filtro === 'estacao') this.filtroEstacao = valor;
    if (filtro === 'mes') this.filtroMes = valor;
    if (filtro === 'cor') this.filtroCor = valor;
    if (filtro === 'significado') this.filtroSignificado = valor;

    this.dropdownAberto = null;
    this.aplicarFiltros();
  }

  exibirRotulo(tipo: string, valor: string, padrao: string): string {
    if (!valor) return padrao;
    return valor.charAt(0).toUpperCase() + valor.slice(1);
  }

  aplicarFiltros(): void {
    this.floresFiltradas = this.todasAsFlores.filter((flor) => {
      const correspondeEstacao =
        !this.filtroEstacao || flor.estacao === this.filtroEstacao;
      const correspondeMes = !this.filtroMes || flor.mes === this.filtroMes;
      const correspondeCor = !this.filtroCor || flor.cor === this.filtroCor;
      const correspondeSignificado =
        !this.filtroSignificado || flor.significado === this.filtroSignificado;

      const correspondeTexto =
        !this.pesquisaTexto ||
        flor.nome.toLowerCase().includes(this.pesquisaTexto.toLowerCase()) ||
        flor.cor.toLowerCase().includes(this.pesquisaTexto.toLowerCase()) ||
        flor.nomeCientifico
          .toLowerCase()
          .includes(this.pesquisaTexto.toLowerCase());

      return (
        correspondeEstacao &&
        correspondeMes &&
        correspondeCor &&
        correspondeSignificado &&
        correspondeTexto
      );
    });

    this.filtrosAlterados.emit(this.floresFiltradas);
  }

  limparFiltros(): void {
    this.filtroEstacao = '';
    this.filtroMes = '';
    this.filtroCor = '';
    this.filtroSignificado = '';
    this.pesquisaTexto = '';
    this.dropdownAberto = null;
    this.aplicarFiltros();
  }

  @HostListener('document:click', ['$event'])
  cliqueFora(event: MouseEvent): void {
    const alvo = event.target as HTMLElement;
    if (!alvo.closest('.dropdown-custom')) {
      this.dropdownAberto = null;
    }
  }
}
