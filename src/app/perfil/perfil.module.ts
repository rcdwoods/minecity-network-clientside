import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './pagina-perfil/pagina-perfil.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';
import { EmblemasComponent } from './emblemas/emblemas.component';
import { PaginaPerfilService } from './pagina-perfil/pagina-perfil.service';
import { PaginaAmigosComponent } from './pagina-amigos/pagina-amigos.component';
import { HeaderComponent } from './header/header.component';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [PerfilComponent, EmblemasComponent, PaginaAmigosComponent, HeaderComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    SharedModule,
    InputTextareaModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    AccordionModule,
    TooltipModule,
    MenuModule
  ],
  exports: [
    PerfilComponent,
    EmblemasComponent
  ],
  providers: [
    PaginaPerfilService
  ]
})
export class PerfilModule { }
