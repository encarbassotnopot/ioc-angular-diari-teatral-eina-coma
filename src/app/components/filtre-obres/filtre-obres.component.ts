import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CategoriaObra } from '../../models/obra.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CriterisCerca, ObraService } from '../../services/obra.service';
import { termeAmbResultatsValidator } from '../../validadors/terme-amb-resultats.validator';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-filtre-obres',
  styleUrl: './filtre-obres.component.scss',
  templateUrl: './filtre-obres.component.html',
})
export class FiltreObresComponent {
  private readonly elementService = inject(ObraService);

  @Output() cercaEnviada = new EventEmitter<CriterisCerca>();

  readonly categories = ['Teatre', 'Òpera', 'Musical'];

  readonly formulari = new FormGroup({
    text: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(3)],
      asyncValidators: [termeAmbResultatsValidator(this.elementService)],
    }),
    categoria: new FormControl('', { nonNullable: true }),
  });

  /** Enviament explícit (botó o tecla Retorn) */
  enviar(): void {
    if (this.formulari.invalid) {
      this.formulari.markAllAsTouched();
      return;
    }
    this.emetre();
  }

  netejar(): void {
    this.formulari.reset();
    this.emetre();
  }

  private emetre(): void {
    this.cercaEnviada.emit(this.formulari.getRawValue());
  }

  get text(): FormControl<string> {
    return this.formulari.controls.text;
  }

  get mostrarErrors(): boolean {
    return this.text.invalid && (this.text.dirty || this.text.touched);
  }

  get missatgeError(): string {
    if (this.text.hasError('minlength')) {
      return 'Escriviu 3 caràcters com a mínim.';
    }
    if (this.text.hasError('senseResultats')) {
      return 'Cap element coincideix amb aquest text.';
    }
    return '';
  }
}