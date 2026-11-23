import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of, switchMap, timer } from 'rxjs';
import { ObraService } from '../services/obra.service';

/**
 * Validador asíncron: el terme ha de coincidir amb algun element de l'API.
 * Error retornat: { senseResultats: true }
 */
export function termeAmbResultatsValidator(obraService: ObraService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const text = (control.value ?? '').toString().trim();

        // Termes curts o buits: no consultem l'API (ja els atura la validació síncrona)
        if (text.length < 3) {
            return of(null);
        }

        return timer(400).pipe(
            switchMap(() => obraService.comptarResultats(text)),
            map((total) => (total > 0 ? null : { senseResultats: true })),
            catchError(() => of(null))
        );
    };
}