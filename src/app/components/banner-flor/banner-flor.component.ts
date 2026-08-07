import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router'
import { FlorService, Flor } from '../../services/flor.service'

@Component({
  selector: 'app-banner-flor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner-flor.component.html',
  styleUrl: './banner-flor.component.css',
})
export class BannerFlorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private florService = inject(FlorService);
  private router = inject(Router);
  
  florDados: Flor | undefined;
  btn1 = '';
  btn2 = '';
  texto = ''

  private atualizarDadosFlor(): void {
    let rotaAtiva = this.route;
    while (rotaAtiva.firstChild) {
      rotaAtiva = rotaAtiva.firstChild;
    }
    
    const nomeUrl =
      rotaAtiva.snapshot.paramMap.get('flor') ||
      rotaAtiva.snapshot.paramMap.get('nome') ||
      this.route.snapshot.paramMap.get('flor');

    if (nomeUrl) {
      this.florDados = this.florService.buscarPorNome(nomeUrl);
    }
  }

    ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.atualizarDadosFlor(); 
        this.changeBanner(event.url); 
      }
    });
    this.atualizarDadosFlor();
    this.changeBanner(this.router.url);
  }

  changeBanner(url: string) {
    if (!this.florDados) {
      this.texto = 'Informações indisponíveis.';
      return;
    }

    if (url.includes('/caracteristicas')) {
      this.btn1 = 'Cuidados';
      this.btn2 = 'Floriografia';
      this.texto = this.florDados.caracteristicasTxt; 
    } else if (url.includes('/significado')) {
      this.btn1 = 'Cuidados';
      this.btn2 = 'Características';
      this.texto = this.florDados.floriografiaTxt; 
    } else if (url.includes('/cuidados')) {
      this.btn1 = 'Características';
      this.btn2 = 'Floriografia';
      this.texto = this.florDados.cuidadosTxt; 
    }
  }

  navegarPara(labelBotao: string): void {
    if (!this.florDados) return;
    
    const nomeFlor = this.florDados.nome.toLowerCase();
    const label = labelBotao.toLowerCase();

    if (label === 'cuidados') {
      this.router.navigate(['/flores', nomeFlor, 'cuidados']);
    } else if (label === 'características' || label === 'caracteristicas') {
      this.router.navigate(['/flores', nomeFlor, 'caracteristicas']);
    } else if (label === 'floriografia') {
      this.router.navigate(['/floriografia', nomeFlor, 'significado']);
    }
  }
}
