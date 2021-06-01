import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext'
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea'
import { ButtonModule } from 'primeng/button';
import { RodapeComponent } from './rodape/rodape.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarInicioComponent } from './navbar-inicio/navbar-inicio.component';
import { NoticiasInicioComponent } from './noticias-inicio/noticias-inicio.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../seguranca/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SegurancaModule } from '../seguranca/seguranca.module';
import { RegistroService } from './registro/registro.service';



@NgModule({
  declarations: [
    InicioComponent,
    RodapeComponent,
    NavbarInicioComponent,
    NoticiasInicioComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    CheckboxModule,
    SegurancaModule
  ],
  exports: [
    InicioComponent,
    RodapeComponent,
    NoticiasInicioComponent
  ],
  providers: [
    AuthService,
    RegistroService
  ]
})
export class TelaInicioModule { }
