import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { GaleryComponent } from '../../components/galery/galery.component';
import { FlorService, Flor } from '../../services/flor.service';

@Component({
  selector: 'app-flores',
  imports: [SearchComponent, GaleryComponent],
  templateUrl: './flores.component.html',
  styleUrl: './flores.component.css',
})
export class FloresComponent implements OnInit {

  floresParaExibir: Flor[] = [];

  constructor(private florService: FlorService) {}

  ngOnInit(): void {
    this.floresParaExibir = this.florService.getFlores();
  }

  atualizarGaleria(flores: Flor[]): void {
    this.floresParaExibir = flores;
  }
}