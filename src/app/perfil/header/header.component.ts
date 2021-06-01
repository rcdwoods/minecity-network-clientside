import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/core/model';
import { AuthService } from 'src/app/seguranca/auth.service';
import { AmigoService } from 'src/app/services/amigo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() usuario?: Usuario;
  username: String = 'usernamePadrao';
  listaDeAmigos: Array<String> = [];

  constructor(
    private amigoService: AmigoService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['username'] != undefined) {
      this.username = this.route.snapshot.params['username'];
    } else {
      this.username = this.authService.jwtPayload.user_name;
    }
    this.amigoService.getAmigos(this.username).then(amigos => {
      this.listaDeAmigos = amigos;
    })
  }

  solicitarAmizade(username: any) {
    this.amigoService.solicitarAmizade(username);
    this.atualizarUsuarioVisitado();
  }

  usuarioIsAmigo(): boolean {
    return this.listaDeAmigos.includes(this.authService.jwtPayload.user_name);
  }

  usuarioIsDiferenteDoLogado(): boolean {
    if (this.username != this.authService.jwtPayload.user_name) {
      return true;
    } return false;
  }

  getUsernameLogado() {
    return this.authService.jwtPayload.user_name;
  }

  atualizarUsuarioVisitado() {
    if(this.usuario?.username) {
      this.usuarioService.getUsuario(this.usuario?.username).then(usuarioAtualizado => {
        this.usuario = usuarioAtualizado;
      })
    }
  }

}
