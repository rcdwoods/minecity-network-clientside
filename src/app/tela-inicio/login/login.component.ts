import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() exibirRegistro = new EventEmitter<boolean>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  efetuarLogin(usuario: any) {
    this.authService.efetuarLogin(usuario.value.username, usuario.value.password);
  }

}
