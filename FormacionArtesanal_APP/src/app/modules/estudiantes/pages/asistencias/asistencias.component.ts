import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsumidorAPIService } from 'src/app/shared/services/consumidor-api.service';
import { AsistenciasDialogComponent } from '../../components/asistencias-dialog/asistencias-dialog.component';
import { Curso } from '../../models/Curso';
import { Horario } from '../../models/Horario';
import { CursoService } from '../../services/curso.service';
import { HorarioService } from '../../services/horario.service';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent {

  horarios: Horario[] = [];

  constructor(
    private consumidor: ConsumidorAPIService,
    private dialog: MatDialog,
    private dataHorario: HorarioService
  ) {}

  async ngOnInit() {
    
    await this.consumidor.consumirEstudiante();

    await this.consumidor.consumirHorario();

    this.horarios = this.dataHorario.getHorario();
    
  }

  openDialogSesion(id: number) {
    this.dialog.open(AsistenciasDialogComponent, {
      disableClose: false,
      width: '550px',
      data: {id: id}
    });
  }

}
