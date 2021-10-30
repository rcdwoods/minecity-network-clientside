import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Usuario } from '../core/model';
import { AuthService } from '../seguranca/auth.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AmigoService {

  usuariosUrl = 'http://localhost:8080/usuarios/'

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private messageService: MessageService
  ) { }

  headers = new HttpHeaders()
    .append('Authorization', 'Bearer ' + this.authService.obterTokenAtual());

  getAmigos(username: String): Promise<Array<String>> {
    const headers = this.headers;
    return this.httpClient.get<any>(this.usuariosUrl + `${username}/amigos`, { headers }).toPromise();
  }

  solicitarAmizade(username: String) {
    const headers = this.headers;
    this.httpClient.post(this.usuariosUrl + `${username}/pedidosdeamizade/${this.authService.jwtPayload.user_name}`, this.authService.jwtPayload.user_name, { headers })
      .toPromise().then(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Solicitação de amizade enviada com sucesso.' });
      }).catch(erro => {
        console.error('Ocorreu um erro ao solicitar amizade. ', erro);
        this.messageService.add({ severity: 'error', summary: 'Ops!', detail: 'Esse usuário já é seu amigo.' });
      })
  }

  usuarioIsAmigo(username: String): boolean {
    let listaDeAmigos: Array<String> = [];
    this.getAmigos(this.authService.jwtPayload.user_name).then(amigos => {
      listaDeAmigos = amigos;
      console.log("Lista de amigos adicionada!")
    }).catch(erro => {
      console.error("Erro buscar lista de amigos. ", erro);
    })
    if (listaDeAmigos.includes(username)) {
      return true;
    } return false;
  }

  obterAmigosEmComum(usernameAlvo: String) {
    const headers = this.headers;
    const username = this.authService.jwtPayload.user_name;
    return this.httpClient.get(this.usuariosUrl + `amigos/${username}/${usernameAlvo}`, { headers })
      .toPromise();
  }

  pesquisarAmigos(username: any, friendname: String): Promise<any> {
    const headers = this.headers;
    return this.httpClient.get(this.usuariosUrl + `${username}/amigos/${friendname}`, { headers }).toPromise();
  }

  // TO DO
  excluirAmigo(friendname: string): Promise<any> {
    const headers = this.headers;
    return this.httpClient.delete(this.usuariosUrl + `${this.authService.jwtPayload.user_name}/amigos/${friendname}`, { headers }).toPromise();;
  }

}
