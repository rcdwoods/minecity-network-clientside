import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { MenuItem } from 'primeng/api';
import { Usuario } from 'src/app/core/model';
import { Comentario } from 'src/app/model/comentario.model';
import { Publicacao } from 'src/app/model/publicacao.model';
import { AuthService } from 'src/app/seguranca/auth.service';
import { PublicacoesService } from './publicacoes.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css'],
  animations: [
    trigger('fade', [
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
    ]),
    trigger('pulse', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('200ms 100ms', style({
          transform: 'scale(1.15)',
          opacity: 1
        })),
        animate('200ms', style({
          transform: 'scale(1)',
          opacity: 1
        }))
      ])
    ]),
    trigger('pulse-off', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('200ms 100ms', style({
          transform: 'scale(0.85)',
          opacity: 1
        })),
        animate('200ms', style({
          transform: 'scale(1)',
          opacity: 1
        }))
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('200ms 100ms', style({
          transform: 'rotate(60deg) scale(1.15)',
          opacity: 1
        })),
        animate('200ms', style({
          transform: 'scale(1)',
          opacity: 1
        }))
      ])
    ]),
    trigger('rotate-off', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('200ms 100ms', style({
          transform: 'rotate(60deg) scale(0.85)',
          opacity: 1
        })),
        animate('200ms', style({
          transform: 'scale(1)',
          opacity: 1
        }))
      ])
    ]),
    trigger('tempoCarregamento', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('650ms', style({
          opacity: 0
        })),
        animate('400ms')
      ])
    ]),
    trigger('ofuscar', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms'),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('1000ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PublicacoesComponent implements OnInit {

  fade: string = 'fade';
  usuario: Usuario = new Usuario();
  username: string = 'usernamePadrao';
  textoAntesDaModificacao: string = '';

  publicacao: Publicacao = new Publicacao();

  @Output() comentarioAdicionado = new EventEmitter();

  @Input() perfilEmExibicao?: string;

  editorDePublicacaoIsAberto: boolean = false;

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
      { label: 'Editar', icon: 'pi pi-fw pi-pencil', command: () => { this.abrirEditorDePublicacao(this.publicacao) } },
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

  editarPublicacao(publicacao: Publicacao, texto: string) {
    publicacao.texto = texto;
    publicacao.editorIsAberto = false;
    this.publicacoesService.editarPublicacao(publicacao);
  }

  aoClicarEmOpcoesNaPublicacao(publicacao: Publicacao, publicacaoId?: string) {
    this.publicacaoSelecionadaId = publicacaoId;
    this.publicacao = publicacao;
  }

  aoClicarEmOpcoesNoComentario(comentarioId?: string, publicacaoId?: string) {
    this.comentarioSelecionadoId = comentarioId;
    this.publicacaoSelecionadaId = publicacaoId;
  }

  abrirEditorDePublicacao(publicacao: Publicacao) {
    publicacao.editorIsAberto = true;
  }

  fecharEditorDePublicacao(publicacao: Publicacao) {
    publicacao.editorIsAberto = false;
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

  // Organiza as publicações de acordo com a data de publicação.
  getPublicacoesOrganizadas(publicacoes: Array<Publicacao>): Array<Publicacao> {
    publicacoes.sort((a, b) => {
      if (moment(a.dataPostagem).isAfter(b.dataPostagem)) {
        return -1;
      } return 1;
    })
    return publicacoes;
  }

  salvarTextoAnterior(textoAnterior: string) {
    this.textoAntesDaModificacao = textoAnterior;
  }
}
