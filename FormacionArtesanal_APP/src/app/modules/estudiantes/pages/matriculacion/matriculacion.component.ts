import { Component } from '@angular/core';
import { ConsumidorAPIService } from 'src/app/shared/services/consumidor-api.service';
import { Curso } from '../../models/Curso';
import { Estudiante } from '../../models/Estudiante';
import { CursoService } from '../../services/curso.service';
import { EstudianteServiceService } from '../../services/estudiante-service.service';

@Component({
  selector: 'app-matriculacion',
  templateUrl: './matriculacion.component.html',
  styleUrls: ['./matriculacion.component.css']
})
export class MatriculacionComponent {

  private estudiante: Estudiante = {} as Estudiante;
  private cursos: Curso[] = [];

  constructor(
    private consumidor: ConsumidorAPIService,
    private dataEstudiante: EstudianteServiceService,
    private dataCurso: CursoService
  ) {}

  async ngOnInit() {
    
    await this.consumidor.consumirEstudiante();

    await this.consumidor.consumirTodosCursos();

    this.estudiante = this.dataEstudiante.getEstudiante();

    this.cursos = this.dataCurso.getAllCursos();

    const count1 = document.getElementById('count1');
    const count2 = document.getElementById('count2');
    const count3 = document.getElementById('count3');
    const count4 = document.getElementById('count4');
    const count5 = document.getElementById('count5');

    this.countTo(100, 2000, count1!); // cuenta hasta 100 en 2 segundos
    this.countTo(100, 2500, count2!); // cuenta hasta 200 en 3 segundos
    this.countTo(100, 3000, count3!); // cuenta hasta 300 en 4 segundos
    this.countTo(100, 3500, count4!); // cuenta hasta 400 en 5 segundos
    this.countTo(100, 4000, count5!);


  }

  countTo(target: number, duration: number, countElement: HTMLElement): void {
    const start = 0;
    const end = target;
    const range = end - start;
    const increment = range / (duration / 10);
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      countElement.textContent = Math.floor(current).toString();
      if (current >= end) {
        clearInterval(timer);
        countElement.textContent = end.toString();
      }
    }, 10);

  }  

}
