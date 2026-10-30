import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Obra } from '../../models/obra.model';
import { EtiquetaCategoriaComponent } from '../etiqueta-categoria/etiqueta-categoria.component';

@Component({
  imports: [EtiquetaCategoriaComponent],
  selector: 'app-targeta-obra',
  styleUrl: './targeta-obra.component.scss',
  templateUrl: './targeta-obra.component.html',
})
export class TargetaObraComponent {
  @Input({required: true}) obra!: Obra;
  @Output() seleccionar = new EventEmitter<Obra>();
}
