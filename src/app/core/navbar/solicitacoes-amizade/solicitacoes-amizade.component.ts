import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NotificacoesService } from '../notificacoes/notificacoes.service';
import { SolicitacoesAmizadeService } from './solicitacoes-amizade.service';

@Component({
  selector: 'app-solicitacoes-amizade',
  templateUrl: './solicitacoes-amizade.component.html',
  styleUrls: ['./solicitacoes-amizade.component.css']
})
export class SolicitacoesAmizadeComponent implements OnInit {

  constructor(
    private solicitacoesAmizadeService: SolicitacoesAmizadeService,
  ) { }

  ngOnInit(): void {
  }

  getSolicitacoesDeAmizade() {
    return this.solicitacoesAmizadeService.solicitacoesDeAmizade;
  }

  aceitarSolicitacao(autor: String) {
    this.solicitacoesAmizadeService.aceitarSolicitacao(autor);
  }

  recusarSolicitacao(autor: String) {
    this.solicitacoesAmizadeService.removerSolicitacao(autor);
  }

}
