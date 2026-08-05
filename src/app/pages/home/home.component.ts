import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { SobreComponent } from '../../components/sobre/sobre.component';
import { ArranjoComponent } from "../../components/arranjo/arranjo.component";
import { EternizarComponent } from "../../components/eternizar/eternizar.component";
import { SecondBannerComponent } from "../../components/second-banner/second-banner.component";
import { CarrosselComponent } from "../../components/carrossel/carrossel.component";
import { SearchComponent } from "../../components/search/search.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [
    BannerComponent,
    SobreComponent,
    ArranjoComponent,
    EternizarComponent,
    SecondBannerComponent,
    CarrosselComponent,
    SearchComponent,
    FooterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  floresFiltradas: any[] = []

  atualizarDadosCarrossel(dados: any[]): void {
    this.floresFiltradas = dados
  }

}
