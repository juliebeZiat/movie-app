import { DarkTheme } from "@react-navigation/native";
import { color } from "..";

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: color.dark,
    text: color.light,
    border: '#1B1B1B'
  }
}