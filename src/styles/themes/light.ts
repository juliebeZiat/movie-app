import { DefaultTheme } from "@react-navigation/native";
import { color } from "..";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: color.primary,
    background: color.light,
    text: color.dark,
    border: 'white',
  }
}