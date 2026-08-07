import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Flor } from '../models/flor.model';


@Injectable({
  providedIn: 'root'
})
export class FlorService {


  private http = inject(HttpClient);


  private url = 'data/flowers.json';



  getFlores(): Observable<Flor[]> {

    return this.http.get<Flor[]>(this.url);

  }


 buscarPorNome(nome:string): Observable<Flor | undefined>{

  return this.http
    .get<Flor[]>('assets/data/flores.json')
    .pipe(

      map(flores => 
        flores.find(
          flor =>
          flor.nome.toLowerCase() === nome.toLowerCase()
        )
      )
    )
  }
}