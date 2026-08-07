import { FlorService, Flor, VariacaoCor } from './../../services/flor.service';
import {
AfterViewInit,
Component,
EventEmitter,
HostListener,
OnInit,
Output,
inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router'; 

@Component({
selector: 'app-search',
standalone: true,
imports: [FormsModule, NgIf, RouterLink],
templateUrl: './search.component.html',
styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit, AfterViewInit {
@Output() filtrosAlterados = new EventEmitter<Flor[]>(); 

private FlorService = inject(FlorService); 

filtroEstacao: string = '';
filtroMes: string = '';
filtroCor: string = '';
filtroSignificado: string = '';
pesquisaTexto: string = '';
dropdownAberto: string | null = null; 

todasAsFlores: Flor[] = [];
floresFiltradas: Flor[] = []; 

title = '';
subTitle: string | null = null; 

constructor(private router: Router) {
this.router.events.subscribe(event => {
if (event instanceof NavigationEnd) {
this.changeSearch(event.url);
}
});
} 

ngOnInit(): void {
this.todasAsFlores = this.FlorService.getFlores();
this.aplicarFiltros();
} 

ngAfterViewInit(): void {
setTimeout(() => {
this.filtrosAlterados.emit(this.floresFiltradas);
});
} 

toggleDropdown(menu: string): void {
this.dropdownAberto = this.dropdownAberto === menu ? null : menu;
} 

selecionarOpcao(filtro: string, valor: string): void {
if (filtro === 'estacao') this.filtroEstacao = valor;
if (filtro === 'mes') this.filtroMes = valor;
if (filtro === 'cor') this.filtroCor = valor;
if (filtro === 'significado') this.filtroSignificado = valor; 

this.dropdownAberto = null;
this.aplicarFiltros();
} 

exibirRotulo(tipo: string, valor: string, padrao: string): string {
if (!valor) return padrao;
return valor.charAt(0).toUpperCase() + valor.slice(1);
} 

private normalizarTexto(texto: string): string {
if (!texto) return '';
return texto
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, "")
.toLowerCase()
.replace(/\s+/g, ' ')
.trim();
} 

aplicarFiltros(): void {
const textoDigitado = this.normalizarTexto(this.pesquisaTexto); 

this.floresFiltradas = this.todasAsFlores.filter((flor) => {
const correspondeEstacao =
!this.filtroEstacao || flor.estacao === this.filtroEstacao;

const correspondeMes = !this.filtroMes || flor.mes === this.filtroMes;

// Procura se o nome de alguma cor mapeada bate com o filtro
const correspondeCor =
!this.filtroCor || flor.cores.some(c => c.nome === this.filtroCor);

// Valida contra o significado padrão ou o significado específico de alguma variação de cor
const correspondeSignificado =
!this.filtroSignificado ||
flor.significadoPadrao === this.filtroSignificado ||
flor.cores.some(c => c.significado === this.filtroSignificado);

// Validação da barra de pesquisa varrendo propriedades e sub-propriedades
const correspondeTexto = !textoDigitado ||
this.normalizarTexto(flor.nome).includes(textoDigitado) ||
this.normalizarTexto(flor.nomeCientifico).includes(textoDigitado) ||
flor.cores.some(c => this.normalizarTexto(c.nome).includes(textoDigitado));

return (
correspondeEstacao &&
correspondeMes &&
correspondeCor &&
correspondeSignificado &&
correspondeTexto
);
});

this.filtrosAlterados.emit(this.floresFiltradas);

} 

limparFiltros(): void {
this.filtroEstacao = '';
this.filtroMes = '';
this.filtroCor = '';
this.filtroSignificado = '';
this.pesquisaTexto = '';
this.dropdownAberto = null;
this.aplicarFiltros();
} 

@HostListener('document:click', ['$event'])
cliqueFora(event: MouseEvent): void {
const alvo = event.target as HTMLElement;
if (!alvo.closest('.dropdown-custom')) {
this.dropdownAberto = null;
}
} 

changeSearch(url: string) {
if (url.includes('/home')) {
this.title = 'AS FLORES DO SEU MÊS';
this.subTitle = 'VER MAIS';
}
else if (url === ('/flores')) {
this.title = 'DESCUBRA MAIS FLORES';
this.subTitle = null;
}
else if (url.includes('/')) {
this.title = 'DESCUBRA MAIS FLORES';
this.subTitle = 'VER MAIS';
}
}
}