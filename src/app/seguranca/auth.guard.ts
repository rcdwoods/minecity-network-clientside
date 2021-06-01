import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from '../core/error-handler.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Verifica se o usuário possui permissão para acessar determinada URL.
  // Caso não possua, é retornado um 'false' e o sistema entende que a permissão é negada.
  constructor(
    private auth: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (state.url == '/login' && this.auth.jwtPayload) {
      this.router.navigate(['/']);
      return false;
    }

    if (route.data.roles && !this.auth.hasPermissao(route.data.roles)) {
      this.router.navigate(['/login']);
      this.errorHandler.handle('Você não tem permissão para acessar esta página.');
      return false;
    }

    return true;
  }

}
