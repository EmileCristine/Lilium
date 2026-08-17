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
    const nomeFlor = this.flor.slug.toLowerCase();

      this.router.navigate(['/flores', nomeFlor]);
  }
}
