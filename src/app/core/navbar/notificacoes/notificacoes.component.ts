import { Component, OnInit } from '@angular/core';
import { NotificacoesService } from './notificacoes.service';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.css']
})
export class NotificacoesComponent implements OnInit {

  constructor(
    private notificacoesService: NotificacoesService
  ) { }

  ngOnInit(): void {

  }

  getNotificacaoTexto(notificacao: any) {
    if(notificacao.tipo == 'curtida') {
      return 'curtiu uma de suas publicações.'
    } else if(notificacao.tipo == 'comentario') {
      return 'comentou uma de suas publicações.'
    } else {
      return '';
    }
  }

  getNotificacoes() {
    return this.notificacoesService.notificacoes;
  }



}
