import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

import { FlorService } from '../../services/flor.service';
import { Flor } from '../../models/flor.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, RouterLink],
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

  title = 'Buscar Flores';
  subTitle: string | null = 'Ver todas';

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

        console.log('FLORES RECEBIDAS:', flores);
      },
      error: (erro) => {
        console.error('Erro carregando flores:', erro);
        this.todasAsFlores = [];
      },
    });
  }

  toggleDropdown(dropdown: string): void {
    this.dropdownAberto = this.dropdownAberto === dropdown ? null : dropdown;
  }

  private changeSearch(url: string): void {
    if (url.includes('/flores')) {
      this.title = 'Explorar Catálogo';
      this.subTitle = '';
    } else {
      this.title = 'Encontre sua Flor';
      this.subTitle = 'Ver Mais';
    }
  }

  selecionarOpcao(filtro: string, valor: string): void {
    switch (filtro) {
      case 'estacao':
        this.filtroEstacao = valor;
        break;

      case 'mes':
        this.filtroMes = valor;
        break;

      case 'cor':
        this.filtroCor = valor;
        break;

      case 'significado':
        this.filtroSignificado = valor;
        break;
    }

    this.dropdownAberto = null;
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    const textoDigitado = this.normalizarTexto(this.pesquisaTexto);

    const significadoSelecionado = this.normalizarTexto(this.filtroSignificado);

    this.floresFiltradas = this.todasAsFlores
      .filter((flor) => {
     
        const correspondeEstacao =
          !this.filtroEstacao ||
          this.normalizarTexto(flor.estacao) ===
            this.normalizarTexto(this.filtroEstacao);

        const correspondeMes =
          !this.filtroMes ||
          this.normalizarTexto(flor.mes) ===
            this.normalizarTexto(this.filtroMes);

        const correspondeCor =
          !this.filtroCor ||
          flor.cores?.some(
            (cor) =>
              this.normalizarTexto(cor.nome) ===
              this.normalizarTexto(this.filtroCor),
          );

        const correspondeSignificado =
          !significadoSelecionado ||
          this.normalizarTexto(flor.significadoPadrao) ===
            significadoSelecionado ||
          flor.cores?.some((cor) => {
            const significados = this.obterSignificados(cor.significado);

            return significados.includes(significadoSelecionado);
          });

        const correspondeTexto =
          !textoDigitado ||
          this.normalizarTexto(flor.slug).includes(textoDigitado) ||
          this.normalizarTexto(flor.nomeCientifico).includes(textoDigitado) ||
          this.normalizarTexto(flor.significadoPadrao).includes(
            textoDigitado,
          ) ||
          this.normalizarTexto(flor.resume).includes(textoDigitado) ||
          flor.cores?.some(
            (cor) =>
              this.normalizarTexto(cor.nome).includes(textoDigitado) ||
              this.normalizarTexto(cor.significado).includes(textoDigitado),
          );

        return (
          correspondeEstacao &&
          correspondeMes &&
          correspondeCor &&
          correspondeSignificado &&
          correspondeTexto
        );
      })

      .map((flor) => {
        if (this.filtroCor) {
          return {
            ...flor,
            cores: flor.cores?.filter(
              (cor) =>
                this.normalizarTexto(cor.nome) ===
                this.normalizarTexto(this.filtroCor),
            ),
          };
        }

        if (significadoSelecionado) {
          const correspondeuFlor =
            this.normalizarTexto(flor.significadoPadrao) ===
            significadoSelecionado;

          const coresCorrespondentes = flor.cores?.filter((cor) => {
            const significados = this.obterSignificados(cor.significado);

            return significados.includes(significadoSelecionado);
          });

          if (!correspondeuFlor && coresCorrespondentes?.length) {
            return {
              ...flor,
              cores: coresCorrespondentes,
            };
          }
        }

        if (textoDigitado) {
          const encontrouCor = flor.cores?.some(
            (cor) =>
              this.normalizarTexto(cor.nome).includes(textoDigitado) ||
              this.normalizarTexto(cor.significado).includes(textoDigitado),
          );

          const correspondeuFlor =
            this.normalizarTexto(flor.slug).includes(textoDigitado) ||
            this.normalizarTexto(flor.nomeCientifico).includes(textoDigitado) ||
            this.normalizarTexto(flor.significadoPadrao).includes(
              textoDigitado,
            ) ||
            this.normalizarTexto(flor.resume).includes(textoDigitado);

          if (encontrouCor && !correspondeuFlor) {
            return {
              ...flor,
              cores: flor.cores?.filter(
                (cor) =>
                  this.normalizarTexto(cor.nome).includes(textoDigitado) ||
                  this.normalizarTexto(cor.significado).includes(textoDigitado),
              ),
            };
          }
        }

        return flor;
      });

    this.filtrosAlterados.emit(this.floresFiltradas);
  }

  private obterSignificados(significado: string): string[] {
    return this.normalizarTexto(significado)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
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

  exibirRotulo(tipo: string, valor: string, padrao: string): string {
    if (!valor) {
      return padrao;
    }

    return valor.charAt(0).toUpperCase() + valor.slice(1);
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
}
