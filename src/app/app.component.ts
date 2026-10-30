import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TargetaObraComponent } from './components/targeta-obra/targeta-obra.component';
import { OBRES } from './mocks/obres.mock';
import { LlistaObresComponent } from './components/llista-obres/llista-obres.component';
import { FiltreObresComponent } from './components/filtre-obres/filtre-obres.component';

@Component({
  imports: [RouterOutlet, LlistaObresComponent, FiltreObresComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  public readonly nomApp = signal('Diari Teatral');
  obres = OBRES;
}
