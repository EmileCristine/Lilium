import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerFlorComponent } from "../../components/banner-flor/banner-flor.component";
import { CarrosselComponent } from "../../components/carrossel/carrossel.component";
import { SearchComponent } from '../../components/search/search.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Flor, FlorService } from '../../services/flor.service';

@Component({
  selector: 'app-significado',
  imports: [CommonModule, BannerFlorComponent,SearchComponent, CarrosselComponent, FooterComponent],
  templateUrl: './significado.component.html',
  styleUrl: './significado.component.css'
})
export class SignificadoComponent {
    floresFiltradas: any[] = []

  atualizarDadosCarrossel(dados: any[]): void {
    this.floresFiltradas = dados
  }
}
