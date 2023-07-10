import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciasComponent } from './pages/asistencias/asistencias.component';
import { CalificacionesComponent } from './pages/calificaciones/calificaciones.component';
import { ConsultarTareaComponent } from './pages/consultar-tarea/consultar-tarea.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { DatosPersonalesComponent } from './pages/datos-personales/datos-personales.component';
import { HomeStudentsComponent } from './pages/home-students/home-students.component';
import { HorarioComponent } from './pages/horario/horario.component';
import { MatriculacionComponent } from './pages/matriculacion/matriculacion.component';
import { OpcionesComponent } from './pages/opciones/opciones.component';

const routes: Routes = [
  {
    path: '',
    component: HomeStudentsComponent
  },
  {
    path: 'inicio',
    component: HomeStudentsComponent
  },
  {
    path: 'opciones',
    component: OpcionesComponent
  },
  {
    path: 'horario',
    component: HorarioComponent
  },
  {
    path: 'datos_personales',
    component: DatosPersonalesComponent
  },
  {
    path: 'asistencias',
    component: AsistenciasComponent
  },
  {
    path: 'curso/:id',
    component: CursosComponent
  },
  {
    path: 'curso/:idCurso/tarea/:idTarea',
    component: ConsultarTareaComponent
  },
  {
    path: 'calificaciones',
    component: CalificacionesComponent
  },
  {
    path: 'calidad',
    component: MatriculacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantesRoutingModule { }
