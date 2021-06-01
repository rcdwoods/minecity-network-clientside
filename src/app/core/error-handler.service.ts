import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let mensagem: string;

    if (errorResponse === 'refreshTokenExpirado') {
      mensagem = 'Sessão expirada.'
      this.router.navigate(['/login'])
    } else if (typeof errorResponse === 'string') {
      mensagem = errorResponse;
    } else {
      mensagem = "Erro ao processar serviço remoto. Tente novamente";
      console.error('Erro: ' + errorResponse);
    }

    this.messageService.add({ severity: 'error', detail: mensagem });
  }
}
