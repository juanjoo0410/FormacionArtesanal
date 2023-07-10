import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curso } from '../models/Curso';
import { EstudianteTarea } from '../models/EstudianteTarea';
import { Tarea } from '../models/Tarea';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private dataCurso: Curso [] = [];
  private tareasCurso: Tarea [] = [];
  private cursoIndividual: Curso = {} as Curso;
  private tareaIndividual: EstudianteTarea = {} as EstudianteTarea;
  private allCursos: Curso [] = [];

  constructor(
    private http: HttpClient
  ) { }

  getCursos(): Curso[] {
    return this.dataCurso;
  }

  setCurso(curso: Curso) {
    this.dataCurso.push(curso);
  }

  getAllCursos(): Curso[] {
    return this.allCursos;
  }

  setAllCursos(curso: Curso) {
    this.allCursos.push(curso);
  }

  getCursoIndividual(): Curso {
    return this.cursoIndividual;
  }

  setCursoIndividual(curso: Curso) {
    this.cursoIndividual = curso;
  }

  getTareaIndividual(): EstudianteTarea {
    return this.tareaIndividual;
  }

  setTareaIndividual(tarea: EstudianteTarea) {
    this.tareaIndividual = tarea;
  }

  getTareas(): Tarea[] {
    return this.tareasCurso;
  }

  setTarea(tarea: Tarea) {
    this.tareasCurso.push(tarea);
  }

  getCursoAPI(id: number): Observable<any> {
    const url = `${environment.urlBAse}${environment.pathUrl.urlGetCurso}${id}`;    
    return this.http.get(url);
  }

  getTareasCursoAPI(curso_id: number, id: number): Observable<any> {
    const url = `${environment.urlBAse}${environment.pathUrl.urlGetTareasCurso}${curso_id}/${id}`;    
    return this.http.get(url);
  }

  getTareasIndividualAPI(curso_id: number, tarea_id: number): Observable<any> {
    const url = `${environment.urlBAse}${environment.pathUrl.urlGetTareaIndividual}${curso_id}/${tarea_id}`;
    return this.http.get(url);
  }

  setearCursoIndividual() {
    this.cursoIndividual = {} as Curso;
  }

  setearTareasCurso() {
    this.tareasCurso = [];
  }

  setearTareaIndividual() {
    this.tareaIndividual = {} as EstudianteTarea;
  }

  getAllCursosAPI(): Observable<any> {
    const url = `${environment.urlBAse}${environment.pathUrl.urlGetAllCursos}`;
    return this.http.get(url);
  }

}
