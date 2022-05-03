import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import * as AuthActions from './auth.action';
import { HttpClient } from '@angular/common/http';
import {
  IAuthLoginResponseData,
  IAuthSignupResponseData,
} from '../auth.service';
import { environment } from '../../../environments/environment';
import { ObservableInput, of, OperatorFunction, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

const handleAuthentication = (
  expiresIn: number,
  email: string,
  token: string,
  id: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const newUser = new User(email, id, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(newUser));
  return new AuthActions.AuthenticateSuccess({
    useremail: email,
    id: id,
    _token: token,
    _expiryTime: expirationDate,
    redirect: true
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'Unknown error occurred';

  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthFailure(errorMessage));
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
  return of(new AuthActions.AuthFailure(errorMessage));
};

@Injectable()
export class AuthEffects {
  // @Effect()
  // autheLogin$ = this.actions$.pipe(
  //   ofType(AuthActions.LOGIN_START),
  //   switchMap((authData: AuthActions.LoginStartAction) => {
  //     return this.httpClient
  //       .post<IAuthLoginResponseData>(
  //         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
  //           environment.backendApiKey,
  //         {
  //           email: authData.payload.email,
  //           password: authData.payload.password,
  //           returnSecureToken: true,
  //         }
  //       )
  //       .pipe(
  //         map((rd: IAuthLoginResponseData) => {
  //           const expirationDate = new Date(
  //             new Date().getTime() + +rd.expiresIn * 1000
  //           );
  //           return of(
  //             new AuthActions.LoginAction({
  //               useremail: rd.email,
  //               id: rd.localId,
  //               _token: rd.idToken,
  //               _expiryTime: expirationDate,
  //             })
  //           );
  //         }),
  //         catchError((error) => {
  //           return of(new );
  //         })
  //       );
  //   })
  // );

  authLogin = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStartAction) => {
          //console.log(authData);
          return this.httpClient
            .post<IAuthLoginResponseData>(
              'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.backendApiKey,
              {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true,
              }
            )
            .pipe(
              tap((rq: IAuthLoginResponseData) => {
                this.authService.setLogoutTimer(+rq.expiresIn * 1000);
              }),
              map((rd: IAuthLoginResponseData) => {
                return handleAuthentication(
                  +rd.expiresIn,
                  rd.email,
                  rd.idToken,
                  rd.localId
                );
              }),
              catchError((errorRes) => handleError(errorRes))
            );
        })
      )
    // {
    //   dispatch: true,
    //   useEffectsErrorHandler: true,
    // }
  );

  signup = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart) => {
        return this.httpClient
          .post<IAuthSignupResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            environment.backendApiKey,
            {
              email: signupAction.payload.email,
              password: signupAction.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((rq: IAuthLoginResponseData) => {
              this.authService.setLogoutTimer(+rq.expiresIn * 1000);
            }),
            map((rd: IAuthLoginResponseData) => {
              return handleAuthentication(
                +rd.expiresIn,
                rd.email,
                rd.idToken,
                rd.localId
              );
            }),
            catchError((errorRes) => handleError(errorRes))
          );
      })
    );
  });

  authRedirect = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.AUTH_SUCCESS),
        tap(authSuccessAction => {
          if (authSuccessAction.payload.redirect) {

            this.router.navigate(['/recipes']);
          }
        })
      );
    },
    { dispatch: false }
  );

  autoLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const user: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!user) {
          return { type: 'Dummy' };
        }

        const loadedUser = new User(
          user.email,
          user.id,
          user._token,
          new Date(user._tokenExpirationDate)
        );

        if (loadedUser.token) {
          const expiration =
            new Date(user._tokenExpirationDate).getTime() -
            new Date().getTime();

          this.authService.setLogoutTimer(expiration);
          return new AuthActions.AuthenticateSuccess({
            useremail: loadedUser.email,
            id: loadedUser.id,
            _token: loadedUser.token,
            _expiryTime: new Date(user._tokenExpirationDate),
            redirect: false
          });
          //this.user.next(loadedUser);
          //this.autoLogout(expiration);
        }
        return { type: 'Dummy' };
      })
    );
  });

  autoLogout = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.authService.clearLogOutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      );
    },
    {
      dispatch: false,
    }
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }
}
