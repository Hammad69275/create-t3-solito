import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'solito/router';

import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { useAuth } from '../../hooks/useAuth';
import { client } from '../../utils/trpc';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { initializeAuth } = useAuth();

  const handleRegister = () => {
    client.auth.register
      .mutate({
        name,
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
  return (
    <View className="flex h-screen flex-1 items-center justify-center bg-secondary-900">
      <Text className="mb-6 text-4xl font-bold text-white">Register</Text>

      <View className="w-4/5 max-w-md">
        <Input value={name} onChangeText={setName} placeholder="Name" />
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <Button onClick={handleRegister} type="PRIMARY">
          Register
        </Button>
      </View>
      <Button type="TEXT" onClick={() => router.push('/login')}>
        Already have an account? Login here.
      </Button>
    </View>
  );
};

export default RegisterScreen;
