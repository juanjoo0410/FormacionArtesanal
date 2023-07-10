import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsumidorAPIService } from 'src/app/shared/services/consumidor-api.service';
import { CalificacionesDialogComponent } from '../../components/calificaciones-dialog/calificaciones-dialog.component';
import { Horario } from '../../models/Horario';
import { HorarioService } from '../../services/horario.service';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent {

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
    this.dialog.open(CalificacionesDialogComponent, {
      disableClose: false,
      width: '550px',
      data: {id: id}
    });
  }

}
