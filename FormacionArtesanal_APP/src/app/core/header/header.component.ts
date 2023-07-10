import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/shared/services/login.service';
import { UsuarioServiceService } from 'src/app/shared/services/usuario-service.service';
import { LoginComponent } from '../authentication/components/login/login.component';
import { RegistroComponent } from '../authentication/components/registro/registro.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  active = false;
  rol: number = 0;
  usuario: string = '';

  activeMenu = false;


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private loginService: LoginService,
    private dataUsuario: UsuarioServiceService
  ) {
    this.rol = this.loginService.getRolUserLogged();
    this.active = this.loginService.getActive();
    if(this.active) {
      this.usuario = this.loginService.getUsuarioLogueado();
    } else {
      this.usuario = '';
    }
    
  }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  openLogin(): void {
    this.dialog.open(LoginComponent, {disableClose: false, width: '500px'});
  }

  openRegistro(): void {
    this.dialog.open(RegistroComponent, {disableClose: false, width: '700px'});
  }

  logout() {
    this.loginService.logOut();
    this.router.navigate(['/inicio']);
  }

}
