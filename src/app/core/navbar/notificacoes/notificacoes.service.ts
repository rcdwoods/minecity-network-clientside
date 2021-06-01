import { Injectable } from '@angular/core';
import { Curtida } from 'src/app/model/curtida.model';

@Injectable({
  providedIn: 'root'
})
export class NotificacoesService {

  notificacoes = [{
    tipo: 'curtida',
    autor: 'RichardWoods'
  }, {
    tipo: 'comentario',
    autor: 'Angular'
  }, {
    tipo: 'curtida',
    autor: 'napataara'
  }];

  constructor() { }
}
