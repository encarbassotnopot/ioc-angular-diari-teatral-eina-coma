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

  selecciona(obra: ObraCataleg) {
    this.obraSeleccionada = obra;
  }
}
