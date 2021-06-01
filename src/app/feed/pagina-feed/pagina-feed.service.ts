import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/core/model';
import { AuthService } from 'src/app/seguranca/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaginaFeedService {

  usuario: Usuario = new Usuario();

  usuariosUrl: string = 'http://localhost:8080/usuarios/'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUsuario(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any>(this.usuariosUrl + this.authService.jwtPayload?.user_name , { headers, withCredentials: true })
      .toPromise().then(response => this.usuario = response);
  }
}
