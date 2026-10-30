import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Obra } from '../../models/obra.model';
import { TargetaObraComponent } from '../targeta-obra/targeta-obra.component';

@Component({
  imports: [TargetaObraComponent],
  selector: 'app-llista-obres',
  styleUrl: './llista-obres.component.scss',
  templateUrl: './llista-obres.component.html',
})

export class LlistaObresComponent {
  @Input({required: true}) obres!: Obra[];
  @Output() seleccionar = new EventEmitter<Obra>();
}
