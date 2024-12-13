import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'solito/router';

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
    <View className="flex h-screen flex-1 items-center justify-center bg-gray-900">
      <Text className="mb-6 text-4xl font-bold text-white">Register</Text>

      <View className="w-4/5 max-w-md">
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="#6B7280"
          className="mb-4 w-full rounded-lg bg-gray-800 px-4 py-3 text-white"
        />

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#6B7280"
          keyboardType="email-address"
          className="mb-4 w-full rounded-lg bg-gray-800 px-4 py-3 text-white"
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#6B7280"
          secureTextEntry
          className="mb-4 w-full rounded-lg bg-gray-800 px-4 py-3 text-white"
        />

        {/* Register Button */}
        <TouchableOpacity
          onPress={handleRegister}
          className="mb-4 w-full rounded-lg bg-blue-600 py-3"
          activeOpacity={0.8}
        >
          <Text className="text-center text-lg font-semibold text-white">
            Register
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => router.push('/login')} className="mt-4">
        <Text className="text-center text-white">
          Already have an account? Login here.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
