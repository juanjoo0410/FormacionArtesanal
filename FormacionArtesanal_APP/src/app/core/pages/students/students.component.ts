import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegistroComponent } from '../../authentication/components/registro/registro.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  constructor(
    private dialog: MatDialog,
    private router: Router
  ) {}

  openDialogRegistro() {
    this.dialog.open(RegistroComponent, {disableClose: true, width: '700px'});
  }
}
