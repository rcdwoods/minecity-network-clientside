import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { RegistroService } from './registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  @Output() exibirRegistro: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private registroService: RegistroService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.registroService.getAccessTokenBasico();
  }

  efetuarRegistro(registroForm: any) {
    this.registroService.validarRegistro(registroForm);
  }



}
