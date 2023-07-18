import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { StudentsComponent } from './core/pages/students/students.component';
import { TeachersComponent } from './core/pages/teachers/teachers.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},
  {path: 'estudiantes', component: StudentsComponent},
  {path: 'profesores', component: TeachersComponent},
  {path: 'estudiante',
    loadChildren: () => import('./modules/estudiantes/estudiantes-routing.module').then((m) => m.EstudiantesRoutingModule),
  },
  {path: 'profesor',
    loadChildren: () => import('./modules/profesores/profesores-routing.module').then((m) => m.ProfesoresRoutingModule),
  },
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
