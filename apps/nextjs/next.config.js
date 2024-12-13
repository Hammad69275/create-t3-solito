import { withExpo } from '@expo/next-adapter';

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    'expo-router',
    'react-native',
    'react-native-web',
    'solito',
    'moti',
    '@packages/ui',
    'react-native-reanimated',
    'react-native-svg',
    'nativewind',
    'react-native-gesture-handler',
    'react-native-css-interop'
  ]
};

export default withExpo(config);
