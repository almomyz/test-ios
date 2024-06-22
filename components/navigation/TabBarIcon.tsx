import React from 'react';
import { TextStyle } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialIcons';

type MaterialIconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle;
};

export function TabBarIcon({ name, size = 28, color, style, ...rest }: MaterialIconProps) {
  return <Icon name={name} size={size} color={color} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
