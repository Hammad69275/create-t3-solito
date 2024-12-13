import type { User } from '../../types/trpc';
import type { AuthDispatch, AuthState } from '../../types/types';
import { AuthActions } from '../../types/types';

export const authReducer = (state: AuthState, action: AuthDispatch) => {
  switch (action.type) {
    case AuthActions.SET_USER:
      return {
        ...state,
        user: action.payload as Exclude<User, undefined>,
        isLoggedIn: true,
        isLoading: false
      };
    case AuthActions.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload as boolean
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false
      };
    default:
      return state;
  }
};
