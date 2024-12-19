import base from '@acme/tailwind-config/base';
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

export const Input: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor={base.theme.extend.colors.inputPlaceholder}
      className="bg-secondary-800 mb-4 w-full rounded-lg px-4 py-3 text-white"
    />
  );
};
