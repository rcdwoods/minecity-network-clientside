import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Comentario } from 'src/app/model/comentario.model';
import { Curtida } from 'src/app/model/curtida.model';
import { Publicacao } from 'src/app/model/publicacao.model';
import { AuthService } from 'src/app/seguranca/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicacoesService {

  publicacoesUrl = 'http://localhost:8080/publicacoes/';
  comentariosUrl = 'http://localhost:8080/publicacoes/comentario/'

  publicacoes: Array<Publicacao> = [];
  publicacoesDoUsuario: Array<Publicacao> = [];

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  headers = new HttpHeaders()
    .append('Authorization', 'Bearer ' + localStorage.getItem('token'));

  novaPublicacao(publicacao: Publicacao): Promise<any> {
    const headers = this.headers;
    // this.publicacoes?.push(publicacao);
    return this.httpClient.post<any>(this.publicacoesUrl,
      publicacao, { headers }).toPromise().then(publicacao => {
        this.publicacoes.unshift(publicacao);
        console.log('Requisição POST efetuada com sucesso. ', publicacao)
      }).catch(erro => {
        this.errorHandlerService.handle('Erro ao adicionar publicação. Recarregue a página e tente novamente.');
      });
  }

  getPublicacoes(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get<any>(this.publicacoesUrl, { headers }).toPromise();
  }

  deletePublicacao(publicacaoId?: string) {
    const headers = this.headers;
    console.log(headers)
    return this.httpClient.delete(this.publicacoesUrl + publicacaoId, { headers })
      .toPromise().then(() => {
        this.removerPublicacaoDaListaAtual(publicacaoId);
        console.log('Requisição DELETE efetuada com sucesso.');
      }).catch(erro => {
        this.errorHandlerService.handle('Erro ao remover publicação. Recarregue a página e tente novamente.')
      });
  }

  removerPublicacaoDaListaAtual(publicacaoId?: string) {
    var publicacoesNova: Array<Publicacao> = [];
    for (var i = 0, j = this.publicacoes.length; i !== j; i++) {
      if (this.publicacoes[i].id !== publicacaoId) publicacoesNova.push(this.publicacoes[i]);
    }
    this.publicacoes = publicacoesNova;
  };

  getPublicacoesDoUsuario(autor: String): Promise<any> {
    const headers = this.headers;
    return this.httpClient.get(this.publicacoesUrl + autor, { headers }).toPromise();
  }

  novoComentario(publicacaoId?: string, comentario?: Comentario): Promise<any> {
    const headers = this.headers;
    return this.httpClient.post(this.publicacoesUrl + `comentario/${publicacaoId}`, comentario, { headers }).toPromise();
  }

  adicionarComentarioNaListaDePublicacoes(publicacaoId?: string, comentario?: Comentario) {
    for (let publicacao of this.publicacoes) {
      if (publicacao.id == publicacaoId && comentario != undefined) {
        publicacao.comentarios?.push(comentario);
      }
    }
  }

  removerComentario(comentarioId?: String, publicacaoId?: String) {
    const headers = this.headers;
    this.httpClient.delete(this.publicacoesUrl + `comentario/${publicacaoId}/${comentarioId}`, { headers }).subscribe(() => {
      console.log('Comentário removido com sucesso.')
    })
  }

  removerComentarioDaListaDePublicacoes(comentarioId?: string, publicacaoId?: string) {
    for (let publicacao of this.publicacoes) {
      if (publicacao.id == publicacaoId) {
        publicacao.comentarios = this.removerComentarioDaListaAtual(publicacao, comentarioId);
      }
    }
  }

  removerComentarioDaListaAtual(publicacao: Publicacao, comentarioId?: string) {
    var comentariosNovo: Array<Comentario> = [];

    if (publicacao != undefined && publicacao.comentarios != undefined) {
      for (var i = 0, j = publicacao?.comentarios?.length; i !== j; i++) {
        if (publicacao.comentarios[i].id !== comentarioId) comentariosNovo.push(publicacao.comentarios[i]);
      }
    }

    console.log('COMENTARIOS NOVO: ', comentariosNovo)
    return comentariosNovo;
  };

  reagirPublicacao(username: String, publicacao: Publicacao) {
    if (!this.publicacaoIsCurtida(username, publicacao)) {
      this.adicionarCurtida(username, publicacao);
    } else {
      this.removerCurtida(username, publicacao);
    }
  }

  publicacaoIsCurtida(username: String, publicacao: Publicacao) {
    let publicacaoIsCurtida: Boolean = false;
    publicacao.curtidas?.forEach(curtida => {
      if (curtida.autor == username) {
        publicacaoIsCurtida = true;
      }
    })
    return publicacaoIsCurtida;
  }

  adicionarCurtida(username: String, publicacao: Publicacao) {
    const headers = this.headers;
    let curtida: Curtida = new Curtida();
    curtida.autor = username;
    this.httpClient.post(this.publicacoesUrl + `curtida/${publicacao.id}`, curtida, { headers }).subscribe(() => {
      publicacao.curtidas?.push(curtida);
    });
  }

  removerCurtida(username: String, publicacao: Publicacao) {
    const headers = this.headers;
    this.httpClient.delete(this.publicacoesUrl + `curtida/${publicacao.id}/${username}`, { headers }).subscribe(() => {
      this.removerCurtidaDaListaDeCurtidas(username, publicacao);
    })
  }

  removerCurtidaDaListaDeCurtidas(username: String, publicacao: Publicacao) {
    let novasCurtidas: Array<Curtida> = new Array<Curtida>();
    publicacao.curtidas?.forEach(curtida => {
      if (curtida.autor != username) {
        novasCurtidas.push(curtida);
      }
    })
    publicacao.curtidas = novasCurtidas;
  }

}
