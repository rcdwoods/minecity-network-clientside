import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import {TieredMenuModule} from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { PesquisaUsuarioService } from './navbar/pesquisa-usuario.service';
import { NotificacoesComponent } from './navbar/notificacoes/notificacoes.component';
import { NotificacoesService } from './navbar/notificacoes/notificacoes.service';
import { ClickOutsideModule } from 'ng-click-outside';
import { MensagensComponent } from './navbar/mensagens/mensagens.component';
import { SolicitacoesAmizadeComponent } from './navbar/solicitacoes-amizade/solicitacoes-amizade.component';


@NgModule({
  declarations: [
    NavbarComponent,
    NotificacoesComponent,
    MensagensComponent,
    SolicitacoesAmizadeComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    InputTextModule,
    TieredMenuModule,
    ButtonModule,
    BadgeModule,
    AutoCompleteModule,
    ClickOutsideModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    PesquisaUsuarioService,
    NotificacoesService
  ]
})
export class CoreModule { }
