import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TelaInicioModule } from './tela-inicio/tela-inicio.module';
import { PerfilModule } from './perfil/perfil.module';
import { MessageService, SharedModule } from 'primeng/api';
import { ToastModule } from 'primeng/toast'
import { PaginaFeedModule } from './feed/pagina-feed.module'
import { UsuarioService } from './services/usuario.service';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    PaginaFeedModule,
    TelaInicioModule,
    PerfilModule,
    SharedModule,
    ToastModule,
    ClickOutsideModule
  ],
  providers: [
    UsuarioService,
    MessageService,
    { provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
