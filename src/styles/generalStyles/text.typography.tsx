import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text as TextNative, TextProps } from 'react-native';
import { color, font, margin } from '../index';

interface TextTypography extends TextProps {
  children: string | number
}

const Text = ({style, ...props}: TextTypography) => {
  const { colors } = useTheme();
  return (
    <TextNative {...props} style={[{ fontSize: font.md, color: colors.text }, style]} />
  )
};

const Title = ({style, ...props}: TextTypography) => (
  <Text {...props} style={[{ fontSize: font.xxlg, fontWeight: 'bold' }, style]} />
);

const Subtitle = ({style, ...props}: TextTypography) => (
  <Text {...props} style={[{ fontSize: font.xlg, fontWeight: 'bold' }, style]} />
);

const Caption = ({style, ...props}: TextTypography) => (
  <Text {...props} style={[{ fontSize: font.sm }, style]} />
);

const LargeText = ({style, ...props}: TextTypography) => (
  <Text {...props} style={[{ fontSize: font.lg }, style]} />
);

const Error = ({style, ...props}: TextTypography) => (
  <Text {...props} style={[{ fontSize: font.sm, color: color.primary, marginLeft: margin.sm }, style]} />
);


const TextTypography = {
  Text,
  Title,
  Subtitle,
  Caption,
  LargeText,
  Error,
}

export default TextTypography;