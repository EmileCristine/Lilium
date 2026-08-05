import { Component } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { GaleryComponent } from '../../components/galery/galery.component';

@Component({
  selector: 'app-flores',
  imports: [SearchComponent, GaleryComponent],
  templateUrl: './flores.component.html',
  styleUrl: './flores.component.css'
})
export class FloresComponent {

}
