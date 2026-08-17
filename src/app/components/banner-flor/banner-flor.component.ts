import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

import { FlorService } from '../../services/flor.service';
import { Flor } from '../../models/flor.model';

@Component({
  selector: 'app-banner-flor',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './banner-flor.component.html',
  styleUrl: './banner-flor.component.css',
})
export class BannerFlorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private florService = inject(FlorService);
  private router = inject(Router);

  @Input() flor?: Flor;

  florDados?: Flor;
  abaAtiva: 'caracteristicas' | 'cuidados' | 'floriografia' = 'caracteristicas';

  btn1 = '';
  btn2 = '';
  texto = '';

  ngOnInit(): void {
    this.definirAbaInicialPorUrl(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.definirAbaInicialPorUrl(event.url);
        this.atualizarDadosFlor();
      });

    this.atualizarDadosFlor();
  }

  private definirAbaInicialPorUrl(url: string): void {
    if (url.includes('/cuidados')) {
      this.abaAtiva = 'cuidados';
    } else if (url.includes('/significado') || url.includes('/floriografia')) {
      this.abaAtiva = 'floriografia';
    } else {
      this.abaAtiva = 'caracteristicas';
    }
  }

  private atualizarDadosFlor(): void {
    if (this.flor) {
      this.florDados = this.flor;
      this.atualizarInterface();
      return;
    }

    let rotaAtiva = this.route;
    while (rotaAtiva.firstChild) {
      rotaAtiva = rotaAtiva.firstChild;
    }

    const slug =
      rotaAtiva.snapshot.paramMap.get('flor') ||
      rotaAtiva.snapshot.paramMap.get('slug');

    if (!slug) {
      console.warn('Slug não encontrado na rota');
      return;
    }

    this.florService.buscarPorSlug(slug).subscribe({
      next: (flor) => {
        this.florDados = flor;
        this.atualizarInterface();
      },
      error: (erro) => {
        console.error('Erro buscando flor:', erro);
        this.florDados = undefined;
      },
    });
  }

  atualizarInterface(): void {
    if (!this.florDados) {
      this.texto = 'Informações indisponíveis.';
      return;
    }

    if (this.abaAtiva === 'caracteristicas') {
      this.btn1 = 'Cuidados';
      this.btn2 = 'Floriografia';
      this.texto = this.florDados.caracteristicasTxt;
    } else if (this.abaAtiva === 'floriografia') {
      this.btn1 = 'Cuidados';
      this.btn2 = 'Características';
      this.texto = this.florDados.floriografiaTxt;
    } else if (this.abaAtiva === 'cuidados') {
      this.btn1 = 'Características';
      this.btn2 = 'Floriografia';
      this.texto = this.florDados.cuidadosTxt;
    }
  }

  navegarPara(labelBotao: string): void {
    if (!this.florDados) return;

    const label = labelBotao.toLowerCase();

    if (label === 'cuidados') {
      this.abaAtiva = 'cuidados';
    } else if (label === 'características' || label === 'caracteristicas') {
      this.abaAtiva = 'caracteristicas';
    } else if (label === 'floriografia' || label === 'significado') {
      this.abaAtiva = 'floriografia';
    }

    this.atualizarInterface();
  }
}
