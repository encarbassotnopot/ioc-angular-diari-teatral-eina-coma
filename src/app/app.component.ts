import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OBRES } from './mocks/obres.mock';
import { LlistaObresComponent } from './components/llista-obres/llista-obres.component';
import { FiltreObresComponent } from './components/filtre-obres/filtre-obres.component';
import { CategoriaObra, ObraCataleg } from './models/obra.model';
import { CriterisCerca, ObraService } from './services/obra.service';

@Component({
  imports: [RouterOutlet, LlistaObresComponent, FiltreObresComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {

  obresVisibles = [...OBRES];
  obraSeleccionada?: ObraCataleg;

  readonly obraService = inject(ObraService);

  ngOnInit(): void {
    this.obraService.carregarTot();
  }
  reintentar(): void {
    this.obraService.reintentar();
  }
  onCerca(criteris: CriterisCerca): void {
    this.obraService.cercar(criteris);
  }

  aplicarFiltres = (f: { text: string, categoria?: CategoriaObra }) => {
    const text = f.text.trim().toLocaleLowerCase()
    this.obresVisibles = this.obraService.estat().elements.filter(o => o.titol.toLocaleLowerCase().includes(text) && (f.categoria === undefined || o.categoria === f.categoria))
    if (this.obresVisibles && !this.obresVisibles.some(o => o === this.obraSeleccionada)) this.obraSeleccionada = undefined;
  }

  selecciona(obra: ObraCataleg) {
    this.obraSeleccionada = obra;
  }
}
