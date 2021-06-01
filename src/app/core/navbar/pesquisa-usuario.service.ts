import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PesquisaUsuarioService {

  constructor(
    private httpClient: HttpClient
  ) { }

  pesquisarUsernamesQueComecamCom(word: String): Promise<any> {
    const pesquisarUsuariosURL = 'http://localhost:8080/usuarios/pesquisa/'
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.httpClient.get(pesquisarUsuariosURL + word, { headers, withCredentials: true}).toPromise();
  }

}
