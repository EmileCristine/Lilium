import { Component, OnInit, inject } from '@angular/core';

import { SearchComponent } from '../../components/search/search.component';
import { GaleryComponent } from '../../components/galery/galery.component';

import { FlorService } from '../../services/flor.service';
import { Flor } from '../../models/flor.model';

@Component({
  selector: 'app-flores',
  standalone: true,
  imports: [SearchComponent, GaleryComponent],
  templateUrl: './flores.component.html',
  styleUrl: './flores.component.css',
})
export class FloresComponent implements OnInit {
  private florService = inject(FlorService);

  floresParaExibir: Flor[] = [];

  ngOnInit(): void {
    this.carregarFlores();
  }

  private carregarFlores(): void {
    this.florService.getFlores().subscribe({
      next: (flores) => {
        console.log('DADOS DA API:', flores);

        this.floresParaExibir = flores;
      },

      error: (erro) => {
        console.error('Erro ao carregar flores:', erro);

        this.floresParaExibir = [];
      },
    });
  }

  atualizarGaleria(flores: Flor[]): void {
    console.log(
      'FLORES RECEBIDAS DO FILTRO:',
      flores.map((flor) => flor.nome),
    );

    this.floresParaExibir = flores;
  }
}
