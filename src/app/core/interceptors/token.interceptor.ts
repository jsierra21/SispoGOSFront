import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService, TOKEN_KEY } from '../services/authentication.service';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  isLoading = false;

  constructor(
    private storageService: StorageService,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.handle(req, next));
  }

  async handle(request: HttpRequest<any>, next: HttpHandler) {

    await this.storageService.initStorage();

    const token = await this.storageService.get(TOKEN_KEY);

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          this.auth.logout().then(() => {
            this.router.navigateByUrl('login', { replaceUrl: true });
          });
        }

        return throwError(error);

      })).toPromise();
  }

}
