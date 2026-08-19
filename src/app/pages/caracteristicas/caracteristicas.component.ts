import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerFlorComponent } from "../../components/banner-flor/banner-flor.component";
import { CarrosselComponent } from "../../components/carrossel/carrossel.component";
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-caracteristicas',
  imports: [CommonModule, BannerFlorComponent, CarrosselComponent, FooterComponent],
  templateUrl: './caracteristicas.component.html',
  styleUrl: './caracteristicas.component.css'
})
export class CaracteristicasComponent{
    floresFiltradas: any[] = []

  atualizarDadosCarrossel(dados: any[]): void {
    this.floresFiltradas = dados
  }
}
