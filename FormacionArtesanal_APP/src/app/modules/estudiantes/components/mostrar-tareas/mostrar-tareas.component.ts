import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConsumidorAPIService } from 'src/app/shared/services/consumidor-api.service';
import { Curso } from '../../models/Curso';
import { Tarea } from '../../models/Tarea';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-mostrar-tareas',
  templateUrl: './mostrar-tareas.component.html',
  styleUrls: ['./mostrar-tareas.component.css']
})
export class MostrarTareasComponent {

  tareas: Tarea [] = [];
  cursoIndividual: Curso = {} as Curso;
  private routeSub!: Subscription;

  constructor(
    private dataTarea: CursoService,
    private consumidor: ConsumidorAPIService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {

    this.routeSub = this.route.paramMap.subscribe(async params => {
      const id = Number(params.get('id'));
      await this.consumidor.consumirCursoIndividual(id);
      await this.consumidor.consumirTareasCurso(id);

      this.cursoIndividual = this.dataTarea.getCursoIndividual();

      this.tareas = this.dataTarea.getTareas();

    });

  }

  getTareaRoute(tarea: any) {
    return ['/curso', tarea.curso_formado_id, 'tarea', tarea.id];
  }
}
