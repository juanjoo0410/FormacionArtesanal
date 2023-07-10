import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsumidorAPIService } from 'src/app/shared/services/consumidor-api.service';
import { Tarea } from '../../models/Tarea';
import { CursoService } from '../../services/curso.service';
import { AsistenciasDialogComponent } from '../asistencias-dialog/asistencias-dialog.component';

@Component({
  selector: 'app-calificaciones-dialog',
  templateUrl: './calificaciones-dialog.component.html',
  styleUrls: ['./calificaciones-dialog.component.css']
})
export class CalificacionesDialogComponent {

  private tareas: Tarea [] = [];
  
  TotalCalificacion: number = 0;
  PromedioCalificacion: number = 0;
  TotalTareas: number = 0;
  TareasEntregadas: number = 0;
  TareasNoEntregadas: number = 0;

  ancho: string = '0px';
  ancho2: string = '0px';

  constructor(
    private consumidor: ConsumidorAPIService,
    private dialogRef: MatDialogRef<AsistenciasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataTarea: CursoService
  ) {}

  async ngOnInit() {
    await this.consumidor.consumirTareasCurso(this.data.id);

    this.tareas = this.dataTarea.getTareas();

    this.tareas.forEach(tarea => {
      if(tarea.calificacion != null) {
        this.TotalCalificacion += tarea.calificacion;
      }
      
      if(tarea.estado_tarea === 'Enviado') {
        this.TareasEntregadas += 1;
      } else if (tarea.estado_tarea === 'No enviado') {
        this.TareasNoEntregadas += 1;
      }
    });

    this.TotalTareas = this.tareas.length;
    this.PromedioCalificacion = this.TotalCalificacion / this.TotalTareas;

    this.ancho = String((this.TareasEntregadas / this.TotalTareas)*100)+'%';
    this.ancho2 = String((this.TareasNoEntregadas / this.TotalTareas)*100)+'%';

    const miElemento = document.getElementById("mi-elemento");
    miElemento!.setAttribute("style", `width: ${this.ancho};`);

    const miElemento2 = document.getElementById("mi-elemento2");
    miElemento2!.setAttribute("style", `width: ${this.ancho2};`);
  }

  close() {
    this.dialogRef.close();
  }

}
