import { AuthContextProvider } from '../context/AuthContext';
import Toast from '../helpers/toast/toast';
import { AuthProvider } from './authProvider';
import { SafeArea } from './safe-area';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <SafeArea>
        <AuthProvider>
          {children}
          <Toast.ToastContainer />
        </AuthProvider>
      </SafeArea>
    </AuthContextProvider>
  );
}
