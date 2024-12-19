import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  type: 'PRIMARY' | 'SECONDARY' | 'DANGEROUS' | 'TEXT';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export const Button: React.FC<PropsWithChildren<Props>> = ({
  type,
  children,
  onClick,
  className
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      className={classNames(
        `mb-4 w-full rounded-lg py-3`,
        {
          'bg-primary-600 hover:bg-primary-700': type === 'PRIMARY',
          'bg-secondary-700 hover:bg-secondary-800': type === 'SECONDARY',
          'bg-red-600 hover:bg-red-700': type === 'DANGEROUS'
        },
        className
      )}
    >
      <Text
        className={classNames(`text-center font-semibold text-white`, {
          'text-lg': type !== 'TEXT'
        })}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
