export interface Tarea {
    id?: number,
    curso_formado_id: number,
    nombre: string,
    descripcion: string,
    fecha_inicio: Date,
    fecha_fin: Date,
    tipo: string,
    estado_tarea: string,
    entrega: string,
    calificacion: number | null
}