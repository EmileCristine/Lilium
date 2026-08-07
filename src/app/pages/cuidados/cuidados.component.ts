import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { CarrosselComponent } from "../../components/carrossel/carrossel.component";
import { SearchComponent } from "../../components/search/search.component";
import { BannerFlorComponent } from "../../components/banner-flor/banner-flor.component";

@Component({
  selector: 'app-cuidados',
  imports: [FooterComponent, CarrosselComponent, SearchComponent, BannerFlorComponent],
  templateUrl: './cuidados.component.html',
  styleUrl: './cuidados.component.css'
})
export class CuidadosComponent {
    floresFiltradas: any[] = []

  atualizarDadosCarrossel(dados: any[]): void {
    this.floresFiltradas = dados
  }
}
