import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/modules/estudiantes/models/Estudiante';
import { EstudianteServiceService } from 'src/app/modules/estudiantes/services/estudiante-service.service';
import { Docente } from 'src/app/modules/profesores/models/Docente';
import { DocenteServiceService } from 'src/app/modules/profesores/services/docente-service.service';
import { Usuario } from 'src/app/shared/models/Usuario';
import { LoginService } from 'src/app/shared/services/login.service';
import { UsuarioServiceService } from 'src/app/shared/services/usuario-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  messageError: string = '';
  formLogin!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private loginService: LoginService,
    private dataUsuario: UsuarioServiceService,
    private snackbar: MatSnackBar,
    private dataEstudiante: EstudianteServiceService,
    private dataDocente: DocenteServiceService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      cedula: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
    });
  }

  hide = true;
  active = false;

  

  onSubmit() {
    const credenciales = {
      cedula: this.formLogin.value.cedula,
      contra: this.formLogin.value.password
    }
    const credencialesJson = JSON.stringify(credenciales)
    this.loginService.getCredentials(credencialesJson).toPromise()
      .then(data => {
        
        console.log(data);
        
        if (Array.isArray(data) && data.length > 0) {
          const usuario: Usuario = data[0];
          this.dataUsuario.setUsuario(usuario);
        }

        let rol = this.dataUsuario.getRol();
        
        if (rol === 1) {

          console.log("Estudiante");
          this.buscarEstudiante();

        } else if (rol === 2) {

          console.log("Docente");
          this.buscarDocente();

        } else {

          console.log("Admin");
          
        }

        this.dialogRef.close();
        window.open('/inicio', '_self');

        if (rol === 1) {

          this.router.navigate(['/estudiante/inicio']);

        } else if (rol === 2) {

          this.router.navigate(['/profesor/inicio']);

        }

      }).catch(
        error => {

          this.messageError = error.error.message;
          this.snackbar.open(this.messageError, 'OK', { duration: 3000 });

        });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  buscarEstudiante() {
    let id = this.dataUsuario.getID();
    this.dataEstudiante.getEstudianteAPI(id).toPromise()
      .then(data => {

        if (Array.isArray(data) && data.length > 0) {
          const estudiante: Estudiante = data[0];
          this.dataEstudiante.setEstudiante(estudiante);
          this.loginService.logueado(1);
        }

      }).catch(error => {

        console.log(error.error.message);

      });
  }

  buscarDocente() {
    let id = this.dataUsuario.getID();
    this.dataDocente.getDocenteAPI(id).toPromise()
      .then(data => {

        if (Array.isArray(data) && data.length > 0) {
          const docente: Docente = data[0];
          this.dataDocente.setDocente(docente);
          this.loginService.logueado(2);
        }

      }).catch(error => {

        console.log(error.error.message);

      });
  }

}
