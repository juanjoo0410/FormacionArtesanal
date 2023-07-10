import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from '../../models/Curso';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-mostrar-cursos',
  templateUrl: './mostrar-cursos.component.html',
  styleUrls: ['./mostrar-cursos.component.css']
})
export class MostrarCursosComponent {

  cursos: Curso[] = [];

  constructor(
    private dataCurso: CursoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cursos = this.dataCurso.getCursos();
    
  }

  irCurso(id: number) {
    
    this.router.navigate(['/estudiante/curso', id]);

  }
}
