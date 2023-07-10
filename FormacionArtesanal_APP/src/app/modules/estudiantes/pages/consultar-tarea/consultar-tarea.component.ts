import { Component } from '@angular/core';
import { ConsumidorAPIService } from 'src/app/shared/services/consumidor-api.service';

@Component({
  selector: 'app-consultar-tarea',
  templateUrl: './consultar-tarea.component.html',
  styleUrls: ['./consultar-tarea.component.css']
})
export class ConsultarTareaComponent {

  constructor(
    private consumidor: ConsumidorAPIService
  ) {}

  async ngOnInit() {

    await this.consumidor.consumirEstudiante();

    await this.consumidor.consumirHorario();

    await this.consumidor.consumirCurso();
    
  }
  
}
