import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'solito/router';

import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { useAuth } from '../../hooks/useAuth';
import { client } from '../../utils/trpc';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { initializeAuth } = useAuth();

  const handleLogin = () => {
    client.auth.login
      .mutate({
        email,
        password
      })
      .then(async ({ accessToken }) => {
        AsyncStorage.setItem('token', accessToken);
        await initializeAuth();
        router.push('/');
      })
      .catch(() => {});
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <View className="flex h-screen flex-1 items-center justify-center bg-secondary-900">
      <Text className="mb-6 text-4xl font-bold text-white">Login</Text>
      <View className="w-4/5 max-w-md">
        <Input value={email} onChangeText={setEmail} placeholder="email" />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <Button className="mt-2" type="PRIMARY" onClick={handleLogin}>
          Login
        </Button>
        <Button onClick={handleRegister} type="SECONDARY">
          Register
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;
