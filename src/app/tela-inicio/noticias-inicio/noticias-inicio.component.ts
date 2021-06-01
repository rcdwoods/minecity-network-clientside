import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/model';
import { PaginaFeedService } from 'src/app/feed/pagina-feed/pagina-feed.service';

@Component({
  selector: 'app-noticias-inicio',
  templateUrl: './noticias-inicio.component.html',
  styleUrls: ['./noticias-inicio.component.css']
})
export class NoticiasInicioComponent implements OnInit {

  noticiaSelecionada = 0;

  @Input() propriedadesCss: any = '';

  noticias = [
    {
      id: 0,
      titulo: 'NOVA CIDADE À CAMINHO!',
      descricao: 'Uma nova cidade está sendo construída e você já pode solicitar uma vaga exclusiva. Além de tudo, os primeiros 100 compradores irão adquirir um emblema exclusivo da cidade!',
      miniatura: 'background-image: url(../../../assets/images/noticias/box-noticias-1.jpg);'
    },
    {
      id: 1,
      titulo: 'DUAS CIDADES À CAMINHO!',
      descricao: 'Duas novas cidades estão sendo construídas e você já pode solicitar uma vaga exclusiva. Além de tudo, os primeiros 100 compradores irão adquirir um emblema exclusivo da cidade!',
      miniatura: 'background-image: url(../../../assets/images/noticias/box-noticias-2.jpg);'
    },
    {
      id: 2,
      titulo: 'TRÊS CIDADES À CAMINHO!',
      descricao: 'Três novas cidades estão sendo construídas e você já pode solicitar uma vaga exclusiva. Além de tudo, os primeiros 100 compradores irão adquirir um emblema exclusivo da cidade!',
      miniatura: 'background-image: url(../../../assets/images/noticias/box-noticias-3.jpg);'
    }
  ]

  isSelecionada(noticiaId: any) {
    if (noticiaId == this.noticiaSelecionada) {
      return "noticias__opcao-em-circulo selecionada"
    } return "noticias__opcao-em-circulo"

  }

  selecionarNoticia(noticiaId: any) {
    this.noticiaSelecionada = noticiaId;
  }

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      if (this.noticiaSelecionada == 2) {
        this.noticiaSelecionada = 0;
      } else {
        this.noticiaSelecionada++;
      }
    }, 5000);
  }

}
