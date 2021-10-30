import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Usuario } from 'src/app/core/model';
import { AuthService } from 'src/app/seguranca/auth.service';
import { AmigoService } from 'src/app/services/amigo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-pagina-amigos',
  templateUrl: './pagina-amigos.component.html',
  styleUrls: ['./pagina-amigos.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('400ms ease-in')
      ]),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.60)',
        }),
        animate('200ms 300ms',
          style({
            transform: 'scale(0.95)',
            opacity: 0.85
          })),
        animate('100ms',
          style({
            transform: 'scale(1)',
            opacity: 1
          }))
      ]),
      transition(':leave', [
        animate('200ms 50ms',
          style({
            transform: 'scale(1.05)'
          })),
        animate('50ms',
          style({
            transform: 'scale(1)',
            opacity: 0.75
          })),
        animate('120ms',
          style({
            transform: 'scale(0.68)',
            opacity: 0
          })),
        animate('150ms',
          style({
            height: '0px',
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
            'margin-top': '0',
            'margin-bottom': '0',
            opacity: 0
          }))
      ])
    ])
  ]
})
export class PaginaAmigosComponent implements OnInit {

  usuario: Usuario = new Usuario();
  username: string = 'usernamePadrao';
  amigos: Array<Amigo> = [];
  amigoEmExibicao: Usuario = new Usuario;
  amigosEmComum: any = [];
  amigosPesquisados: any = [];
  friendnameClicado = '';


  amigosOpcoes: MenuItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private amigoService: AmigoService
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
      .then(usuario => {
        this.usuario = usuario;
        this.obterAmigos(usuario.username);
        this.selecionarAmigoPadraoParaExibicao();
      })
      .catch(erro => {
        console.error('Usuário não encontrado.');
        this.errorHandlerService.handle('Usuário não encontrado.');
        console.log(this.router.navigate(['']));
      });

    this.amigosOpcoes = [
      { label: 'Desfazer amizade', icon: 'pi pi-user-minus', command: (click) => { this.removerAmigo() } },
      { label: 'Bloquear usuário', icon: 'pi pi-ban', command: () => { } }
    ];
  }

  // Preenche a variável 'amigos', que contém a lista de amigos do usuário logado
  // Na lista de amigos contém também uma lista de amigos em comum em relação ao usuário logado.
  obterAmigos(username: String): any {
    this.amigoService.getAmigos(username).then(listaDeAmigos => {
      listaDeAmigos.forEach(amigo => {
        this.obterAmigosEmComum(amigo);
      });
    })
  }

  // Recebe o nome de um usuário e exibe este usuário no painel de exibição da página de amigos.
  selecionarAmigoParaExibicao(friendname: String) {
    if (this.usuario.amigos) {
      this.usuarioService.getUsuario(friendname).then(usuario => {
        this.amigoEmExibicao = usuario;
      }).catch(erro => {
        this.errorHandlerService.handle("Ocorreu um erro ao exibir informações do amigo no painel de exibição.");
        console.error("Erro ao exibir informações de um amigo ", erro);
      });
    }
  }

  // Seleciona o primeiro usuário da lista de amigos para ser exibido no painel.
  selecionarAmigoPadraoParaExibicao() {
    if (this.usuario.amigos.length > 0) {
      this.usuarioService.getUsuario(this.usuario.amigos[0]).then(usuario => {
        this.amigoEmExibicao = usuario;
      }).catch(erro => {
        this.errorHandlerService.handle("Erro ao buscar usuário padrão para exibicação.");
        console.error("Erro ao buscar usuário padrão para exibição. ", erro);
      });
    }
  }

  // Recebe o nome de um usuário e retorna uma lista de amigos em comum.
  obterAmigosEmComum(usernameAlvo: String) {
    this.amigos = [];
    this.amigoService.obterAmigosEmComum(usernameAlvo).then(listaDeAmigosEmComum => {
      this.amigos.push({
        username: usernameAlvo,
        amigosEmComum: listaDeAmigosEmComum
      })
    }).catch(erro => {
      this.errorHandlerService.handle('Erro ao se obter a lista de amigos em comum de um ou mais jogadores.');
      console.error('Erro ao obter a lista de amigos em comum de um ou mais jogadores. ', erro);
    });
  }

  removerAmigo() {
    this.amigoService.excluirAmigo(this.friendnameClicado).then(() => {
      this.amigos.forEach(amigo => {
        if (amigo.username == this.friendnameClicado) {
          this.amigos.splice(this.amigos.indexOf(amigo), 1)
        }
      })
    })
  }

  aoClicarEmOpcoes(amigo: any) {
    this.friendnameClicado = amigo.username;
  }

  pesquisarAmigos(friendname: String) {
    let listaDeAmigosEncontrados: Array<String> = [];
    let username = this.usuario.username;
    this.amigoService.pesquisarAmigos(username, friendname).then(amigosEncontrados => {
      listaDeAmigosEncontrados = amigosEncontrados;
      if (listaDeAmigosEncontrados.length == 0) {
        // this.amigos = [];
      }
      listaDeAmigosEncontrados.forEach(amigoEncontrado => {
        this.obterAmigosEmComum(amigoEncontrado);
      })
    }).catch(erro => {
      this.errorHandlerService.handle('Ocorreu um erro ao pesquisar amigos.');
      console.error('Ocorreu um erro ao pesquisar amigos. ', erro);
    });
  }

}

export class Amigo {
  username: any = '';
  amigosEmComum: any = [];
}
