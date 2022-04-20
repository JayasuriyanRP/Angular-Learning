import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface IAuthSignupResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

interface IAuthLoginResponseData extends IAuthSignupResponseData {
  registered: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  signUp(userEmail: string, password: string) {
    return this.httpClient
      .post<IAuthSignupResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.backendApiKey,
        {
          email: userEmail,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          );
        })
      );
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
    this.tokenTimer = null;
  }
  autoLogout(expirationTime: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, expirationTime);
  }

  autoLogin() {
    const user: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!user) {
      return;
    }

    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );

    if (loadedUser.token) {
      const expiration =
        new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
      this.user.next(loadedUser);
      this.autoLogout(expiration);
    }
  }

  private handleAuthentication(
    userEmail: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(userEmail, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logIn(userEmail: string, password: string) {
    return this.httpClient
      .post<IAuthLoginResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.backendApiKey,
        {
          email: userEmail,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          );
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'This Operation is not allowed';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many attempts try later';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email is not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password does not match';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This user is diabled';
        break;
    }
    return throwError(errorMessage);
  }
}
