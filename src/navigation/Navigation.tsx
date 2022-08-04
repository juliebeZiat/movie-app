import "react-native-gesture-handler";
import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

import Signin from "../screens/Signin/SigninScreen";
import Signup from "../screens/Signup/SignupScreen";
import MovieDetail from "../screens/MovieDetails/MovieDetailScreen";
import UserList from "../screens/UserList/UserListScreen";
import Settings from "../screens/Settings/SettingsScreen";
import Movies from "../screens/Movies/MoviesScreen";

import { NavMovieDetail, NavStyleLogout } from "./components/CustomHeaders";
import { color } from "../styles";
import { useAppTheme } from "../hooks/useAppTheme";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  CogIcon,
  HeartIcon,
  HomeIcon,
  LoginIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import CustomDrawerContent from "./components/CustomDrawerContent";

export type RootStackParamList = {
  Home: undefined;
  Movie: { movieId: string };
  Login: undefined;
  Register: undefined;
  Settings: undefined;
  Root: undefined;
  "My List": undefined;
};

const Drawer = createDrawerNavigator();

const Navigation: FC = () => {
  const isLogged = useSelector((state: RootState) => state.auth.isLoggedIn);

  const { theme, isDarkTheme, scheme, isSystemThemeEnabled } = useAppTheme();

  return (
    <>
      <StatusBar
        style={
          isDarkTheme || (isSystemThemeEnabled && scheme === "dark")
            ? "light"
            : "dark"
        }
      />
      <NavigationContainer theme={theme}>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <>
            <Drawer.Screen
              navigationKey={isLogged ? "user" : "guest"}
              name="Home"
              component={Movies}
              options={{
                headerTransparent: true,
                headerTitle: "",
                drawerIcon: ({ focused }) => (
                  <HomeIcon color={focused ? color.purple : "lightgrey"} />
                ),
                headerTintColor:
                  isDarkTheme || (isSystemThemeEnabled && scheme === "dark")
                    ? color.light
                    : color.dark,
              }}
            />
            <Drawer.Screen
              navigationKey={isLogged ? "user" : "guest"}
              name="Movie"
              component={MovieDetail}
              options={{
                drawerItemStyle: { height: 0 },
                headerTransparent: true,
                header: () => <NavMovieDetail />,
              }}
            />
          </>
          {isLogged ? (
            <>
              <Drawer.Screen
                name="My List"
                component={UserList}
                options={{
                  headerTransparent: true,
                  headerTitle: "",
                  drawerIcon: ({ focused }) => (
                    <HeartIcon color={focused ? color.purple : "lightgrey"} />
                  ),
                  headerTintColor:
                    isDarkTheme || (isSystemThemeEnabled && scheme === "dark")
                      ? color.light
                      : color.dark,
                }}
              />
              <Drawer.Screen
                name="Settings"
                component={Settings}
                options={{
                  headerTransparent: true,
                  headerTitle: "",
                  drawerIcon: ({ focused }) => (
                    <CogIcon color={focused ? color.purple : "lightgrey"} />
                  ),
                  headerTintColor:
                    isDarkTheme || (isSystemThemeEnabled && scheme === "dark")
                      ? color.light
                      : color.dark,
                }}
              />
            </>
          ) : (
            <>
              <Drawer.Screen
                name="Login"
                component={Signin}
                options={{
                  drawerIcon: ({ focused }) => (
                    <LoginIcon color={focused ? color.purple : "lightgrey"} />
                  ),
                  header: () => <NavStyleLogout />,
                }}
              />
              <Drawer.Screen
                name="Register"
                component={Signup}
                options={{
                  drawerIcon: ({ focused }) => (
                    <UserIcon color={focused ? color.purple : "lightgrey"} />
                  ),
                  header: () => <NavStyleLogout />,
                }}
              />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
