import "react-native-gesture-handler";
import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

import Signin from "../screens/SigninScreen";
import Home from "../screens/MoviesScreen";
import Signup from "../screens/SignupScreen";
import MovieDetail from "../screens/MovieDetailScreen";
import Settings from "../screens/SettingsScreen";

import { NavMovieDetail, NavStyleLogout } from "../styles/generalStyles/nav.style";
import { color } from "../styles";
import { useAppTheme } from "../hooks/useAppTheme";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserList from "../screens/UserList";
import { CogIcon, HeartIcon, HomeIcon, LoginIcon, UserIcon } from "react-native-heroicons/outline";

export type RootStackParamList = {
  Home: undefined;
  Movie: { movieId: string };
  Login: undefined;
  Register: undefined;
  Settings: undefined;
  Root: undefined;
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
        <Drawer.Navigator>
        <Drawer.Screen 
            navigationKey={isLogged ? "user" : "guest"}
            name="Home"
            component={Home}
            options={{
              headerTransparent: true,
              headerTitle: "",
              drawerIcon: ({focused}) => (
                <HomeIcon color={focused ? color.purple : "lightgrey" }/>
              ),
              headerTintColor:
                isDarkTheme || (isSystemThemeEnabled && scheme === "dark")
                  ? color.light
                  : color.dark,
            }}
          />
          {isLogged ? (
            <>
              <Drawer.Screen
                name="My List"
                component={UserList}
                options={{
                  headerTransparent: true,
                  headerTitle: "",
                  drawerIcon: ({focused}) => (
                    <HeartIcon color={focused ? color.purple : "lightgrey" }/>
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
                  drawerIcon: ({focused}) => (
                    <CogIcon color={focused ? color.purple : "lightgrey" }/>
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
                  drawerIcon: ({focused}) => (
                    <LoginIcon color={focused ? color.purple : "lightgrey" }/>
                  ),
                  header: () => <NavStyleLogout />,
                }}
              />
              <Drawer.Screen
                name="Register"
                component={Signup}
                options={{
                  drawerIcon: ({focused}) => (
                    <UserIcon color={focused ? color.purple : "lightgrey" }/>
                  ),
                  header: () => <NavStyleLogout />,
                }}
              />
            </>
          )}
          <Drawer.Screen
            navigationKey={isLogged ? "user" : "guest"}
            name="Movie"
            component={MovieDetail}
            options={{
              drawerItemStyle: { height: 0 },
              headerTransparent: true,
              header: () => <NavMovieDetail />
            }}
          />
          
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
