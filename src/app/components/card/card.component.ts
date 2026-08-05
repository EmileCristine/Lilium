import { Component, Input } from '@angular/core';

interface Flor {
  nome: string;
  nomeCientifico: string;
  resume: string;
  estacao: string;
  mes: string;
  cor: string;
  significado: string;
  imagem: string;
}

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent {
  @Input({ required: true }) flor!: Flor;
}
