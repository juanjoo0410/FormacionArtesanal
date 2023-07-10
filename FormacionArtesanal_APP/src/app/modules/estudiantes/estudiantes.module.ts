import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { HomeStudentsComponent } from './pages/home-students/home-students.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MostrarCursosComponent } from './components/mostrar-cursos/mostrar-cursos.component';
import { OpcionesComponent } from './pages/opciones/opciones.component';
import { HorarioComponent } from './pages/horario/horario.component';
import { DatosPersonalesComponent } from './pages/datos-personales/datos-personales.component';
import { AsistenciasComponent } from './pages/asistencias/asistencias.component';
import { AsistenciasDialogComponent } from './components/asistencias-dialog/asistencias-dialog.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { MostrarTareasComponent } from './components/mostrar-tareas/mostrar-tareas.component';
import { ConsultarTareaComponent } from './pages/consultar-tarea/consultar-tarea.component';
import { DatosTareaComponent } from './components/datos-tarea/datos-tarea.component';
import { CalificacionesComponent } from './pages/calificaciones/calificaciones.component';
import { CalificacionesDialogComponent } from './components/calificaciones-dialog/calificaciones-dialog.component';
import { MatriculacionComponent } from './pages/matriculacion/matriculacion.component';


@NgModule({
  declarations: [
    HomeStudentsComponent,
    NavegacionComponent,
    MostrarCursosComponent,
    OpcionesComponent,
    HorarioComponent,
    DatosPersonalesComponent,
    AsistenciasComponent,
    AsistenciasDialogComponent,
    CursosComponent,
    MostrarTareasComponent,
    ConsultarTareaComponent,
    DatosTareaComponent,
    CalificacionesComponent,
    CalificacionesDialogComponent,
    MatriculacionComponent
  ],
  imports: [
    CommonModule,
    EstudiantesRoutingModule,
    SharedModule
  ]
})
export class EstudiantesModule { }
