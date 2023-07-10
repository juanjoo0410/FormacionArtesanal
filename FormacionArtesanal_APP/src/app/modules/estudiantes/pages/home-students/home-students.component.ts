import { Component } from '@angular/core';
import { ConsumidorAPIService } from 'src/app/shared/services/consumidor-api.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { Curso } from '../../models/Curso';
import { Estudiante } from '../../models/Estudiante';
import { CursoService } from '../../services/curso.service';
import { EstudianteServiceService } from '../../services/estudiante-service.service';
import { HorarioService } from '../../services/horario.service';

@Component({
  selector: 'app-home-students',
  templateUrl: './home-students.component.html',
  styleUrls: ['./home-students.component.css']
})
export class HomeStudentsComponent {

  id = 0;
  rol = 0;
  estudiante!: Estudiante;
  cursos: Curso [] = [];

  constructor(
    private loginService: LoginService,
    private dataEstudiante: EstudianteServiceService,
    private dataHorario: HorarioService,
    private dataCurso: CursoService,
    private consumidor: ConsumidorAPIService
  ) {
    this.id = this.loginService.getUserIDLogged();
    this.rol = this.loginService.getRolUserLogged();
  }

  async ngOnInit() {
    
    await this.consumidor.consumirEstudiante();
    console.log("Estudiante en la vista:")
    console.log(this.dataEstudiante.getEstudiante());

    await this.consumidor.consumirHorario();
    console.log("Horario en la vista:")
    console.log(this.dataHorario.getHorario());

    await this.consumidor.consumirCurso();
    console.log("Curso en la vista:")
    console.log(this.dataCurso.getCursos());

  }

}
