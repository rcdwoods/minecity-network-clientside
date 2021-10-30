import { animate, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Usuario } from 'src/app/core/model';
import { AuthService } from 'src/app/seguranca/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './pagina-perfil.component.html',
  styleUrls: ['./pagina-perfil.component.css'],
  animations: [
    trigger('tempoCarregamento', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('2000ms')
      ])
    ])
  ]
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = new Usuario();
  username: string = 'usernamePadrao';

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Se o parâmetro não estiver indefinido
    // Significa que o usuário está acessando o perfil de outro jogador.
    if (this.route.snapshot.params['username'] != undefined) {
      this.username = this.route.snapshot.params['username'];
    } else {
      this.username = this.authService.jwtPayload.user_name;
    }
    this.usuarioService.getUsuario(this.username)
      .then(response => this.usuario = response)
      .catch(erro => {
        console.error('Usuário não encontrado.')
        this.errorHandlerService.handle('Usuário não encontrado.')
        console.log(this.router.navigate(['']))
      });
  }

  isDonoDoPerfil() {
    if(this.username == this.authService.jwtPayload.user_name) {
      return true;
    } return false;
  }

}
