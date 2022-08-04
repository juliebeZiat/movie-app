import { DarkTheme } from "@react-navigation/native";
import { color } from "..";

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: color.purple,
    background: "black",
    text: color.light,
    border: '#1B1B1B',
    notification: '#777777',
  }
}