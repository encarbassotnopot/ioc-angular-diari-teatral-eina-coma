# Models i adaptadors

## Interfícies principals

### ObraCataleg (model intern)

Model utilitzat dins l'aplicació Angular:

```typescript
export interface ObraCataleg {
  id: number
  titol: string
  descripcio: string
  categoria: CategoriaObra
  data: Date
  valoracio?: number
  esDestacada?: boolean,
}
```

### ObraApiResponse (resposta API)

Format de les dades que retorna l'API:

```typescript
export interface ObraApiResponse {
  id: number
  titol: string
  descripcio: string
  categoria: string
  data: string
  valoracio?: number
  destacada?: boolean
}
```

## Comparativa
| Camp | `ObraCataleg` | `ObraApiResponse` | Diferència |
|---|---|---|---|
| Id | `number` | `number` | Cap |
| Títol | `string` | `string` | Cap |
| Descripció | `string` | `string` | Cap |
| Categoria | `CategoriaObra` | `string` | El model intern restringeix els valors |
| Data | `Date` | `string` | Es converteix de text a `Date` |
| Valoració | `number?` | `number?` | Cap |
| Destacada | `esDestacada?: boolean` | `destacada?: boolean` | Canvia el nom del camp |

## Adaptadors

### adaptarObraApi()

Transforma un element de l'API al format intern:

- Canvia `destacada` → `esDestacada`
- Interpreta la cadena de text `data` en un objecte Date
- Manté la resta de camps

### adaptarObresApi()

Aplica `adaptarObraApi()` a un array d'elements.

### obraBuida()

Retorna una obra amb valors per defecte per inicialitzar formularis.

