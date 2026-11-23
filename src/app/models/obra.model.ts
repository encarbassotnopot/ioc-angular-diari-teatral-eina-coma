export type CategoriaObra = "Teatre" | "Òpera" | "Musical";

export interface ObraCataleg {
  id: number
  titol: string
  descripcio: string
  categoria: CategoriaObra
  data: Date
  valoracio?: number
  esDestacada?: boolean,
}

export interface ObraApiResponse {
  id: number
  titol: string
  descripcio: string
  categoria: string
  data: string
  valoracio?: number
  destacada?: boolean
}

export interface ObresCercaResponse {
  elements: ObraApiResponse[];
  total: number;
}

export type EstatServei = 'inicial' | 'carregant' | 'exit' | 'error';

export interface EstatObres {
  estat: EstatServei;
  elements: ObraCataleg[];
  error?: string;
}