# Configuració de serveis

## API Mock (desenvolupament)

### Arrencar el servidor

```bash
npm run api
```

### Endpoints disponibles

- `GET /obres` - Retorna totes les obres
- `GET /obres?valoracio:gt=3` - Filtra amb una valoració per sobre de 3
- `GET /obres?categoria=Teatre` - Filtra per categoria
- `GET /obres/:id` - Obté un element per ID

### Configuració

- **Port:** 4301
- **Fitxer de dades:** `tools/api/obres.json`

El filtre de text es pot aplicar al servei Angular després d'adaptar les dades. Així no depeneu d'un paràmetre de cerca específic del servidor.

## Canviar a API real

Per utilitzar una API real, modifiqueu `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://api.exemple.com',
  apiKey: 'LA_VOSTRA_CLAU_API' // Si cal autenticació
};
```