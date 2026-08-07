import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { FlorService } from '../../services/flor.service';
import { Flor } from '../../models/flor.model';


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


  florDados?: Flor;

  btn1 = '';
  btn2 = '';
  texto = '';



  ngOnInit(): void {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event) => {

        const navigation = event as NavigationEnd;

        this.atualizarDadosFlor();
        this.changeBanner(navigation.url);

      });


    this.atualizarDadosFlor();
    this.changeBanner(this.router.url);

  }



  private atualizarDadosFlor(): void {

    let rotaAtiva = this.route;

    while (rotaAtiva.firstChild) {
      rotaAtiva = rotaAtiva.firstChild;
    }


    const nomeUrl =
      rotaAtiva.snapshot.paramMap.get('flor') ||
      rotaAtiva.snapshot.paramMap.get('nome');


    if (!nomeUrl) {
      return;
    }


    this.florService
      .buscarPorNome(nomeUrl)
      .subscribe({

        next:(flor)=>{

          this.florDados = flor;

          this.changeBanner(this.router.url);

        },

        error:(erro)=>{

          console.error(
            'Erro buscando flor:',
            erro
          );

          this.florDados = undefined;

        }

      });

  }




  changeBanner(url:string){

    if(!this.florDados){

      this.texto = 'Informações indisponíveis.';
      return;

    }



    if(url.includes('/caracteristicas')){

      this.btn1 = 'Cuidados';
      this.btn2 = 'Floriografia';

      this.texto =
        this.florDados.caracteristicasTxt;


    }else if(url.includes('/significado')){

      this.btn1 = 'Cuidados';
      this.btn2 = 'Características';

      this.texto =
        this.florDados.floriografiaTxt;


    }else if(url.includes('/cuidados')){

      this.btn1 = 'Características';
      this.btn2 = 'Floriografia';

      this.texto =
        this.florDados.cuidadosTxt;

    }

  }




  navegarPara(labelBotao:string){

    if(!this.florDados)
      return;



    const nomeFlor =
      this.florDados.nome.toLowerCase();


    const label =
      labelBotao.toLowerCase();



    if(label === 'cuidados'){

      this.router.navigate([
        '/flores',
        nomeFlor,
        'cuidados'
      ]);


    }else if(
      label === 'características' ||
      label === 'caracteristicas'
    ){

      this.router.navigate([
        '/flores',
        nomeFlor,
        'caracteristicas'
      ]);


    }else if(label === 'floriografia'){

      this.router.navigate([
        '/floriografia',
        nomeFlor,
        'significado'
      ]);

    }

  }

}