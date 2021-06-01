import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  bearer: any = '';

  usuarioUsernameExists = 'http://localhost:8080/usuarios/existe/username/';
  usuarioEmailExists = 'http://localhost:8080/usuarios/existe/email/';
  tokenUrl = 'http://localhost:8080/oauth/token';
  usuariosUrl = 'http://localhost:8080/usuarios'

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService
  ) { }

  // headers: HttpHeaders = new HttpHeaders()
  //   .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

  validarRegistro(registroForm: any) {
    this.getAccessTokenBasico();
    // this.getAccessTokenBasico().then(response => this.bearer = response.access_token).catch(erro => console.log('ERRO AO ADQUIRIR BEARER'));
    console.log('BEARER: ')
    console.log(this.bearer)

    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + this.bearer);
    this.httpClient.post(this.usuariosUrl, registroForm.value, { headers }).toPromise()
      .then(response => {
        this.messageService.add({ severity: 'success', detail: 'Cadastrado com sucesso!' });
        // this.authService.limparRefreshToken();
        this.authService.limparAccessToken();
        this.authService.efetuarLogin(registroForm.value.username, registroForm.value.senha);
      }).catch(erro => {
        this.errorHandlerService.handle('Erro ao validar registro');
      });
  }

  getAccessTokenBasico() {
    const headers: HttpHeaders = new HttpHeaders()
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    // Body da requisição.
    const body = new HttpParams()
      .append('username', 'Angular')
      .append('password', 'S=sweB7Ava')
      .append('grant_type', 'password');

    return this.httpClient.post<any>(this.tokenUrl, body, { headers, withCredentials: true })
    .toPromise()
    .then(response => this.bearer = response.access_token)
    .catch(erro => this.errorHandlerService.handle(erro));
  }
}
