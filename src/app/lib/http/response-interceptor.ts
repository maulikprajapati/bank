import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler,
  HttpEvent, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { filter, map, switchMap, catchError, finalize, take } from 'rxjs/operators';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService) {
    this.isRefreshingToken = false;
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
    } else {
      return req;
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(req, this.authService.getAuthToken())).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        return event;
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        switch ((<HttpErrorResponse>err).status) {
          case 400:
            return this.handle400Error(err);
          case 401:
            return this.handle401Error(req, next);
        }
      } else {
        return Observable.throw(err);
      }
    }));
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.authService.refreshToken()
        .pipe(switchMap((newToken: string) => {
          if (newToken) {
            this.tokenSubject.next(newToken);
            return next.handle(this.addToken(req, newToken));
          }

          // If we don't get a new token, we are in trouble so logout.
          return this.logoutUser();
        }),
          catchError(error => {
            // If there is an exception calling 'refreshToken', bad news so logout.
            return this.logoutUser();
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          }));
    } else {
      return this.tokenSubject
        .pipe(
          filter(token => token != null),
          take(1),
          switchMap(token => {
            return next.handle(this.addToken(req, token));
          })
        );
    }
  }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return this.logoutUser();
    }
    return Observable.throw(error);
  }

  logoutUser() {
    // Route to the login page (implementation up to you)
    return Observable.throw('');
  }
}
