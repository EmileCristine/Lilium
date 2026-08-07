import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Flor } from '../../models/flor.model';

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './galery.component.html',
  styleUrl: './galery.component.css',
})
export class GaleryComponent {

  @Input({ required: true })
  listaFlores: Flor[] = [];

  @ViewChild('masonry', { read: ElementRef })
  masonryElement!: ElementRef<HTMLDivElement>;

  colunas = Array.from({ length: 6 }, (_, i) => i);
}