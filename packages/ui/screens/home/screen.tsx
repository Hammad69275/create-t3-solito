import { Text, View } from 'react-native';

import { Button } from '../../components/button';
import Protected from '../../components/protected';
import { useAuth } from '../../hooks/useAuth';

const ProfileScreen = () => {
  const { logout, state } = useAuth();

  return (
    <View className="bg-secondary-900 flex h-screen flex-1 items-center justify-center">
      <Text className="mb-6 text-4xl font-bold text-white">Profile</Text>

      <View className="w-4/5 max-w-md">
        <Text className="text-secondary-400 mb-4 text-lg font-medium">
          Name: <Text className="text-white">{state.user?.name}</Text>
        </Text>
        <Text className="text-secondary-400 mb-4 text-lg font-medium">
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
