export interface Flor {
  id: number;
  nome: string;
  slug: string;
  nomeCientifico: string;
  resume: string;
  caracteristicasTxt: string;
  floriografiaTxt: string;
  cuidadosTxt: string;
  estacao: string;
  mes: string;
  significadoPadrao: string;

  cores: {
    nome: string;
    significado: string;
    imagem: string;
    imgSemFundo: string;
  }[];
}