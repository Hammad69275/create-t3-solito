import type { Dispatch, PropsWithChildren } from 'react';
import { createContext, useContext, useReducer } from 'react';

import type { AuthDispatch, AuthState } from '../types/types';
import { authReducer } from './reducers/AuthReducer';

interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthDispatch>;
}

const AuthContext = createContext<AuthContextType>({
  state: {
    user: null,
    isLoading: true,
    isLoggedIn: false
  },
  dispatch: () => {}
});

export const useAuthState = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
    isLoggedIn: false
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
