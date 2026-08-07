import { CommonModule } from '@angular/common';

import {
  Component,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { Flor } from '../../models/flor.model';

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './galery.component.html',
  styleUrl: './galery.component.css',
})
export class GaleryComponent implements OnChanges {
  @Input({ required: true })
  listaFlores: Flor[] = [];

  colunas: Flor[][] = [];

  private resizeTimer!: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listaFlores']) {
      this.distribuirFlores();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    clearTimeout(this.resizeTimer);

    this.resizeTimer = setTimeout(() => {
      this.distribuirFlores();
    }, 200);
  }

  private distribuirFlores(): void {
    const quantidadeColunas = this.obterQuantidadeColunas();

    this.colunas = Array.from({ length: quantidadeColunas }, () => []);

    const alturas = new Array(quantidadeColunas).fill(0);

    for (const flor of this.listaFlores) {
      const altura = this.estimarAltura(flor);

      const menorColuna = alturas.indexOf(Math.min(...alturas));
      this.colunas[menorColuna].push(flor);
      alturas[menorColuna] += altura;
    }
  }

  
  private estimarAltura(flor: Flor): number {
    let altura = 250;

    if (flor.resume) {
      altura += flor.resume.length * 0.8;
    }

    if (flor.cores?.length) {
      altura += 100;
    }

    return altura;
  }

private obterQuantidadeColunas(): number {
  const quantidadeFlores = this.listaFlores.length;

  if (quantidadeFlores <= 1) {return 1;}
  if (quantidadeFlores <= 2) {return 2;}

  const largura = window.innerWidth;
  if (largura >= 1800) {return 8;}
  if (largura >= 1500) {return 7;}
  if (largura >= 1200) {return 6;}
  if (largura >= 992) {return 5;}
  if (largura >= 768) {return 4;}
  if (largura >= 576) {return 2;}

  return 1;
}
}
