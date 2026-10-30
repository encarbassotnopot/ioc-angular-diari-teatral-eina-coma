import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OBRES } from './mocks/obres.mock';
import { LlistaObresComponent } from './components/llista-obres/llista-obres.component';
import { FiltreObresComponent } from './components/filtre-obres/filtre-obres.component';
import { CategoriaObra, Obra } from './models/obra.model';

@Component({
  imports: [RouterOutlet, LlistaObresComponent, FiltreObresComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  obresVisibles = [...OBRES];
  obraSeleccionada?: Obra;

  aplicarFiltres = (f: {text: string, categoria?: CategoriaObra}) => {
    const text = f.text.trim().toLocaleLowerCase()
    this.obresVisibles = [...OBRES].filter(o => o.titol.toLocaleLowerCase().includes(text) && (f.categoria === undefined || o.categoria === f.categoria))
    if (this.obresVisibles && !this.obresVisibles.some(o => o === this.obraSeleccionada)) this.obraSeleccionada = undefined;
  }

  selecciona(obra: Obra) {
    this.obraSeleccionada = obra;
  }
}
