import { Component, ElementRef, Input, ViewChild, OnChanges, SimpleChanges, AfterViewChecked, ChangeDetectorRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Flor } from '../../services/flor.service';

@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [NgIf, CardComponent],
  templateUrl: './carrossel.component.html',
  styleUrl: './carrossel.component.css'
})
export class CarrosselComponent implements OnChanges, AfterViewChecked {
  @ViewChild('carousel', { read: ElementRef }) carouselElement!: ElementRef<HTMLDivElement>;
  @Input({ required: true }) listaFlores: Flor[] = [];

  private cdr = inject(ChangeDetectorRef); // Evita erros de detecção de mudanças assíncronas
  private readonly cardWidth: number = 272; 
  
  mostrarBotoes: boolean = false; // Controla a exibição dos botões no HTML

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
}
