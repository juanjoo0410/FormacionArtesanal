import { Injectable } from '@angular/core';
import { Curso } from 'src/app/modules/estudiantes/models/Curso';
import { Estudiante } from 'src/app/modules/estudiantes/models/Estudiante';
import { EstudianteTarea } from 'src/app/modules/estudiantes/models/EstudianteTarea';
import { Horario } from 'src/app/modules/estudiantes/models/Horario';
import { CursoService } from 'src/app/modules/estudiantes/services/curso.service';
import { EstudianteServiceService } from 'src/app/modules/estudiantes/services/estudiante-service.service';
import { HorarioService } from 'src/app/modules/estudiantes/services/horario.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumidorAPIService {

  id = 0;
  rol = 0;
  active = false;

  constructor(
    private dataEstudiante: EstudianteServiceService,
    private dataHorario: HorarioService,
    private loginService: LoginService,
    private dataCurso: CursoService
  ) {

    this.active = this.loginService.getActive();

    this.id = this.loginService.getUserIDLogged();
    this.rol = this.loginService.getRolUserLogged();
   }

  verificarEstudiante(): boolean {

    if (Object.values(this.dataEstudiante.getEstudiante()).length === 0) {
      console.log("No hay estudiante");
      return false;
    } else {
      console.log("Sí hay estudiante");
      return true;
    }

  }

  verificarCursoIndividual(): boolean {

    if (Object.values(this.dataCurso.getCursoIndividual()).length === 0) {
      console.log("No hay curso individual");
      return false;
    } else {
      console.log("Sí hay curso individual");
      return true;
    }

  }

  verificarTareaIndividual(): boolean {

    if (Object.values(this.dataCurso.getTareaIndividual()).length === 0) {
      console.log("No hay tarea individual");
      return false;
    } else {
      console.log("Sí hay tarea individual");
      return true;
    }

  }

  verificarAsistenciaHorario(): boolean {

    if (Object.values(this.dataEstudiante.getAsistencia()).length === 0) {
      console.log("No hay asistencia");
      return false;
    } else {
      console.log("Sí hay asistencia");
      return true;
    }

  }

  verificarHorario(): boolean {
    if (this.dataHorario.getHorario().length === 0) {
      console.log("No hay horarios");
      return false;
    } else {
      console.log("Sí hay horarios");
      return true;
    }
  }

  verificaCurso(): boolean {
    if (this.dataCurso.getCursos().length === 0) {
      console.log("No hay cursos");
      return false;
    } else {
      console.log("Sí hay cursos");
      return true;
    }
  }

  verificaTarea(): boolean {
    if (this.dataCurso.getTareas().length === 0) {
      console.log("No hay tareas");
      return false;
    } else {
      console.log("Sí hay tareas");
      return true;
    }
  }

  async consumirEstudiante() {
    
    if(this.active && !this.verificarEstudiante()) {
      if(this.id > 0) {

        await this.dataEstudiante.getEstudianteAPI(this.id).toPromise()
          .then(data => {

            if (Array.isArray(data) && data.length > 0) {
              const estudiante: Estudiante = data[0];
              this.dataEstudiante.setEstudiante(estudiante);
              
              console.log("Estudiante en el consumidor:")
              console.log(this.dataEstudiante.getEstudiante());
            }

          }).catch(error => {
            console.log(error.error.message);
          });
      }
    }
    
  }

  async consumirHorario() {

    if(this.active && !this.verificarHorario()) {

      await this.dataHorario.getHorarioAPI(this.id).toPromise()
        .then(data => {

          if (Array.isArray(data) && data.length > 0) {
            
            data.forEach(horario => {
              this.dataHorario.setHorario(horario);
            });
            
            console.log("Horario en el consumidor:")
            console.log(this.dataHorario.getHorario());
          }

        }).catch(error => {
          console.log(error.error.message);
        });
    }
  }

  async consumirCurso() {

    if(this.active && !this.verificaCurso()) {

      this.dataHorario.getHorario().forEach(async horario => {

        await this.dataCurso.getCursoAPI(horario.curso_formado_id!).toPromise()
          .then(data => {

            if (Array.isArray(data) && data.length > 0) {
            
              data.forEach(curso => {
                this.dataCurso.setCurso(curso);
              });
              
            }

          }).catch(error => {
            console.log(error.error.message);
          });

          
      });
      console.log("Curso en el consumidor:")
      console.log(this.dataCurso.getCursos());
    }
  }

  async consumirAsistenciaHorario(id: number) {

    if(this.active && !this.verificarAsistenciaHorario()) {

      await this.dataEstudiante.getAsistenciaHorarioAPI(id).toPromise()
        .then(data => {

          if (Array.isArray(data) && data.length > 0) {
            
            data.forEach(asistencia => {
              asistencia.asistencia = Number(asistencia.asistencia);
              this.dataEstudiante.setAsistencia(asistencia);
            });
            
            console.log("Asistencia en el consumidor:")
            console.log(this.dataEstudiante.getAsistencia());
          }

        }).catch(error => {
          console.log(error.error.message);
        });
    }
  }

  async consumirTareasCurso(id: number) {
    
    this.dataCurso.setearTareasCurso();

    if(this.active && !this.verificaTarea()) {

      await this.dataCurso.getTareasCursoAPI(id, this.id).toPromise()
        .then(data => {

          if (Array.isArray(data) && data.length > 0) {
            
            data.forEach(tarea => {
              tarea.fecha_inicio = new Date(tarea.fecha_inicio);
              tarea.fecha_fin = new Date(tarea.fecha_fin);
              if (tarea.calificacion != null) {
                tarea.calificacion = Number(tarea.calificacion);
              }
              this.dataCurso.setTarea(tarea);
            });
            
            console.log("Tarea en el consumidor:")
            console.log(this.dataCurso.getTareas());
          }

        }).catch(error => {
          console.log(error.error.message);
        });
    }
  }

  async consumirCursoIndividual(id: number) {

    this.dataCurso.setearCursoIndividual();

    if(this.active && !this.verificarCursoIndividual()) {

      await this.dataCurso.getCursoAPI(id).toPromise()
          .then(data => {

            if (Array.isArray(data) && data.length > 0) {
            
              const cursoIndividual: Curso = data[0];
              this.dataCurso.setCursoIndividual(cursoIndividual);
              
            }

          }).catch(error => {
            console.log(error.error.message);
          });

      console.log("Curso Individual en el consumidor:");
      console.log(this.dataCurso.getCursoIndividual());
    }
  }

  async consumirTareaIndividual(idCurso: number, idTarea: number) {

    this.dataCurso.setearTareaIndividual();

    if(this.active && !this.verificarTareaIndividual()) {

      await this.dataCurso.getTareasIndividualAPI(idCurso, idTarea).toPromise()
          .then(data => {

            if (Array.isArray(data) && data.length > 0) {
            
              const tareaIndividual: EstudianteTarea = data[0];
              tareaIndividual.fecha_inicio = new Date(tareaIndividual.fecha_inicio);
              tareaIndividual.fecha_fin = new Date(tareaIndividual.fecha_fin);
              this.dataCurso.setTareaIndividual(tareaIndividual);
              
            }

          }).catch(error => {
            console.log(error.error.message);
          });

      console.log("Tarea Individual en el consumidor:");
      console.log(this.dataCurso.getTareaIndividual());
    }
  }

  async consumirTodosCursos() {

    if(this.active) {

      await this.dataCurso.getAllCursosAPI().toPromise()
          .then(data => {

            if (Array.isArray(data) && data.length > 0) {
            
              data.forEach(curso => {
                this.dataCurso.setAllCursos(curso);
              });
              
            }

          }).catch(error => {
            console.log(error.error.message);
          });

      console.log("Tarea Individual en el consumidor:");
      console.log(this.dataCurso.getTareaIndividual());
    }
  }

}


// Docente: 1921349390
// Estudiante: 2574121417
// 3781194622
// 1150088535