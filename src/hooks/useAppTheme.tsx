import { useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, themeSelector } from "../state/reducer/app.reducer";
import { darkTheme } from "../styles/themes/dark";
import { lightTheme } from "../styles/themes/light";

export const useAppTheme = () => {
  const scheme = useColorScheme();
  const theme = useSelector(themeSelector);

  const dispatch = useDispatch();

  const toggleTheme = () => {
    if (theme === "SYSTEM") {
      return
    }
    dispatch(setTheme(theme === "LIGHT" ? "DARK" : "LIGHT"));
  };

  const toggleSystemTheme = () => {
    dispatch(setTheme(theme === "SYSTEM" ? "LIGHT" : "SYSTEM"));
  };

  const getTheme = () => {
    if (theme === "SYSTEM") {
      return scheme === "dark" ? darkTheme : lightTheme;
    }
    return theme === "LIGHT" ? lightTheme : darkTheme;
  }

  return {
    toggleTheme,
    toggleSystemTheme,
    scheme,
    theme: getTheme(),
    isSystemThemeEnabled: theme === "SYSTEM",
    isDarkTheme: theme === "DARK",
  };
}