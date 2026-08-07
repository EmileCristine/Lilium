import { Component, OnInit, inject } from '@angular/core';
import { Flor } from '../../models/flor.model';
import { FlorService } from '../../services/flor.service';
import { BannerComponent } from '../../components/banner/banner.component';
import { SearchComponent } from '../../components/search/search.component';
import { CarrosselComponent } from '../../components/carrossel/carrossel.component';
import { FooterComponent } from '../../components/footer/footer.component';
@Component({
  selector: 'app-floriografia',
  standalone: true,
  imports: [
    BannerComponent,
    SearchComponent,
    CarrosselComponent,
    FooterComponent
  ],
  templateUrl: './floriografia.component.html',
  styleUrl: './floriografia.component.css',
})
export class FloriografiaComponent implements OnInit {


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



  atualizarDadosCarrossel(flores: Flor[]): void {

    this.floresFiltradas = flores;

  }

}