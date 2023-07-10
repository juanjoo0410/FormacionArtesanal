import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConsumidorAPIService } from 'src/app/shared/services/consumidor-api.service';
import { Opcion } from '../../models/OpcionEstudiante';
import { OpcionesService } from '../../services/opciones.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent {

  opciones: Opcion[] = [];

  constructor(
    private dataOpcion: OpcionesService,
    private router: Router,
    private consumidor: ConsumidorAPIService,
    private snackbar: MatSnackBar
  ) {}

  async ngOnInit() {
    await this.consumidor.consumirEstudiante();

    await this.consumidor.consumirHorario();

    await this.consumidor.consumirCurso();

    this.opciones = this.dataOpcion.getOpciones();
  }

  irOpcion(nombre: string) {

    if (nombre == "HORARIO") {
      this.irHorario();
    } else if (nombre == "DATOS PERSONALES") {
      this.irDatosPersonales();
    } else if (nombre == "MATRICULACIÓN") {
      this.irMatriculacion();
    } else if (nombre == "CALIFICACIONES") {
      this.irCalificaciones();
    } else if (nombre == "ASISTENCIAS") {
      this.irAsistencias();
    } else if (nombre == "DETALLES DE CALIDAD") {
      this.irEvaluacionDocente();
    }
  }

  irHorario() {
    this.router.navigate(['/estudiante/horario']);
  }

  irMatriculacion() {
    this.snackbar.open('El estudiante ya está matriculado.',  'OK', { duration: 3000 });
    this.router.navigate(['/estudiante/inicio']);
  }

  irEvaluacionDocente() {
    this.router.navigate(['/estudiante/calidad']);
  }

  irCalificaciones() {
    this.router.navigate(['/estudiante/calificaciones']);
  }

  irAsistencias() {
    this.router.navigate(['/estudiante/asistencias']);
  }

  irDatosPersonales() {
    this.router.navigate(['/estudiante/datos_personales']);
  }

}
