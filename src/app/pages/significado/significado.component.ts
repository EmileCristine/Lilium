import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerFlorComponent } from '../../components/banner-flor/banner-flor.component';
import { CarrosselComponent } from '../../components/carrossel/carrossel.component';
import { SearchComponent } from '../../components/search/search.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { FlorService } from '../../services/flor.service';
import { Flor } from '../../models/flor.model';


@Component({
  selector: 'app-significado',
  standalone: true,
  imports: [
    CommonModule,
    BannerFlorComponent,
    SearchComponent,
    CarrosselComponent,
    FooterComponent
  ],
  templateUrl: './significado.component.html',
  styleUrl: './significado.component.css'
})
export class SignificadoComponent implements OnInit {


  private florService = inject(FlorService);


  floresFiltradas: Flor[] = [];



  ngOnInit(): void {

    this.carregarFlores();

  }



  private carregarFlores(): void {

    this.florService
      .getFlores()
      .subscribe({

        next:(flores)=>{

          this.floresFiltradas = flores;

        },

        error:(erro)=>{

          console.error(
            'Erro ao carregar flores:',
            erro
          );

          this.floresFiltradas = [];

        }

      });

  }



  atualizarDadosCarrossel(dados: Flor[]): void {

    this.floresFiltradas = dados;

  }

}