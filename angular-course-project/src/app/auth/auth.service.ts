import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.action';

export interface IAuthSignupResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface IAuthLoginResponseData extends IAuthSignupResponseData {
  registered: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenTimer: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  clearLogOutTimer() {
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
    this.tokenTimer = null;
  }

  setLogoutTimer(expirationTime: number) {
    this.tokenTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.LogoutAction());
    }, expirationTime);
  }
}
