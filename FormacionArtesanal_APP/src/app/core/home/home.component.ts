import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EstudianteServiceService } from 'src/app/modules/estudiantes/services/estudiante-service.service';
import { ConsumidorAPIService } from 'src/app/shared/services/consumidor-api.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { RegistroComponent } from '../authentication/components/registro/registro.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  rol = 0;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private loginService: LoginService,
    private consumidor: ConsumidorAPIService,
    private dataEstudiante: EstudianteServiceService
  ) {
    this.rol = this.loginService.getRolUserLogged();
    
  }

  openDialogRegistro() {
    this.dialog.open(RegistroComponent, {disableClose: true, width: '700px'});
  }

  async ngOnInit() {
  
    await this.consumidor.consumirEstudiante();
    console.log("Estudiante en el home:")
    console.log(this.dataEstudiante.getEstudiante());

    if (this.rol === 1 ) {
      this.router.navigate(['/estudiante/inicio']);
    } else if (this.rol === 2 ) {
      this.router.navigate(['/profesor/inicio']);
    }

  }

  showButton = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.pageYOffset > 0) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
