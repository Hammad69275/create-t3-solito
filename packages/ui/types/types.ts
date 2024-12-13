import type { User } from './trpc';

export interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: Exclude<User, undefined> | null;
}

export interface AuthDispatch {
  type: AuthActions;
  payload?: boolean | Exclude<User, undefined>;
}

export enum AuthActions {
  LOGOUT = 'LOGOUT',
  SET_USER = 'SET_USER',
  SET_LOADING = 'SET_LOADING'
}
