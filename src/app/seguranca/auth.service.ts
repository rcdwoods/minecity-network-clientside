import {  HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {
    this.carregarTokenDoLocalStore();
  }

  oAuthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  efetuarLogin(username: string, password: string): Promise<void> {
    // Headers da requisição.

    const headers: HttpHeaders = new HttpHeaders()
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    // Body da requisição.
    const body = new HttpParams()
      .append('username', username)
      .append('password', password)
      .append('grant_type', 'password');

    // Retorna o objeto JSON com o Token.
    return this.http.post<any>(this.oAuthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);
        this.router.navigate(['/']);
        console.info('Usuário logado com sucesso!');
      }).catch(erro => {
        if (erro.status == '400' && erro.error.error === 'invalid_grant') {
          this.errorHandler.handle('Usuário inválido.');
        } else {
          this.errorHandler.handle(erro);
          console.log(erro);
        }
      })

  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarTokenDoLocalStore() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }

    console.log('Token em uso: ' + localStorage.getItem('token'));
  }

  obterNovoAccessToken(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';
    return this.http.post<any>(this.oAuthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        console.log('Token expirado. Gerando um novo...')
        this.armazenarToken(response.access_token);
        console.log('Novo Access Token criado!');
        return Promise.resolve(null);
      }).catch(response => {
        console.error('Erro ao validar Token.')
        this.errorHandler.handle(response)
        return Promise.resolve(null);
      });
  }

  // Verifica se o Token atual é válido.
  isAccessTokenInvalido() {
    const token: any = localStorage.getItem('token');
    return this.jwtHelper.isTokenExpired(token);
  }

  // Verifica se o usuário logado possui uma ou mais permissões.
  hasPermissao(roles: string[]): boolean {
    let permissoes: String[] = this.jwtPayload?.authorities;

    for (let role of roles) {
      if (permissoes && permissoes.includes(role)) {
        return true;
      }
    }
    return false;
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  limparRefreshToken(): Promise<any> {
    const revokeTokenUrl = 'http://localhost:8080/tokens/revoke'

    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    // const body = 'grant_type=password';

    return this.http.delete(revokeTokenUrl, { headers, withCredentials: true })
      .toPromise()
      .then(() => {
        this.limparAccessToken();
        this.router.navigate(['/login']);
        console.log('RefreshToken removido com sucesso.')
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  efetuarLogout() {
    this.limparRefreshToken();
  }

  obterNovoAccessTokenCasoExpirado() {
    if(this.isAccessTokenInvalido()) {
      this.obterNovoAccessToken();
    }
  }

  obterTokenAtual() {
    this.obterNovoAccessTokenCasoExpirado();
    return localStorage.getItem('token');
  }

}
