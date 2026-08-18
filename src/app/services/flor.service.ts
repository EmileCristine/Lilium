import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Flor } from '../models/flor.model';
@Injectable({
  providedIn: 'root',
})
export class FlorService {
  private readonly http = inject(HttpClient);
  private readonly url = 'data/flowers.json';
  getFlores(): Observable<Flor[]> {
    return this.http.get<Flor[]>(this.url);
  }

  buscarPorSlug(slug: string): Observable<Flor | undefined> {
    return this.getFlores().pipe(
      map((flores) => flores.find((flor) => flor.slug === slug)),
    );
  }
}