import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../core/model';
import { AuthService } from '../seguranca/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuariosUrl = 'http://localhost:8080/usuarios/'

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  getUsuario(username: String): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + this.authService.obterTokenAtual());
    return this.httpClient.get<any>(this.usuariosUrl + username , { headers, withCredentials: true })
      .toPromise();
  }
}
