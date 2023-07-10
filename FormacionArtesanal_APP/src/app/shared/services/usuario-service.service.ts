import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private dataUsuario: Usuario = {
    id: 0,
    rol_id: 0
  };

  constructor() { }

  getUsuario(): Usuario {
    return this.dataUsuario;
  }

  setUsuario(usuario: Usuario) {
    this.dataUsuario = usuario;
  }

  getRol(): number {
    return this.dataUsuario.rol_id;
  }

  getID(): number {
    return this.dataUsuario.id;
  }
}
