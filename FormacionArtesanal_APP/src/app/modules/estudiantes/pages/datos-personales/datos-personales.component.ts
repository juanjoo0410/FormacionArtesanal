import { Component } from '@angular/core';
import { ConsumidorAPIService } from 'src/app/shared/services/consumidor-api.service';
import { Estudiante } from '../../models/Estudiante';
import { EstudianteServiceService } from '../../services/estudiante-service.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent {
  
  estudiante!: Estudiante;

  constructor(
    private consumidor: ConsumidorAPIService,
    private dataEstudiante: EstudianteServiceService
  ) {}

  async ngOnInit() {
    
    await this.consumidor.consumirEstudiante();

    this.estudiante = this.dataEstudiante.getEstudiante();
  }
}
