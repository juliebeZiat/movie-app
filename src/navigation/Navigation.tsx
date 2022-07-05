import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

import Signin from '../screens/SigninScreen';
import Home from '../screens/MoviesScreen';
import Signup from '../screens/SignupScreen';
import MovieDetail from '../screens/MovieDetailScreen';


export type RootStackParamList = {
  Home: undefined;
  Movie: { movieId: string};
  Signin: undefined;
  Signup: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: FC = () => {
  const isLogged = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {isLogged ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Movie" component={MovieDetail} />
          </>
      ) : (
          <>
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
      )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
