import { Component, Input } from '@angular/core';
import { CategoriaObra } from '../../models/obra.model';

@Component({
  imports: [],
  selector: 'app-etiqueta-categoria',
  template: '<span class="etiqueta">{{ categoria }}</span>',
  standalone: true
})

export class EtiquetaCategoriaComponent {
  @Input({required: true}) categoria!: CategoriaObra;
}
