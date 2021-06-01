import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  constructor() { }

  mensagens = [{
    isLida: false,
    autor: 'Henrique',
    ultimaMensagem: 'Tá aí?'
  }, {
    isLida: true,
    autor: 'Junior',
    ultimaMensagem: 'kkkk tmj'
  }, {
    isLida: false,
    autor: 'Sara',
    ultimaMensagem: 'mais ou menos'
  }];
}
