import {  Component } from '@angular/core';
import { ConsumidorAPIService } from 'src/app/shared/services/consumidor-api.service';
import { Curso } from '../../models/Curso';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent {

  curso: Curso[] = [];

  constructor(
    private dataCurso: CursoService,
    private consumidor: ConsumidorAPIService
  ) {}

  async ngOnInit() {
    
    await this.consumidor.consumirEstudiante();

    await this.consumidor.consumirHorario();

    await this.consumidor.consumirCurso();

    this.curso = this.dataCurso.getCursos();
    
  }
  

}
