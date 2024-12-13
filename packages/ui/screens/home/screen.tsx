import { Text, TouchableOpacity, View } from 'react-native';

import Protected from '../../components/protected';
import { useAuth } from '../../hooks/useAuth';

const ProfileScreen = () => {
  const { logout, state } = useAuth();

  return (
    <View className="flex h-screen flex-1 items-center justify-center bg-gray-900">
      <Text className="mb-6 text-4xl font-bold text-white">Profile</Text>

      <View className="w-4/5 max-w-md">
        <Text className="mb-4 text-lg font-medium text-gray-400">
          Name: <Text className="text-white">{state.user?.name}</Text>
        </Text>
        <Text className="mb-4 text-lg font-medium text-gray-400">
          Email: <Text className="text-white">{state.user?.email}</Text>
        </Text>
      </View>

      <TouchableOpacity
        onPress={logout}
        className="mt-6 w-4/5 max-w-md rounded bg-red-600 py-3 text-center"
      >
        <Text className="text-center text-lg font-bold text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Protected(ProfileScreen);
