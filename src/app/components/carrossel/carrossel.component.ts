import { Component, ElementRef, Input, ViewChild, OnChanges, SimpleChanges, AfterViewChecked, ChangeDetectorRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Flor } from '../../models/flor.model';

@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [NgIf, CardComponent],
  templateUrl: './carrossel.component.html',
  styleUrl: './carrossel.component.css'
})
export class CarrosselComponent implements OnChanges, AfterViewChecked {
  @ViewChild('carousel', { read: ElementRef }) carouselElement!: ElementRef<HTMLDivElement>;
  
  slidesParaExibir: Flor[] = [];

  @Input({ required: true }) 
  set listaFlores(flores: Flor[]) {
    this.slidesParaExibir = this.desmembrarFloresPorCor(flores);
  }

  private cdr = inject(ChangeDetectorRef); 
  private readonly cardWidth: number = 280; 
  
  mostrarBotoes: boolean = false

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listaFlores']) {
      setTimeout(() => {
        if (this.carouselElement && this.carouselElement.nativeElement) {
          this.carouselElement.nativeElement.scrollLeft = 0;
          this.verificarRolagem();
        }
      });
    }
  }

  ngAfterViewChecked(): void {
    this.verificarRolagem();
  }

  private verificarRolagem(): void {
    if (this.carouselElement && this.carouselElement.nativeElement) {
      const elemento = this.carouselElement.nativeElement;
      const precisaDeRolagem = elemento.scrollWidth > elemento.clientWidth;

      if (this.mostrarBotoes !== precisaDeRolagem) {
        this.mostrarBotoes = precisaDeRolagem;
        this.cdr.detectChanges(); 
      }
    }
  }

  moverCarrossel(direcao: number): void {
    if (this.carouselElement && this.carouselElement.nativeElement) {
      const elemento = this.carouselElement.nativeElement;
      const novaPosicao = elemento.scrollLeft + (this.cardWidth * direcao);
      elemento.scrollTo({
        left: novaPosicao,
        behavior: 'smooth'
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
            id: Number(`${flor.id}${index}`),
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