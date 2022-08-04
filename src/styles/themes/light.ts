import { DefaultTheme } from "@react-navigation/native";
import { color } from "..";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: color.purple,
    background: "white",
    text: color.dark,
    border: 'white',
    notification: 'darkgrey',
  }
}