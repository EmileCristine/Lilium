import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports:[RouterLink],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

  title = '';
  text = '';
  buttonText: string | null = null;
  buttonRoute: string | null = null;

  constructor(private router: Router) {

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        this.changeBanner(event.url);
      }

    });

  }

  changeBanner(url: string) {

    if (url.includes('/floriografia')) {

      this.title = 'FLORIOGRAFIA: A linguagem secreta das flores';

      this.text = `
        Mais que um presente, uma mensagem: Diga o que o coração sente
        através da linguagem secreta das flores.
      `;

      this.buttonText = null;
      this.buttonRoute = null;

    }

    else if (url === '/') {

      this.title = 'TUDO SOBRE FLORES EM UM SÓ LUGAR';

      this.text = `
        Vá além do básico com dicas exclusivas para montar arranjos
        deslumbrantes, fatos históricos surpreendentes e significados ocultos
        na linguagem das flores.
      `;

      this.buttonText = 'Explore o Catálogo';
      this.buttonRoute = '/flores'

    }

  }

}