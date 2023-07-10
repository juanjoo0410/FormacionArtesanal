import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Horario } from '../models/Horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private dataHorario: Horario [] = [];

  constructor(
    private http: HttpClient
  ) { }

  getHorario(): Horario[] {
    return this.dataHorario;
  }

  setHorario(horario: Horario) {
    this.dataHorario.push(horario);
  }

  getHorarioAPI(id: number): Observable<any> {
    const url = `${environment.urlBAse}${environment.pathUrl.urlPostHorarioEstudiante}${id}`;    
    return this.http.get(url);
  }

}
