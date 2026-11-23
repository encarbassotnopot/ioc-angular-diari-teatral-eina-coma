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
