import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Usuario } from 'src/app/core/model';
import { PaginaFeedService } from 'src/app/feed/pagina-feed/pagina-feed.service';
import { Publicacao } from 'src/app/model/publicacao.model';
import { AuthService } from 'src/app/seguranca/auth.service';
import { PublicacoesService } from '../publicacoes/publicacoes.service';

@Component({
  selector: 'app-nova-publicacao',
  templateUrl: './nova-publicacao.component.html',
  styleUrls: ['./nova-publicacao.component.css']
})
export class NovaPublicacaoComponent implements OnInit {

  // A variável username recebe o user_name salvo no PayLoad.
  username: string = 'usernamePadrao';

  publicacoes: Array<Publicacao> = new Array<Publicacao>();
  publicacao: Publicacao = new Publicacao();

  @Output() novaPublicacaoAdicionada: EventEmitter<Publicacao> = new EventEmitter();

  constructor(
    private publicacoesService: PublicacoesService,
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.username = this.authService.jwtPayload.user_name;
  }

  novaPublicacao(texto: any) {
    if (texto.value != undefined) {
      this.publicacao.autor = this.username;
      this.publicacao.texto = texto.value.texto;
      this.publicacoesService.novaPublicacao(this.publicacao);
    } else {
      this.errorHandlerService.handle('Erro ao realizar nova publicação. Contacte um administrador.')
    }
  }

}
