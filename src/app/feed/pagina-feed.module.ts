import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaInicioModule } from '../tela-inicio/tela-inicio.module';
import { PaginaFeedComponent } from './pagina-feed/pagina-feed.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CoreModule } from '../core/core.module';
import { TooltipModule } from 'primeng/tooltip'
import { AccordionModule } from 'primeng/accordion'
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PerfilModule } from '../perfil/perfil.module';
import { PaginaFeedService } from './pagina-feed/pagina-feed.service';



@NgModule({
  declarations: [PaginaFeedComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    TelaInicioModule,
    InputTextareaModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    CoreModule,
    TooltipModule,
    AccordionModule,
    RouterModule,
    SharedModule,
    PerfilModule
  ],
  exports: [
    PaginaFeedComponent
  ],
  providers: [
    PaginaFeedService
  ]
})
export class PaginaFeedModule { }
