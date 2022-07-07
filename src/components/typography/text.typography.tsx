import React from 'react';
import { Text, TextProps } from 'react-native';

interface TextTypography extends TextProps {
  children: string
}

export const TextTypography = ({style, ...props}: TextTypography) => (
  <Text {...props} style={[{ fontSize: 20 }, style]} />
)

TextTypography.Title = ({style, ...props}: TextTypography) => (
  <TextTypography {...props} style={[{ fontSize: 50, fontWeight: 'bold' }, style]} />
)

TextTypography.Subtitle = ({style, ...props}: TextTypography) => (
  <TextTypography {...props} style={[{ fontSize: 30, fontWeight: 'bold' }, style]} />
)

TextTypography.Caption = ({style, ...props}: TextTypography) => (
  <TextTypography {...props} style={[{ fontSize: 15 }, style]} />
)

TextTypography.LargeText = ({style, ...props}: TextTypography) => (
  <TextTypography {...props} style={[{ fontSize: 25 }, style]} />
)