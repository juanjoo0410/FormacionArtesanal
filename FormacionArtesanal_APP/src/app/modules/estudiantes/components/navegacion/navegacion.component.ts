import { Component } from '@angular/core';
import { Curso } from '../../models/Curso';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {

  cursos: Curso[] = [];

  constructor(
    private dataCurso: CursoService
  ) {}

  ngOnInit(): void {
    this.cursos = this.dataCurso.getCursos();
    
  }
}
