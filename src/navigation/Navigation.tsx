import React, { FC } from 'react';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

import Signin from '../screens/SigninScreen';
import Home from '../screens/MoviesScreen';
import Signup from '../screens/SignupScreen';
import MovieDetail from '../screens/MovieDetailScreen';
import { LargeLogo, Logo } from '../styles/generalStyles/logo.style';
import { lightTheme } from '../styles/themes/light';
import { darkTheme } from '../styles/themes/dark';

export type RootStackParamList = {
  Home: undefined;
  Movie: { movieId: string };
  Signin: undefined;
  Signup: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: FC = () => {
  const isLogged = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { colors } = useTheme();

  return (
    <NavigationContainer theme={darkTheme}>
      <Stack.Navigator>
      {isLogged ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                header: () => (
                  <Logo />
                )
              }}
            />
            <Stack.Screen
              name="Movie"
              component={MovieDetail}
              options={{
                headerTransparent: true,
                headerTitle: '',
                headerTintColor: colors.text,
                headerBackTitle: '',
              }}
            />
          </>
      ) : (
          <>
            <Stack.Screen
              name="Signin"
              component={Signin}
              options={{
                header: () => (
                  <LargeLogo />
                )
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                header: () => (
                  <LargeLogo />
                )
              }}
            />
          </>
      )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
