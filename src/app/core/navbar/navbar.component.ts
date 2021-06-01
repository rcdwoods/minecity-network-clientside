import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/seguranca/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NotificacoesService } from './notificacoes/notificacoes.service';
import { PesquisaUsuarioService } from './pesquisa-usuario.service';
import { SolicitacoesAmizadeService } from './solicitacoes-amizade/solicitacoes-amizade.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private pesquisaUsuarioService: PesquisaUsuarioService,
    private router: Router,
    private notificacoesService: NotificacoesService,
    private solicitacoesAmizadeService: SolicitacoesAmizadeService,
    private usuarioService: UsuarioService
  ) { }

  items: MenuItem[] = [];
  text?: any;
  results?: any;

  exibirNotificacoes = false;
  exibirMensagens = false;
  exibirSolicitacoesDeAmizade = false;

  ngOnInit() {
    this.items = [
      {
        icon: 'pi pi-cog',
        label: 'Configurações da conta',
        url: '#'
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: (click) => { this.authService.efetuarLogout() }
      }
    ];
    this.usuarioService.getUsuario(this.authService.jwtPayload.user_name).then(response => {
      this.solicitacoesAmizadeService.solicitacoesDeAmizade = response.solicitacoesDeAmizade;
    })
  }

  search(event: any) {
    this.pesquisaUsuarioService.pesquisarUsernamesQueComecamCom(event.query)
      .then(data => { this.results = data });
  }

  aoSelecionar(username: any) {
    this.router.navigate([`/home/${username}`]).then(() => window.location.reload());
  }

  getUsername() {
    return this.authService.jwtPayload.user_name;
  }

  getQuantidadeDeNotificacoes() {
    return this.notificacoesService.notificacoes.length;
  }

  getQuantidadeDeSolicitacoes() {
    return this.solicitacoesAmizadeService.solicitacoesDeAmizade.length;
  }
}
