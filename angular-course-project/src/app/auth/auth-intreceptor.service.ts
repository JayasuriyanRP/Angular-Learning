import { Store } from '@ngrx/store';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, map, take } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => authState?.user),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const newRequest = req.clone({
          params: req.params.append('auth', user.token),
        });

        return next.handle(newRequest);
      })
    );
  }
}
