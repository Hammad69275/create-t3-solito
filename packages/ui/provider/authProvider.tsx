import { useEffect } from 'react';

import eventEmitter from '../helpers/eventEmitter';
import { useAuth } from '../hooks/useAuth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initializeAuth, logout } = useAuth();

  useEffect(() => {
    const handleLogout = () => logout();
    eventEmitter.addListener('logout', handleLogout);
    initializeAuth();

    return () => {
      eventEmitter.removeListener('logout', handleLogout);
    };
  }, []);

  return <>{children}</>;
}
