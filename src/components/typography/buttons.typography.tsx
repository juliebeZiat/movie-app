import React from 'react';
import { PressableProps } from 'react-native';
import { Pressable, Text, TextProps } from 'react-native';

interface ButtonTypography extends PressableProps {
  children: never[],
}

interface ButtonTextTypography extends TextProps {
  children: Element,
}

export const ButtonTypography = ({ style, ...props }: ButtonTextTypography, { onPress }: ButtonTypography) => (
  <Pressable
    onPress={onPress}
  >
    <Text
      {...props}
      style={[{
        textAlign: "center",
        fontSize: 20,
      }, style]}
    />
  </Pressable>
);

ButtonTypography.Small = ({ style, ...props }: ButtonTextTypography, { onPress }: ButtonTypography) => (
  <Pressable
    onPress={onPress}
    style={[{ width: 120, padding: 8, borderRadius: 18 }, style]}
  >
    <Text
      {...props}
      style={[{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
      }, style]} />
  </Pressable>
)

ButtonTypography.Large = ({ style, ...props }: ButtonTextTypography, { onPress }: ButtonTypography) => (
  <Pressable
    style={[{ backgroundColor: "#030303", padding: 15, borderRadius: 15 }, style]}
    onPress={onPress}
  >
    <Text
      {...props}
      style={[{
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
      }, style]}
    />
  </Pressable>
);