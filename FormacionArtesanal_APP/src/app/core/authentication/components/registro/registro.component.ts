import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  
  constructor(
    private dialogRef: MatDialogRef<RegistroComponent>
  ) {}

  formRegistro = new FormGroup({
    cedula: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]),
    nombres: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]),
    edad: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern('[0-9]*')]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern('[0-9]*')]),
    nivel: new FormControl('', [Validators.required]),

  });

  formRegistroProfesores = new FormGroup({
    cedula: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]),
    nombres: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]),
    edad: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern('[0-9]*')]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern('[0-9]*')]),
    nivel: new FormControl('', [Validators.required]),

  });

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {}
}
