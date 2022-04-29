import { User } from '../user.model';
import * as AuthActions from './auth.action';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initalState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = initalState,
  action: AuthActions.Actions
): State {
  switch (action.type) {
    case AuthActions.AUTH_SUCCESS:
      let newUser = new User(
        action.payload.useremail,
        action.payload.id,
        action.payload._token,
        action.payload._expiryTime
      );
      //console.log(newUser);
      return {
        ...state,
        user: newUser,
        authError: null,
        loading: false,
      };
    case AuthActions.LOGOUT:
      //console.log('On Logout', state);
      return {
        ...state,
        user: null,
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case AuthActions.AUTH_FAIL:
      return {
        ...state,
        authError: action.payload,
        user: null,
        loading: false,
      };
  }
}
