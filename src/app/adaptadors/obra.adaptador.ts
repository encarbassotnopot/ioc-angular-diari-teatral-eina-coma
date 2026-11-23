import { ObraCataleg, ObraApiResponse, CategoriaObra } from '../models/obra.model';

const CATEGORIES_NORMALITZADES: Record<string, CategoriaObra> = {
  'Teatre': 'Teatre',
  'Musical': 'Musical',
  'Òpera': 'Òpera',
};


function normalitzaCategoria(categoria: string | undefined): CategoriaObra {
  const neta = (categoria ?? '').trim();
  return CATEGORIES_NORMALITZADES[neta.toLocaleLowerCase()] ?? neta;
}

function valoracioSegura(valor: unknown): number | undefined {
  const n = Number(valor);
  if (isNaN(n) || n < 0 || n > 5) return undefined
  else return n;
}

export function adaptarElementApi(apiObra: ObraApiResponse): ObraCataleg {
  return {
    id: Number(apiObra.id),
    titol: (apiObra.titol ?? '').trim(),
    descripcio: (apiObra.descripcio ?? ''),
    categoria: normalitzaCategoria(apiObra.categoria),
    data: new Date(apiObra.data),
    valoracio: valoracioSegura(apiObra.valoracio),
    esDestacada: apiObra.destacada === true,
  };
}

export function adaptarObresApi(apiObres: ObraApiResponse[]): ObraCataleg[] {
  return apiObres.map(adaptarElementApi);
}

export function obraBuida(): ObraCataleg {
  return {
    id: 0,
    titol: '',
    descripcio: '',
    categoria: 'Teatre',
    data: new Date(),
    valoracio: undefined,
    esDestacada: undefined,
  };
}