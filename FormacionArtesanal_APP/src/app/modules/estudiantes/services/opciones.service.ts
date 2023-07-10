import { Injectable } from '@angular/core';
import { Opcion } from '../models/OpcionEstudiante';

@Injectable({
  providedIn: 'root'
})
export class OpcionesService {

  private dataOpcion: Opcion[] = [
    {class: 'fa-solid fa-address-book', nombre: 'DATOS PERSONALES', metodo: 'irDatosPersonales'},
    {class: 'fa-regular fa-calendar-days', nombre: 'HORARIO', metodo: 'irHorario'},
    {class: 'fa-solid fa-file-signature', nombre: 'MATRICULACIÓN', metodo: 'irMatriculacion'},
    {class: 'fa-solid fa-file-circle-check', nombre: 'CALIFICACIONES', metodo: 'irCalificaciones'},
    {class: 'fa-solid fa-clipboard-user', nombre: 'ASISTENCIAS', metodo: 'irAsistencias'},
    {class: 'fa-solid fa-clipboard-check', nombre: 'DETALLES DE CALIDAD', metodo: 'irEvaluacionDocente'}
  ];

  constructor() { }

  getOpciones(): Opcion[] {
    return this.dataOpcion;
  }
}
