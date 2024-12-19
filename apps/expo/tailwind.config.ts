import type { Config } from 'tailwindcss';
// @ts-expect-error - no types
import nativewind from 'nativewind/preset';

import baseConfig from '@acme/tailwind-config/native';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/ui/**/*.{ts,tsx}',
    '!../../packages/ui/node_modules'
  ],
  presets: [baseConfig, nativewind]
} satisfies Config;
