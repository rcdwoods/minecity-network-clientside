import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovaPublicacaoComponent } from './nova-publicacao/nova-publicacao.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { PublicacoesComponent } from './publicacoes/publicacoes.component';
import { PublicacoesService } from './publicacoes/publicacoes.service';
import { TooltipModule } from 'primeng/tooltip';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';

@NgModule({
  declarations: [
    NovaPublicacaoComponent,
    PublicacoesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    TooltipModule,
    MenuModule
  ],
  exports: [
    NovaPublicacaoComponent,
    PublicacoesComponent
  ],
  providers: [
    PublicacoesService
  ]
})
export class SharedModule { }
