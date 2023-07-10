import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asistencia } from '../models/Asistencia';
import { Estudiante } from '../models/Estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteServiceService {

  private dataEstudiante: Estudiante = {} as Estudiante;

  private asistenciaHorario: Asistencia = {} as Asistencia;

  constructor(
    private http: HttpClient
  ) { }

  getEstudiante(): Estudiante {
    return this.dataEstudiante;
  }

  setEstudiante(estudiante: Estudiante) {
    this.dataEstudiante = estudiante;
  }

  getAsistencia(): Asistencia {
    return this.asistenciaHorario;
  }

  setAsistencia(asistencia: Asistencia) {
    this.asistenciaHorario = asistencia;
  }

  getEstudianteAPI(id: number): Observable<Estudiante> {
    const url = `${environment.urlBAse}${environment.pathUrl.urlGetEstudiante}${id}`;    
    return this.http.get<Estudiante>(url);
  }

  getAsistenciaHorarioAPI(id: number): Observable<Asistencia> {
    const url = `${environment.urlBAse}${environment.pathUrl.urlGetAsistencia}${id}/asistencias`;    
    return this.http.get<Asistencia>(url);
  }
}
