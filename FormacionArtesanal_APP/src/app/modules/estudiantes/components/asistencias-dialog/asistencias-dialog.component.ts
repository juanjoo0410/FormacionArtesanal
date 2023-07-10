import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsumidorAPIService } from 'src/app/shared/services/consumidor-api.service';
import { Asistencia } from '../../models/Asistencia';
import { EstudianteServiceService } from '../../services/estudiante-service.service';

@Component({
  selector: 'app-asistencias-dialog',
  templateUrl: './asistencias-dialog.component.html',
  styleUrls: ['./asistencias-dialog.component.css']
})
export class AsistenciasDialogComponent {

  asistencia: Asistencia = {} as Asistencia;
  ancho: string = '0px';
  ancho2: string = '0px';

  constructor(
    private dialogRef: MatDialogRef<AsistenciasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private consumidor: ConsumidorAPIService,
    private dataEstudiante: EstudianteServiceService
  ) {}

  async ngOnInit() {

    await this.consumidor.consumirEstudiante();

    await this.consumidor.consumirHorario();

    await this.consumidor.consumirAsistenciaHorario(this.data.id);

    this.asistencia = this.dataEstudiante.getAsistencia();

    this.ancho = String((this.asistencia.dias_asistidos / 40)*100)+'%';
    this.ancho2 = String((this.asistencia.dias_faltas / 40)*100)+'%';

    const miElemento = document.getElementById("mi-elemento");
    miElemento!.setAttribute("style", `width: ${this.ancho};`);

    const miElemento2 = document.getElementById("mi-elemento2");
    miElemento2!.setAttribute("style", `width: ${this.ancho2};`);

  }

  close() {
    this.dialogRef.close();
  }
}
