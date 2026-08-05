import { Component, ElementRef, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf } from '@angular/common';
import { CardComponent } from '../card/card.component';

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
  selector: 'app-carrossel',
  standalone: true,
  imports: [NgIf, CardComponent],
  templateUrl: './carrossel.component.html',
  styleUrl: './carrossel.component.css'
})
export class CarrosselComponent implements OnChanges {
  @ViewChild('carousel', { read: ElementRef }) carouselElement!: ElementRef<HTMLDivElement>;
  @Input({ required: true }) listaFlores: Flor[] = [];

  private readonly cardWidth: number = 272; 

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listaFlores']) {
      setTimeout(() => {
        if (this.carouselElement && this.carouselElement.nativeElement) {
          this.carouselElement.nativeElement.scrollLeft = 0;
        }
      });
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
}
