import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-perfil.component.html',
  styleUrls: ['./dropdown-perfil.component.scss'],
})
export class DropdownPerfilComponent {
  constructor(
    // public auth: AuthService,
    // private localService: LocalService,
    private router: Router
  ) {}

  verPerfil() {
    // const usuario = this.localService.getUser();
    // this.router.navigate([`private/usuario/${usuario.idUser}`]);
  }

  sair() {
    // this.auth.logout();
  }

  configuracaoDoServico() {
    this.router.navigate(['private/configuracoes']);
  }
}
