import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
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
export class GaleryComponent implements OnInit, OnChanges {
  @Input({ required: true })
  listaFlores: Flor[] = [];

  colunas: Flor[][] = [];
  quantidadeColunas = 6;

  ngOnInit(): void {
    this.atualizarQuantidadeColunas(window.innerWidth);
    this.distribuirFlores();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listaFlores']) {
      this.distribuirFlores();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const larguraTela = (event.target as Window).innerWidth;
    const colunasAnteriores = this.quantidadeColunas;
    
    this.atualizarQuantidadeColunas(larguraTela);

    if (colunasAnteriores !== this.quantidadeColunas) {
      this.distribuirFlores();
    }
  }

  private atualizarQuantidadeColunas(larguraTela: number): void {
    if (larguraTela < 576) {
      this.quantidadeColunas = 1;
    } else if (larguraTela < 768) {
      this.quantidadeColunas = 2;
    } else if (larguraTela < 992) {
      this.quantidadeColunas = 3;
    } else if (larguraTela < 1200) {
      this.quantidadeColunas = 4;
    } else if (larguraTela < 1500){
      this.quantidadeColunas = 6;
    } else {
      this.quantidadeColunas = 8;
    }
  }

  private distribuirFlores(): void {
    if (!this.listaFlores || this.listaFlores.length === 0) {
      this.colunas = [];
      return;
    }

    this.colunas = Array.from({ length: this.quantidadeColunas }, () => []);

    const floresDesmembradas: Flor[] = [];

    this.listaFlores.forEach((flor) => {
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

    floresDesmembradas.forEach((flor, index) => {
      const colunaDestino = index % this.quantidadeColunas;
      this.colunas[colunaDestino].push(flor);
    });
  }
}