import { Component, OnInit } from '@angular/core';
import { Flor, FlorService } from '../../services/flor.service';
import { BannerComponent } from '../../components/banner/banner.component';
import { SearchComponent } from '../../components/search/search.component';
import { CarrosselComponent } from '../../components/carrossel/carrossel.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-floriografia',
  imports: [BannerComponent, SearchComponent, CarrosselComponent, FooterComponent],
  templateUrl: './floriografia.component.html',
  styleUrl: './floriografia.component.css',
})


export class FloriografiaComponent implements OnInit {

  floresFiltradas: Flor[] = [];

  constructor(private florService: FlorService) {}

  ngOnInit(): void {
    this.floresFiltradas = this.florService.getFlores();
  }

  atualizarDadosCarrossel(flores: Flor[]) {
    this.floresFiltradas = flores;
  }
}