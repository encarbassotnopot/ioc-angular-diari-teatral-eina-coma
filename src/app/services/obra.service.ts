import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Service, inject, signal } from '@angular/core';
import { Observable, Subject, catchError, map, of, switchMap, tap } from 'rxjs';

import { adaptarElementApi, adaptarObresApi, prepararElementApi } from '../adaptadors/obra.adaptador';
import { ObraApiResponse, ObraCataleg, EstatObres, NovaObra } from '../models/obra.model';
import { environment } from '../../environments/environment';

export interface CriterisCerca {
  text: string;
  categoria: string;
}

@Service()
export class ObraService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/obres`;

  // Flux de criteris: cada cerca nova s'emet aquí.
  // Subject (no BehaviorSubject): no volem cap emissió inicial automàtica;
  // la primera petició la dispara el component amb carregarTot()
  private readonly criterisInicials: CriterisCerca = { text: '', categoria: '' };
  private readonly criteris$ = new Subject<CriterisCerca>();
  private darrersCriteris = this.criterisInicials;

  // Estat únic del servei, exposat com a signal de només lectura
  private readonly estatSignal = signal<EstatObres>({ estat: 'inicial', elements: [] });
  readonly estat = this.estatSignal.asReadonly();

  constructor() {
    this.criteris$.pipe(
      tap((criteris) => {
        this.darrersCriteris = criteris;
        this.estatSignal.set({ estat: 'carregant', elements: [] });
      }),
      // switchMap cancel·la la petició anterior si arriben criteris nous abans que acabi
      switchMap((criteris) => this.obtenirElements(criteris).pipe(
        map((elements): EstatObres => ({ estat: 'exit', elements })),
        catchError((error: HttpErrorResponse) => of<EstatObres>({
          estat: 'error',
          elements: [],
          error: this.gestionarError(error),
        }))
      ))
    ).subscribe((estat) => this.estatSignal.set(estat));
  }

  /** Carrega tots els elements (sense criteris) */
  carregarTot(): void {
    this.cercar(this.criterisInicials);
  }

  /** Emet criteris nous: el flux del constructor fa la petició */
  cercar(criteris: CriterisCerca): void {
    this.criteris$.next({
      text: criteris.text.trim(),
      categoria: criteris.categoria,
    });
  }

  /** Repeteix l'última cerca (botó "Reintentar") */
  reintentar(): void {
    this.criteris$.next(this.darrersCriteris);
  }

  /** Crea un element nou amb POST i, si va bé, refresca el llistat */
  crearElement(nova: NovaObra): Observable<ObraCataleg> {
    return this.http.post<ObraApiResponse>(this.apiUrl, prepararElementApi(nova)).pipe(
      map(adaptarElementApi),
      tap(() => this.reintentar())
    );
  }

  /** Nombre de resultats per a un terme (per al validador asíncron) */
  comptarResultats(terme: string): Observable<number> {
    return this.obtenirElements({ text: terme, categoria: '' }).pipe(
      map((elements) => elements.length)
    );
  }

  private obtenirElements(criteris: CriterisCerca): Observable<ObraCataleg[]> {
    let params = new HttpParams();
    if (criteris.categoria) {
      params = params.set('categoria', criteris.categoria);
    }

    return this.http.get<ObraApiResponse[]>(this.apiUrl, { params }).pipe(
      map(adaptarObresApi),
      map((elements) => this.filtrarPerTerme(elements, criteris.text))
    );
  }

  private filtrarPerTerme(elements: ObraCataleg[], terme: string): ObraCataleg[] {
    const text = terme.trim().toLocaleLowerCase('ca');
    if (text.length < 3) {
      return elements;
    }
    return elements.filter((element) =>
      `${element.titol} ${element.descripcio}`.toLocaleLowerCase('ca').includes(text)
    );
  }

  private gestionarError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return 'No es pot connectar amb l\'API. Comproveu que npm run api està actiu.';
      case 404:
        return 'Recurs no trobat. Verifiqueu la URL de l\'API.';
      case 500:
        return 'Error intern del servidor.';
      default:
        return `Error inesperat (${error.status}): ${error.message}`;
    }
  }
}