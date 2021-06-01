import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { from, Observable } from "rxjs";
import { mergeMap } from 'rxjs/operators';
import { ErrorHandlerService } from "../core/error-handler.service";
import { AuthService } from "./auth.service";

export class NotAuthenticatedError { }

@Injectable()
export class MoneyHttpInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalido() && this.router.url != '/login') {
      return from(this.auth.obterNovoAccessToken())
        .pipe(
          mergeMap(() => {
            // Caso o AccessToken ainda for inválido significa que o RefreshToken está expirado.
            // Nesse caso, será lançada uma Exception para que o erro seja tratado.
            if (this.auth.isAccessTokenInvalido()) {
              this.auth.limparAccessToken();
              throw this.errorHandler.handle('refreshTokenExpirado');
            }

            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });

            return next.handle(req);
          })
        );
    }

    return next.handle(req);
  }
}
