import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'solito/router';

import { useAuth } from '../hooks/useAuth';

const Protected = (Component: React.FC) => {
  const Protected: React.FC = (props) => {
    const { state } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!state.isLoading && !state.isLoggedIn) router.push('/login');
    }, [state.isLoggedIn, state.isLoading]);

    return !state.isLoading && state.isLoggedIn ? (
      <Component {...props} />
    ) : (
      <View className="flex h-screen w-screen items-center justify-center bg-gray-900">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  };
  return Protected;
};

export default Protected;
