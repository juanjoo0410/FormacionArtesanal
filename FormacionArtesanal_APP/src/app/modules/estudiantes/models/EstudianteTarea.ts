export interface EstudianteTarea {
    estudiante_id: number,
    curso_formado_id: number,
    estudiante_tarea_id: number,
    estado_tarea: string,
    entrega: string | null,
    fecha_inicio: Date,
    fecha_fin: Date,
    tipo_tarea: string,
    nombre: string,
    descripcion: string
  }