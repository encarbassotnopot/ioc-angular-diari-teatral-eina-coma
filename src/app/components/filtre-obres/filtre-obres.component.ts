import { Component, EventEmitter, Output } from '@angular/core';
import { CategoriaObra } from '../../models/obra.model';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-filtre-obres',
  styleUrl: './filtre-obres.component.scss',
  templateUrl: './filtre-obres.component.html',
})
export class FiltreObresComponent {
  @Output() aplicarFiltres = new EventEmitter<{text: string, categoria?: CategoriaObra}>();
  
  text = ""
  categoria? : CategoriaObra

  aplica = () => {this.aplicarFiltres.emit({text: this.text, categoria: this.categoria})}
  reestableix = () => {
    this.text = ""
    this.categoria = undefined
    this.aplica()
  }
}
