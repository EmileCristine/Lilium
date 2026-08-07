export interface VariacaoCor {
  nome: string;
  significado?: string;
  imagem: string;
  imgSemFundo: string;
}


export interface Flor {

  id?: number;

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