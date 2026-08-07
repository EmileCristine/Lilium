import { Injectable } from '@angular/core';

export interface VariacaoCor {
  nome: string;
  significado?: string;
  imagem: string;
  imgSemFundo: string;
}

export interface Flor {
  nome: string;
  nomeCientifico: string;
  resume: string;
  caracteristicasTxt: string;
  floriografiaTxt: string;
  cuidadosTxt: string;
  estacao: string;
  mes: string;
  cores: VariacaoCor[];
  significadoPadrao: string;
}

@Injectable({
  providedIn: 'root',
})
export class FlorService {
  
  todasAsFlores: Flor[] = [
    {
      nome: 'Orquídea',
      nomeCientifico: 'Orchidaceae',
      resume: 'Flores exóticas e elegantes que representam a beleza refinada.',
      caracteristicasTxt: ``,
      floriografiaTxt: ``,
      cuidadosTxt: ``,
      estacao: 'primavera',
      mes: 'setembro',
      significadoPadrao: 'respeito',
      cores: [
        {
          nome: 'roxo',
          significado: '',
          imgSemFundo: 'https://i.pinimg.com/736x/09/65/e1/0965e178cb523ab031a5110cef0c81a4.jpg',
          imagem: 'https://i.pinimg.com/736x/27/b3/23/27b323d6506bb37f1cb521078dfc4ef0.jpg',
        },
      ],
    },
    {
      nome: 'Rosa',
      nomeCientifico: 'Rosa L.',
      resume: 'A clássica flor dos namorados, símbolo universal do romantismo.',
      caracteristicasTxt: ``,
      floriografiaTxt: ``,
      cuidadosTxt: ``,
      estacao: 'primavera',
      mes: 'outubro',
      significadoPadrao: 'amor',
      cores: [
        {
          nome: 'vermelho',
          significado: 'amor profundo',
          imgSemFundo:
            'https://i.pinimg.com/736x/ae/70/f3/ae70f3309f0837d485c6505465629b6d.jpg',
          imagem:
            'https://i.pinimg.com/736x/08/5b/97/085b97b89d755bf92e9e184190aa0d7f.jpg',
        },
        {
          nome: 'branco',
          significado: 'pureza',
          imgSemFundo:
            'https://i.pinimg.com/736x/ae/70/f3/ae70f3309f0837d485c6505465629b6d.jpg',
          imagem:
            'https://i.pinimg.com/736x/08/5b/97/085b97b89d755bf92e9e184190aa0d7f.jpg',
        },
      ],
    },
    {
      nome: 'Margarida',
      nomeCientifico: 'Bellis perennis',
      resume: 'Representa a pureza do campo e a simplicidade da natureza.',
      caracteristicasTxt: ``,
      floriografiaTxt: ``,
      cuidadosTxt: ``,
      estacao: 'verao',
      mes: 'janeiro',
      significadoPadrao: 'felicidade',
      cores: [
        {
          nome: 'branco',
          significado: '',
          imgSemFundo: 'https://i.pinimg.com/1200x/6d/c7/e2/6dc7e2c2ad553fb03a56af1aa6a3ce40.jpg',
          imagem: 'https://i.pinimg.com/736x/1b/b1/c4/1bb1c4d699afa9f21b6365a6b2ff1ae0.jpg'
        },
      ],
    },
    {
      nome: 'Fresia',
      nomeCientifico: 'Freesia x hybrida',
      resume:
        'Flores perfumadas ideais para cultivo em vasos e arranjos vivos.',
      caracteristicasTxt: ``,
      floriografiaTxt: ``,
      cuidadosTxt: ``,
      estacao: 'outono',
      mes: 'maio',
      significadoPadrao: 'pureza',
      cores: [
        {
          nome: 'branco',
          significado: 'pureza',
          imgSemFundo: 'https://i.pinimg.com/736x/0a/01/19/0a011973e08d27ea277453cd85a364c8.jpg',
          imagem: 'https://i.pinimg.com/1200x/92/15/7e/92157e7027d2aee3a486aa213ef766d0.jpg',
        }
      ],
    },
    {
      nome: 'Girassol',
      nomeCientifico: 'Helianthus annuus',
      resume:
        'Sempre busca a luz do sol, trazendo energia positiva aos ambientes.',
      caracteristicasTxt: ``,
      floriografiaTxt: ``,
      cuidadosTxt: ``,
      estacao: 'verao',
      mes: 'dezembro',
      significadoPadrao: 'felicidade',
      cores: [
        {
          nome: 'amarelo',
          significado: 'felicidade',
          imgSemFundo: 'https://i.pinimg.com/1200x/40/6e/18/406e1810160399e2004ae8f0394ff340.jpg',
          imagem: 'https://i.pinimg.com/736x/dc/3f/1b/dc3f1b7928f44ab0f34c2ea537bd628a.jpg',
        },
      ],
    },
    {
      nome: 'Tulipa',
      nomeCientifico: 'Tulipa L.',
      resume: 'Flores de inverno que encantam com suas cores vibrantes.',
      caracteristicasTxt: ``,
      floriografiaTxt: ``,
      cuidadosTxt: ``,
      estacao: 'inverno',
      mes: 'julho',
      significadoPadrao: 'amor',
      cores: [
        {
          nome: 'vermelho',
          significado: 'amor',
          imgSemFundo: 'https://i.pinimg.com/736x/49/22/43/492243768d79a5cfd190affef7533ef2.jpg',
          imagem: 'https://i.pinimg.com/1200x/ac/64/bf/ac64bf44b627e258ee6bcb9c5f08470d.jpg',
        },
      ],
    },
    {
      nome: 'Lírio',
      nomeCientifico: 'Lilium L.',
      resume: 'Grandes pétalas majestosas com fragrância marcante.',
      caracteristicasTxt: ``,
      floriografiaTxt: ``,
      cuidadosTxt: ``,
      estacao: 'outono',
      mes: 'abril',
      significadoPadrao: 'pureza',
      cores: [
        {
          nome: 'branco',
          significado: 'pureza',
          imgSemFundo: 'https://i.pinimg.com/736x/c5/12/b4/c512b413ad2e3b05224af314343607c1.jpg',
          imagem: 'https://i.pinimg.com/736x/e8/15/88/e81588e63c458185cae31c64c13b2b29.jpg',
        },
      ],
    },
    {
      nome: 'Hortênsia',
      nomeCientifico: 'Hydrangea macrophylla',
      resume: 'Cresce em lindos buquês naturais de coloração azulada.',
      caracteristicasTxt: ``,
      floriografiaTxt: ``,
      cuidadosTxt: ``,
      estacao: 'inverno',
      mes: 'junho',
      significadoPadrao: 'gratidao',
      cores: [
        {
          nome: 'azul',
          significado: 'gratidao',
          imgSemFundo: 'https://i.pinimg.com/736x/8c/2a/f4/8c2af4da8e06d2f729679fec2fabc184.jpg',
          imagem: 'https://i.pinimg.com/736x/f5/b9/ba/f5b9ba30cdd8f177a0e407a7b658a31e.jpg',
        },
      ],
    },
    {
      nome: 'Lavanda',
      nomeCientifico: 'Lavandula ',
      resume: 'Famosa por suas propriedades calmantes e tom arroxeado.',
      caracteristicasTxt: ``,
      floriografiaTxt: ``,
      cuidadosTxt: ``,
      estacao: 'primavera',
      mes: 'novembro',
      significadoPadrao: 'esperanca',
      cores: [
        {
          nome: 'roxo',
          significado: 'esperanca',
          imgSemFundo: 'https://i.pinimg.com/736x/02/21/e2/0221e21c9272e0ba688e50ad495b73ed.jpg',
          imagem: 'https://i.pinimg.com/736x/b1/04/04/b1040430f925f8e4dffbe9746ed159cc.jpg',
        },
      ],
    },
    {
      nome: 'Crisântemo',
      nomeCientifico: 'Chrysanthemum',
      resume: 'Flor tradicional de outono com grande variedade de pétalas.',
      caracteristicasTxt: ``,
      floriografiaTxt: ``,
      cuidadosTxt: ``,
      estacao: 'outono',
      mes: 'março',
      significadoPadrao: 'luto',
      cores: [
        {
          nome: 'amarelo',
          significado: 'luto',
          imgSemFundo: 'https://i.pinimg.com/736x/cc/bb/58/ccbb58d0749cb6ff15ee73160111e8b8.jpg',
          imagem: 'https://i.pinimg.com/1200x/93/59/59/935959aa54754562d5812c384b53d355.jpg',
        },
      ],
    },
    {
      nome: 'Cravina',
      nomeCientifico: 'Dianthus chinensis',
      resume: 'Delicada e resistente, perfeita para bordas de jardins.',
      caracteristicasTxt: ``,
      floriografiaTxt: ``,
      cuidadosTxt: ``,
      estacao: 'primavera',
      mes: 'setembro',
      significadoPadrao: 'amizade',
      cores: [
        {
          nome: 'rosa',
          significado: 'amizade',
          imgSemFundo: 'https://i.pinimg.com/1200x/b6/39/a8/b639a8fc69b8789f46faf10806f4d23c.jpg',
          imagem: 'https://i.pinimg.com/736x/20/60/f4/2060f45d5ddfc13f21f6c1031d4555c6.jpg',
        },
      ],
    },
    {
      nome: 'Copo de Leite',
      nomeCientifico: 'Zantedeschia',
      resume: 'Visual minimalista e sofisticado muito usado em decorações.',
      caracteristicasTxt: ``,
      floriografiaTxt: ``,
      cuidadosTxt: ``,
      estacao: 'inverno',
      mes: 'agosto',
      significadoPadrao: 'respeito',
      cores: [
        {
          nome: 'branco',
          significado: 'respeito',
          imgSemFundo: 'https://i.pinimg.com/736x/dd/f3/ca/ddf3ca9106adb0e1b6f286bf8365a73c.jpg',
          imagem: 'https://i.pinimg.com/736x/b6/2f/be/b62fbe1ac50015cd401a44cbba1732e4.jpg',
        },
      ],
    },
    {
      nome: 'Gérbera',
      nomeCientifico: 'Gerbera jamesonii',
      resume: 'Cores quentes que iluminam qualquer arranjo.',
      caracteristicasTxt: ``,
      floriografiaTxt: ``,
      cuidadosTxt: ``,
      estacao: 'verao',
      mes: 'fevereiro',
      significadoPadrao: 'felicidade',
      cores: [
        {
          nome: 'laranja',
          significado: '',
          imgSemFundo: 'https://i.pinimg.com/736x/6d/3c/82/6d3c8212f27c84ffdf3169dd39ff70a5.jpg',
          imagem: 'https://i.pinimg.com/736x/b0/73/a3/b073a30b227ce211ce02dc617e5d7cad.jpg',
        },
        {
          nome: 'amarelo',
          significado: '',
          imgSemFundo: '',
          imagem: '',
        },
      ],
    },
    {
      nome: 'Antúrio',
      nomeCientifico: 'Anthurium',
      resume: 'Suas folhas modificadas brilhantes parecem corações de cera.',
      caracteristicasTxt: ``,
      floriografiaTxt: ``,
      cuidadosTxt: ``,
      estacao: 'outono',
      mes: 'maio',
      significadoPadrao: 'gratidao',
      cores: [
        {
          nome: 'vermelho',
          significado: 'gratidao',
          imgSemFundo: 'https://i.pinimg.com/1200x/45/8c/66/458c6637827ae5f361f5cc204a40f6fe.jpg',
          imagem: 'https://i.pinimg.com/736x/1a/21/05/1a2105c17e9efb18d7ab4c2e36f91258.jpg',
        },
      ],
    },
    {
      nome: 'Azaleia',
      nomeCientifico: 'Rhododendron',
      resume: 'Arbusto florido clássico que suporta muito bem o frio.',
      caracteristicasTxt: ``,
      floriografiaTxt: ``,
      cuidadosTxt: ``,
      estacao: 'inverno',
      mes: 'julho',
      significadoPadrao: 'amor',
      cores: [
        {
          nome: 'rosa',
          significado: 'amor',
          imgSemFundo: 'https://i.pinimg.com/1200x/d4/06/f1/d406f18129fc5963f20f0bf7da6274ea.jpg',
          imagem: 'https://i.pinimg.com/736x/9c/6e/a8/9c6ea83e186931d163544db42ac9d76c.jpg',
        },
      ],
    },
  ];

  getFlores(): Flor[] {
    return this.todasAsFlores;
  }

  buscarPorNome(nome: string): Flor | undefined {
    return this.todasAsFlores.find(
      (f) => f.nome.toLowerCase() === nome.toLowerCase(),
    );
  }

  constructor() {}
}
