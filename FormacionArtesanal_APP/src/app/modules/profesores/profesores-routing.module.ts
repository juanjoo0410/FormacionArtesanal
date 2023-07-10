import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTeachersComponent } from './pages/home-teachers/home-teachers.component';

const routes: Routes = [
  {
    path: '',
    component: HomeTeachersComponent
  },
  {
    path: 'inicio',
    component: HomeTeachersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesoresRoutingModule { }
