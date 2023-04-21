import {createReducer, on} from "@ngrx/store";
import {AuthState, initialState} from "./auth.state";
import {autoLogout, loginSuccess, signupSuccess} from './auth.actions'
import {User} from "../../models/user.model";

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state: AuthState, action:  {user: User | null}): {user: User | null} => {
    return {
      ...state,
      user: action.user,
    }
  }),
  on(signupSuccess, (state:AuthState, action: {user: User}): {user: User} => {
    return {
      ...state,
      user: action.user,
    }
  }),
  on(autoLogout, (state: AuthState) => {
    return {
      ...state,
      user: null,
    }
  }),
);

export function AuthReducer(state: AuthState | any, action: User | any){
  return _authReducer(state, action);
}
