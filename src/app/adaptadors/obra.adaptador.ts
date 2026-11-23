import { ObraCataleg, ObraApiResponse, CategoriaObra, NovaObra } from '../models/obra.model';

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

export function adaptarObraApi(apiObra: ObraApiResponse): ObraCataleg {
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
  return apiObres.map(adaptarObraApi);
}

export function prepararObraApi(nova: NovaObra): Omit<ObraApiResponse, "id"> {
  return {
    titol: nova.titol.trim(),
    descripcio: nova.descripcio,
    categoria: nova.categoria,
    data: nova.data.toISOString().split('T')[0],
    valoracio: nova.valoracio,
    destacada: nova.esDestacada,
  };
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