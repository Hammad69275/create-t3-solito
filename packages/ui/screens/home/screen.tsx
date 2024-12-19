import { Text, View } from 'react-native';

import { Button } from '../../components/button';
import Protected from '../../components/protected';
import { useAuth } from '../../hooks/useAuth';

const ProfileScreen = () => {
  const { logout, state } = useAuth();

  return (
    <View className="flex h-screen flex-1 items-center justify-center bg-secondary-900">
      <Text className="mb-6 text-4xl font-bold text-white">Profile</Text>

      <View className="w-4/5 max-w-md">
        <Text className="mb-4 text-lg font-medium text-secondary-400">
          Name: <Text className="text-white">{state.user?.name}</Text>
        </Text>
        <Text className="mb-4 text-lg font-medium text-secondary-400">
          Email: <Text className="text-white">{state.user?.email}</Text>
        </Text>
        <Button onClick={logout} type="DANGEROUS">
          Logout
        </Button>
      </View>
    </View>
  );
};

export default Protected(ProfileScreen);
