import { useTheme } from '@react-navigation/native';
import React from 'react';
import { PressableProps } from 'react-native';
import { Pressable, Text, TextProps } from 'react-native';
import { font, padding, radius } from '..';

interface ButtonTypography extends PressableProps {
  children: never[],
}

interface ButtonTextTypography extends TextProps {
  children: Element,
}

export const ButtonTypography = ({ style, ...props }: ButtonTextTypography, { onPress }: ButtonTypography) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
    >
      <Text
        {...props}
        style={[{
          textAlign: "center",
          fontSize: font.md,
          color: colors.text,
        }, style]}
      />
    </Pressable>
  )
};

ButtonTypography.Small = ({ style, ...props }: ButtonTextTypography, { onPress }: ButtonTypography) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[{ width: 120, padding: padding.tiny, borderRadius: radius.xlg }, style]}
    >
      <Text
        {...props}
        style={[{
          color: colors.text,
          fontSize: font.md,
          fontWeight: 'bold',
          textAlign: 'center',
        }, style]} />
    </Pressable>
  )
}

ButtonTypography.Large = ({ style, ...props }: ButtonTextTypography, { onPress }: ButtonTypography) => {
  const { colors } = useTheme();
  return (
    <Pressable
      style={[{ backgroundColor: colors.text, padding: padding.sm, borderRadius: radius.lg }, style]}
      onPress={onPress}
    >
      <Text
        {...props}
        style={[{
          color: colors.background,
          fontSize: font.lg,
          fontWeight: "bold",
          textAlign: "center",
          width: 300,
        }, style]}
      />
    </Pressable>
  )
};