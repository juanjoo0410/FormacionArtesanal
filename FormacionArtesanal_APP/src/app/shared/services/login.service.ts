import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { EstudianteServiceService } from 'src/app/modules/estudiantes/services/estudiante-service.service';
import { DocenteServiceService } from 'src/app/modules/profesores/services/docente-service.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private dataEstudiante: EstudianteServiceService,
    private dataDocente: DocenteServiceService,
    private router: Router
  ) {}

  getCredentials(credenciales: any): Observable<Usuario> {    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }
    const url = `${environment.urlBAse}${environment.pathUrl.urlPostCredential}`;    
    return this.http.post<Usuario>(url, credenciales, httpOptions);
  }

  logueado(rol_id: number) {
    let user: any;
    if (rol_id === 1) {
      user = this.dataEstudiante.getEstudiante();
    } else if (rol_id === 2) {
      user = this.dataDocente.getDocente();
    }
    this.cookie.set('active', 'true');
    this.cookie.set('usuario', user.nombres + ' ' + user.apellidos);
    this.cookie.set('id', user.id.toString());
    this.cookie.set('rol', user.rol_id.toString());
  }

  logOut() {
    this.cookie.set('active', 'false');
    this.cookie.set('usuario', '');
    this.cookie.set('id', '');
    this.cookie.set('rol', '');
    window.open('/inicio', '_self');
  }

  getActive(): boolean {
    return this.cookie.get('active') === 'true';
  }

  getUsuarioLogueado(): string {
    return this.cookie.get('usuario');
  }

  getUserIDLogged(): number {
    return Number(this.cookie.get('id'));
  }

  getRolUserLogged(): number {
    return Number(this.cookie.get('rol'));
  }
}
