export interface Curso {
    id?: number,
    curso: string,
    materia: string,
    docente: string,
    modulo: string,
    hora_inicio: string,
    evaluacion_docente?: number
}