import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaFeedComponent } from './feed/pagina-feed/pagina-feed.component';
import { PaginaAmigosComponent } from './perfil/pagina-amigos/pagina-amigos.component';
import { PerfilComponent } from './perfil/pagina-perfil/pagina-perfil.component';
import { AuthGuard } from './seguranca/auth.guard';
import { InicioComponent } from './tela-inicio/inicio/inicio.component';

const routes: Routes = [
  { path: 'login', component: InicioComponent },
  { path: '', component: PaginaFeedComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ACESSAR_FEED'] } },
  { path: 'home', component: PerfilComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ACESSAR_PERFIL'] } },
  { path: 'home/:username', component: PerfilComponent },
  { path: 'friends', component: PaginaAmigosComponent },
  { path: 'friends/:username', component: PaginaAmigosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
