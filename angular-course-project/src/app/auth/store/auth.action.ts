import { Action } from '@ngrx/store';

export const LOGIN_START = 'LOGIN_START';
export const SIGNUP_START = 'SIGNUP_START';
export const AUTH_FAIL = 'LOGIN_FAIL';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const AUTO_LOGOUT = 'AUTO_LOGOUT';
export const AUTH_SUCCESS = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class AuthenticateSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(
    public payload: {
      useremail: string;
      id: string;
      _token: string;
      _expiryTime: Date;
    }
  ) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;
  payload = null;
}

export class LoginStartAction implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthFailure implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload: string) {}
}

export class AutoLogin implements Action {
  readonly type: string = AUTO_LOGIN;
  payload = null;
}

export type Actions =
  | AuthenticateSuccess
  | LogoutAction
  | LoginStartAction
  | SignupStart
  | AuthFailure
  | AutoLogin;
