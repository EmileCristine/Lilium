import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Flor } from '../../models/flor.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({ required: true }) flor!: Flor;

  private router = inject(Router);

  irPara() {
    const paginaAtual = this.router.url;
    const nomeFlor = this.flor.nome.toLowerCase();

    if (paginaAtual.includes('/floriografia')) {
      this.router.navigate(['/floriografia', nomeFlor, 'significado']);
    } else if (paginaAtual.includes('/cuidados')) {
      this.router.navigate(['/flores', nomeFlor, 'cuidados']);
    } else {
      this.router.navigate(['/flores', nomeFlor, 'caracteristicas']);
    }
  }
}
