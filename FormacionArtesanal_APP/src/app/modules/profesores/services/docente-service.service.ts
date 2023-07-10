import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Docente } from '../models/Docente';

@Injectable({
  providedIn: 'root'
})
export class DocenteServiceService {

  private dataDocente: Docente = {} as Docente;

  constructor(
    private http: HttpClient
  ) { }

  getDocente(): Docente {
    return this.dataDocente;
  }

  setDocente(docente: Docente) {
    this.dataDocente = docente;
  }

  getDocenteAPI(id: number): Observable<Docente> {
    const url = `${environment.urlBAse}${environment.pathUrl.urlGetDocente}${id}`;    
    return this.http.get<Docente>(url);
  }
}
