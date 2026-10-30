export type CategoriaObra = "Teatre" | "Òpera" | "Musical";

export interface Obra {
    id: number
    títol: string
    descripció: string
    categoria: CategoriaObra
    data: Date
    valoració?: number
    vista: boolean
}