import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/core/model';
import { AuthService } from 'src/app/seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PaginaFeedService } from './pagina-feed.service';

@Component({
  selector: 'app-pagina-feed',
  templateUrl: './pagina-feed.component.html',
  styleUrls: ['./pagina-feed.component.css']
})
export class PaginaFeedComponent implements OnInit {

  publicacoes: any = [];
  usuario: Usuario = new Usuario();
  username: string = 'usuarioPadrao';

  constructor(
    private paginaFeedService: PaginaFeedService,
    private errorHandlerService: ErrorHandlerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.username = this.authService.jwtPayload.user_name;
    this.paginaFeedService.getUsuario().then(response => this.usuario = response).catch(erro => this.errorHandlerService.handle(erro));
  }


  novaPublicacao(texto: any) {
    let novoTexto = texto.value;
    this.publicacoes.push({ username: 'RichardWoods', texto: novoTexto })
    console.log('Qtd' + texto.value.split("\n").length);
  }

  noticiasPropriedadesCss = {
    'width': '400px',
    'height': '100%',
    'margin-top': '0px',
  }

  emblemaCidadaoVerificado = '<div style="text-align: justify; width: auto"><p style="font-weight: bold; color:  #2196F3">Cidadão verificado</p><br>Este usuário é um jogador autêntico do Minecity.</div>'
  emblemaLorde = '<div style="text-align: justify; width: auto"><p style="font-weight: bold; color: rgb(61, 201, 57)">Lorde</p><br>Ultrapassou os $ 10.000 dolares! =O</div>'
  emblemaCelebridade = '<div style="text-align: justify; width: auto"><p style="font-weight: bold; color: rgb(253, 173, 0)">Celebridade</p><br>Adicionou mais de 100 amigos!</div>'


}
