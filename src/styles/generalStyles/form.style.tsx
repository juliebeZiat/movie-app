import { useTheme } from "@react-navigation/native";
import React from "react";
import { TextInput } from "react-native";
import { dimensions, margin, padding } from "..";

export const TextInputStyle = ({ style, ...props }: any) => {
  const { colors } = useTheme();
  return (
    <TextInput
      {...props}
      placeholderTextColor= 'darkgrey'
      style={[
        {
          height: 55,
          width: dimensions.fullWidth-80,
          padding: padding.sm,
          marginVertical: margin.tiny,
          borderRadius: 10,
          fontSize: 25,
          backgroundColor: colors.border,
          color: colors.text,
        },
        style,
      ]}
    />
  ) 
};
