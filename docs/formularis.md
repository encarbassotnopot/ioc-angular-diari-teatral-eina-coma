## FormulariCercaComponent

| Control | Validacions | Missatge |
|---|---|---|
| `text` | `minLength(3)` (síncrona), `termeAmbResultatsValidator` (asíncrona, amb `timer(400)` + `switchMap`) | "Escriviu 3 caràcters com a mínim." / "Cap element coincideix amb aquest terme." |
| `categoria` | cap | — |

- Cerca explícita amb el botó "Cercar" o Retorn (`ngSubmit`), només si el formulari és vàlid
- Els missatges només es mostren quan el control és `dirty` o `touched`
- El botó d'enviar es deshabilita si el formulari és `invalid` o `pending`
- Sortida: `@Output() cercaEnviada: EventEmitter<CriterisCerca>`