import "react-native-gesture-handler";
import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

import Signin from "../screens/SigninScreen";
import Home from "../screens/MoviesScreen";
import Signup from "../screens/SignupScreen";
import MovieDetail from "../screens/MovieDetailScreen";
import Settings from "../screens/SettingsScreen";

import { NavStyleLogin, NavStyleLogout } from "../styles/generalStyles/nav.style";
import { color } from "../styles";
import { useAppTheme } from "../hooks/useAppTheme";
import { StatusBar } from "expo-status-bar";

export type RootStackParamList = {
  Home: undefined;
  Movie: { movieId: string };
  Signin: undefined;
  Signup: undefined;
  Settings: undefined;
  Root: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: FC = () => {  
  const isLogged = useSelector((state: RootState) => state.auth.isLoggedIn);

  const { theme, isDarkTheme, scheme, isSystemThemeEnabled } = useAppTheme();
  
  return (
    <>
      <StatusBar style={isDarkTheme || (isSystemThemeEnabled && scheme === 'dark') ? "light" : "dark"} />
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          {isLogged ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  header: () => <NavStyleLogin />,
                }}
              />
              <Stack.Screen
                name="Movie"
                component={MovieDetail}
                options={{
                  headerTransparent: true,
                  headerTitle: "",
                  headerTintColor: isDarkTheme || (isSystemThemeEnabled && scheme === 'dark') ? color.light : color.dark,
                  headerBackTitle: "",
                }}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                  headerTransparent: true,
                  headerTitle: "",
                  headerTintColor: isDarkTheme || (isSystemThemeEnabled && scheme === 'dark') ? color.light : color.dark,
                  headerBackTitle: "",
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Signin"
                component={Signin}
                options={{
                  header: () => <NavStyleLogout />,
                }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{
                  header: () => <NavStyleLogout />,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
