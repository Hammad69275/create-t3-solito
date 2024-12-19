import base from '@acme/tailwind-config/base';
import React from 'react';
import type { TextInputProps } from 'react-native';
import { TextInput } from 'react-native';

export const Input: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor={base.theme.extend.colors.inputPlaceholder}
      className="mb-4 w-full rounded-lg bg-secondary-800 px-4 py-3 text-white"
    />
  );
};
