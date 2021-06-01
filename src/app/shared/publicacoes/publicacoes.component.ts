import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MenuItem } from 'primeng/api';
import { Usuario } from 'src/app/core/model';
import { PaginaFeedService } from 'src/app/feed/pagina-feed/pagina-feed.service';
import { Comentario } from 'src/app/model/comentario.model';
import { Curtida } from 'src/app/model/curtida.model';
import { Publicacao } from 'src/app/model/publicacao.model';
import { AuthService } from 'src/app/seguranca/auth.service';
import { PublicacoesService } from './publicacoes.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  usuario: Usuario = new Usuario();
  username: string = 'usernamePadrao';

  @Output() comentarioAdicionado = new EventEmitter();

  @Input() perfilEmExibicao?: string;

  publicacaoOpcoes: MenuItem[] = [];
  comentarioOpcoes: MenuItem[] = [];

  publicacaoSelecionadaId?: string;
  comentarioSelecionadoId?: string;

  constructor(
    private publicacoesService: PublicacoesService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.publicacaoOpcoes = [
      { label: 'Editar', icon: 'pi pi-fw pi-pencil' },
      { label: 'Excluir', icon: 'pi pi-fw pi-trash', command: () => { this.deletarPublicacao(this.publicacaoSelecionadaId) } }
    ];
    this.comentarioOpcoes = [
      { label: 'Editar', icon: 'pi pi-fw pi-pencil' },
      { label: 'Excluir', icon: 'pi pi-fw pi-trash', command: () => { this.removerComentario() } }
    ];
    this.username = this.authService.jwtPayload.user_name;
    if (this.perfilEmExibicao == undefined) {
      this.publicacoesService.getPublicacoes().then(publicacoes => { this.publicacoesService.publicacoes = this.getPublicacoesOrganizadas(publicacoes) });
    } else {
      this.publicacoesService.getPublicacoesDoUsuario(this.perfilEmExibicao).then(publicacoes => {
        this.publicacoesService.publicacoes = this.getPublicacoesOrganizadas(publicacoes);
      });
    }
  }

  getPublicacoes() {
    return this.publicacoesService.publicacoes;
  }

  aoClicarEmOpcoesNaPublicacao(publicacaoId?: string) {
    this.publicacaoSelecionadaId = publicacaoId;
  }

  aoClicarEmOpcoesNoComentario(comentarioId?: string, publicacaoId?: string) {
    this.comentarioSelecionadoId = comentarioId;
    this.publicacaoSelecionadaId = publicacaoId;
  }

  deletarPublicacao(publicacaoSelecionadaId?: string) {
    this.publicacoesService.deletePublicacao(publicacaoSelecionadaId)
  }

  // Remove usuário da lista que está sendo exibida para monstrar em tempo real na rede social.
  removerPublicacaoDaListaAtual(publicacaoId?: string) {
    var publicacoesNova: Array<Publicacao> = [];
    for (var i = 0, j = this.publicacoesService.publicacoes.length; i !== j; i++) {
      if (this.publicacoesService.publicacoes[i].id !== publicacaoId) publicacoesNova.push(this.publicacoesService.publicacoes[i]);
    }
    this.publicacoesService.publicacoes = publicacoesNova;
  };

  adicionarComentario(event: KeyboardEvent, texto: string, publicacaoId?: string) {
    if (event.keyCode === 13 && event.shiftKey == true) {
    } else if (event.keyCode === 13) {
      this.comentarioAdicionado.emit();
      let comentario: Comentario = new Comentario();
      comentario.autor = this.username;
      comentario.texto = texto;
      this.publicacoesService.novoComentario(publicacaoId, comentario).then(comentario => {
        this.publicacoesService.adicionarComentarioNaListaDePublicacoes(publicacaoId, comentario);
      });
    }
  }

  removerComentario() {
    this.publicacoesService.removerComentario(this.comentarioSelecionadoId, this.publicacaoSelecionadaId);
    this.publicacoesService.removerComentarioDaListaDePublicacoes(this.comentarioSelecionadoId, this.publicacaoSelecionadaId);
    console.log('COMENTARIO ID: ', this.comentarioSelecionadoId);
    console.log('PUBLICACAO ID: ', this.publicacaoSelecionadaId);
    console.log('Tentando remover...');
  }

  reagir(username: String, publicacao: Publicacao) {
    this.publicacoesService.reagirPublicacao(username, publicacao);
  }

  exibirReacoes(publicacao: Publicacao): any {
    let listaDeReacoesEstilizada: any = "<p style='font-size: 14px; text-align: center'>Quem curtiu</p>";
    let pessoasQueCurtiram: any[] = [];
    publicacao.curtidas?.forEach(curtida => {
      pessoasQueCurtiram.push(curtida.autor);
    })
    return listaDeReacoesEstilizada + pessoasQueCurtiram;
  }

  publicacaoIsCurtida(publicacao: Publicacao, username: String) {
    return this.publicacoesService.publicacaoIsCurtida(username, publicacao);
  }

  getTempoDePostagem(publicacao: Publicacao) {
    moment.locale('PT-BR');
    return moment(publicacao.dataPostagem).fromNow();
  }

  getPublicacoesOrganizadas(publicacoes: Array<Publicacao>): Array<Publicacao> {
    publicacoes.sort((a, b) => {
      if (moment(a.dataPostagem).isAfter(b.dataPostagem)) {
        return -1;
      } return 1;
    })
    return publicacoes;
  }
}
