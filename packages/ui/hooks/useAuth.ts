import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'solito/router';

import { useAuthState } from '../context/AuthContext';
import type { User } from '../types/trpc';
import { AuthActions } from '../types/types';
import { client } from '../utils/trpc';

export const useAuth = () => {
  const { state, dispatch } = useAuthState();
  const router = useRouter();

  const initializeAuth = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    if (!token) return setLoading(false);
    const user = await client.users.me.query();
    setUser(user);
  };

  const setUser = (user: User) => {
    if (!user) return;
    dispatch({
      type: AuthActions.SET_USER,
      payload: user
    });
  };

  const setLoading = (isLoading: boolean) => {
    dispatch({
      type: AuthActions.SET_LOADING,
      payload: isLoading
    });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    router.push('/login');
    dispatch({
      type: AuthActions.LOGOUT
    });
  };

  return {
    state,
    setUser,
    setLoading,
    logout,
    initializeAuth
  };
};
