import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConsumidorAPIService } from 'src/app/shared/services/consumidor-api.service';
import { Curso } from '../../models/Curso';
import { EstudianteTarea } from '../../models/EstudianteTarea';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-datos-tarea',
  templateUrl: './datos-tarea.component.html',
  styleUrls: ['./datos-tarea.component.css']
})
export class DatosTareaComponent {

  cursoIndividual: Curso = {} as Curso;
  tareaIndividual: EstudianteTarea = {} as EstudianteTarea;
  private routeSub!: Subscription;
  fechaInicioString!: string;
  horaInicioString!: string;
  fechaFinString!: string;
  horaFinString!: string;
  fechaActual: any;
  fechaActualString!: string;

  activeArea = false;

  constructor(
    private dataTarea: CursoService,
    private consumidor: ConsumidorAPIService,
    private route: ActivatedRoute
  ) {}
  
  async ngOnInit() {

    this.routeSub = this.route.paramMap.subscribe(async params => {
      const idCurso  = Number(params.get('idCurso'));
      const idTarea = Number(params.get('idTarea'));
      await this.consumidor.consumirCursoIndividual(idCurso);
      await this.consumidor.consumirTareaIndividual(idCurso, idTarea);

      this.cursoIndividual = this.dataTarea.getCursoIndividual();

      this.tareaIndividual = this.dataTarea.getTareaIndividual();

      this.fechaInicioString = this.tareaIndividual.fecha_inicio.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      this.horaInicioString = this.tareaIndividual.fecha_inicio.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' });
      this.fechaFinString = this.tareaIndividual.fecha_fin.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      this.horaFinString = this.tareaIndividual.fecha_fin.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' });


      this.fechaActual = new Date();
      this.fechaActualString = this.fechaActual.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    });

  }

  compararFechas(): boolean {
    return this.fechaActual < this.tareaIndividual.fecha_fin;
  }

  toggleArea() {
    this.activeArea = !this.activeArea;
  }

}
