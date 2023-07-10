export interface Docente {
    id?: number,
    cedula: string,
    nombres: string,
    apellidos: string,
    edad: number,
    direccion: string,
    email: string,
    telefono: string,
    contra: string,
    evaluacion?: number,
    rol_id: number,
    nivel_educativo_id: number
}