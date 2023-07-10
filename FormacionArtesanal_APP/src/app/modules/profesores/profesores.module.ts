import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesoresRoutingModule } from './profesores-routing.module';
import { HomeTeachersComponent } from './pages/home-teachers/home-teachers.component';


@NgModule({
  declarations: [
    HomeTeachersComponent
  ],
  imports: [
    CommonModule,
    ProfesoresRoutingModule
  ]
})
export class ProfesoresModule { }
