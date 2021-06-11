import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitacoesAmizadeService {

  usuariosUrl = 'http://localhost:8080/usuarios/'

  solicitacoesDeAmizade = [];

  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) { }

  aceitarSolicitacao(autor: String) {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + this.authService.obterTokenAtual());

    // console.log('ESSE É O BEARER 2 ' + console.log(this.authService.obterTokenAtual()));
    this.authService.obterNovoAccessTokenCasoExpirado();
    const username: String = this.authService.jwtPayload.user_name;
    this.httpClient.post(this.usuariosUrl + 'amigos', [username, autor], { headers }).subscribe(() => {
      console.log('Solicitação de amizade aceita com sucesso.');
      this.removerSolicitacao(autor);
      this.removerSolicitacaoDaLista(autor);
    });
  }

  removerSolicitacao(autor: String) {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + this.authService.obterTokenAtual());
    const username: String = this.authService.jwtPayload.user_name;

    this.httpClient.delete(this.usuariosUrl + `${username}/pedidosdeamizade/${autor}`, { headers })
      .toPromise().then(() => {
        this.removerSolicitacaoDaLista(autor);
        console.log("Tudo ocorreu corretamente.")
      }).catch(erro => {
        console.error('Erro: ', erro);
      });
  }

  removerSolicitacaoDaLista(autor: String) {
    let novaListaDeSolicitacoes: any = [];
    this.solicitacoesDeAmizade.forEach(solicitacao => {
      if (solicitacao != autor) {
        novaListaDeSolicitacoes.push(solicitacao);
      }
    })
    this.solicitacoesDeAmizade = novaListaDeSolicitacoes;
  }



}
