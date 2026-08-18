import { Component, inject } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { SobreComponent } from '../../components/sobre/sobre.component';
import { ArranjoComponent } from "../../components/arranjo/arranjo.component";
import { EternizarComponent } from "../../components/eternizar/eternizar.component";
import { CarrosselComponent } from "../../components/carrossel/carrossel.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FlorService } from '../../services/flor.service';
import { Flor } from '../../models/flor.model';

@Component({
  selector: 'app-home',
  imports: [
    BannerComponent,
    SobreComponent,
    ArranjoComponent,
    EternizarComponent,
    CarrosselComponent,
    FooterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private florService = inject(FlorService);

  floresFiltradas: Flor[] = [];

  ngOnInit(): void {
    this.carregarFlores();
  }

  private carregarFlores(): void {
    this.florService.getFlores().subscribe({
      next: (flores) => {
        this.floresFiltradas = flores;
      },
      error: (erro) => {
        console.error('Erro ao carregar flores:', erro);
        this.floresFiltradas = [];
      },
    });
  }
}
