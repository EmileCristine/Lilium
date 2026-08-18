import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  AfterViewChecked,
  ChangeDetectorRef,
  inject,
  OnInit,
} from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Flor } from '../../models/flor.model';
import { FlorService } from '../../services/flor.service';
import { SearchComponent } from '../search/search.component';
import { ErrorComponent } from '../error/error.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [CardComponent, SearchComponent, ErrorComponent, NgIf],
  templateUrl: './carrossel.component.html',
  styleUrl: './carrossel.component.css',
})
export class CarrosselComponent implements OnInit, OnChanges, AfterViewChecked {
  @ViewChild('carousel', { read: ElementRef })
  carouselElement!: ElementRef<HTMLDivElement>;

  private florService = inject(FlorService);
  private cdr = inject(ChangeDetectorRef);
  private readonly cardWidth: number = 280;

  slidesParaExibir: Flor[] = [];
  mostrarBotoes: boolean = false;
  mostrarBotaoEsquerdo: boolean = false;

  @Input({ required: true })
  set listaFlores(flores: Flor[]) {
    this.slidesParaExibir = this.desmembrarFloresPorCor(flores);
  }

  ngOnInit(): void {
    this.carregarFlores();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listaFlores']) {
      this.resetarRolagem();
    }
  }

  ngAfterViewChecked(): void {
    this.verificarRolagem();
  }

  private carregarFlores(): void {
    this.florService.getFlores().subscribe({
      next: (flores) => {
        this.slidesParaExibir = this.desmembrarFloresPorCor(flores);
      },
      error: (erro) => {
        console.error('Erro ao carregar flores:', erro);
        this.slidesParaExibir = [];
      },
    });
  }

  atualizarDadosCarrossel(flores: Flor[]): void {
    this.slidesParaExibir = this.desmembrarFloresPorCor(flores);
    this.resetarRolagem();

    setTimeout(() => {
      this.verificarRolagem();
    }, 50);
  }

  private resetarRolagem(): void {
    setTimeout(() => {
      if (this.carouselElement && this.carouselElement.nativeElement) {
        this.carouselElement.nativeElement.scrollLeft = 0;
        this.verificarRolagem();
      }
    });
  }

  verificarRolagem(): void {
    if (this.carouselElement && this.carouselElement.nativeElement) {
      const elemento = this.carouselElement.nativeElement;

      const precisaDeRolagem = elemento.scrollWidth > elemento.clientWidth;

      const jaComecouRolagem = elemento.scrollLeft > 5;

      if (
        this.mostrarBotoes !== precisaDeRolagem ||
        this.mostrarBotaoEsquerdo !== jaComecouRolagem
      ) {
        this.mostrarBotoes = precisaDeRolagem;
        this.mostrarBotaoEsquerdo = jaComecouRolagem;
        this.cdr.detectChanges();
      }
    }
  }

  moverCarrossel(direcao: number): void {
    if (this.carouselElement && this.carouselElement.nativeElement) {
      const elemento = this.carouselElement.nativeElement;
      
      // Procura o primeiro card renderizado para pegar o tamanho exato dele + gaps reais
      const primeiroCard = elemento.querySelector('app-card');
      const larguraDeslocamento = primeiroCard 
        ? primeiroCard.getBoundingClientRect().width 
        : this.cardWidth;

      // Desloca exatamente a largura de um card multiplicada pela direção (-1 ou 1)
      const novaPosicao = elemento.scrollLeft + (larguraDeslocamento * direcao);
      
      elemento.scrollTo({
        left: novaPosicao,
        behavior: 'smooth',
      });
    }
  }

  private desmembrarFloresPorCor(lista: Flor[]): Flor[] {
    if (!lista || lista.length === 0) return [];

    const floresDesmembradas: Flor[] = [];

    lista.forEach((flor) => {
      if (flor.cores && flor.cores.length > 0) {
        flor.cores.forEach((cor, index) => {
          floresDesmembradas.push({
            ...flor,
            id: Number(`${flor.slug}${index}`),
            cores: [cor],
          });
        });
      } else {
        floresDesmembradas.push(flor);
      }
    });

    return floresDesmembradas;
  }
}
