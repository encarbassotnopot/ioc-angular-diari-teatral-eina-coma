export type CategoriaObra = "Teatre" | "Òpera" | "Musical";

export interface Obra {
    id: number
    titol: string
    descripcio: string
    categoria: CategoriaObra
    data: Date
    valoracio?: number
    destacada?: boolean
}