import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

import { FlorService } from '../../services/flor.service';
import { Flor } from '../../models/flor.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  @Output() filtrosAlterados = new EventEmitter<Flor[]>();

  private florService = inject(FlorService);

  filtroEstacao = '';
  filtroMes = '';
  filtroCor = '';
  filtroSignificado = '';
  pesquisaTexto = '';

  dropdownAberto: string | null = null;

  todasAsFlores: Flor[] = [];

  floresFiltradas: Flor[] = [];

  title = '';
  subTitle: string | null = null;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeSearch(event.url);
      }
    });
  }

  ngOnInit(): void {
    this.carregarFlores();
  }

  private carregarFlores(): void {
    this.florService.getFlores().subscribe({
      next: (flores) => {
        this.todasAsFlores = flores;

        this.aplicarFiltros();
      },

      error: (erro) => {
        console.error('Erro carregando flores:', erro);

        this.todasAsFlores = [];
      },
    });
  }

  selecionarOpcao(filtro: string, valor: string): void {
    if (filtro === 'estacao') this.filtroEstacao = valor;

    if (filtro === 'mes') this.filtroMes = valor;

    if (filtro === 'cor') this.filtroCor = valor;

    if (filtro === 'significado') this.filtroSignificado = valor;

    this.dropdownAberto = null;

    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    const textoDigitado = this.normalizarTexto(this.pesquisaTexto);

    this.floresFiltradas = this.todasAsFlores.filter((flor) => {
      const correspondeEstacao =
        !this.filtroEstacao || flor.estacao === this.filtroEstacao;

      const correspondeMes = !this.filtroMes || flor.mes === this.filtroMes;

      const correspondeCor =
        !this.filtroCor ||
        flor.cores.some((cor) => cor.nome === this.filtroCor);

      const correspondeSignificado =
        !this.filtroSignificado ||
        flor.significadoPadrao === this.filtroSignificado ||
        flor.cores.some((cor) => cor.significado === this.filtroSignificado);

      const correspondeTexto =
        !textoDigitado ||
        this.normalizarTexto(flor.nome).includes(textoDigitado) ||
        this.normalizarTexto(flor.nomeCientifico).includes(textoDigitado) ||
        flor.cores.some((cor) =>
          this.normalizarTexto(cor.nome).includes(textoDigitado),
        );

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

  exibirRotulo(tipo: string, valor: string, padrao: string): string {
    if (!valor) {
      return padrao;
    }

    return valor.charAt(0).toUpperCase() + valor.slice(1);
  }

  private normalizarTexto(texto: string): string {
    return (
      texto
        ?.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim() ?? ''
    );
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

  toggleDropdown(menu: string) {
    this.dropdownAberto = this.dropdownAberto === menu ? null : menu;
  }

  @HostListener('document:click', ['$event'])
  cliqueFora(event: MouseEvent) {
    const alvo = event.target as HTMLElement;

    if (!alvo.closest('.dropdown-custom')) {
      this.dropdownAberto = null;
    }
  }

  changeSearch(url: string) {
    if (url.includes('/home')) {
      this.title = 'AS FLORES DO SEU MÊS';

      this.subTitle = 'VER MAIS';
    } else if (url === '/flores') {
      this.title = 'DESCUBRA MAIS FLORES';

      this.subTitle = null;
    } else {
      this.title = 'DESCUBRA MAIS FLORES';

      this.subTitle = 'VER MAIS';
    }
  }
}
