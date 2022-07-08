import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { View } from 'react-native';
import { color, padding } from '..';
import TextTypography from './text.typography';

export const Logo: FC = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <TextTypography.Subtitle style={{ paddingTop: padding.xlg, paddingLeft: 15 }}>Logo</TextTypography.Subtitle>
      <TextTypography.Subtitle style={{ paddingTop: padding.xlg, color: color.primary }}> .</TextTypography.Subtitle>
    </View>
  )
};

export const LargeLogo = () => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: padding.md }}>
      <TextTypography.Title>Logo</TextTypography.Title>
      <TextTypography.Title style={{ color: color.primary }}> .</TextTypography.Title>
    </View>
  )
};
