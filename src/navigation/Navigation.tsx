import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from '../screens/Signin';
import Home from '../screens/Home';
import Signup from '../screens/Signup';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

export type RootStackParamList = {
  Home: undefined;
  Signin: undefined;
  Signup: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: FC = () => {
  const isLogged = useSelector((state: RootState) => state.auth.isLoggedIn);
  console.log(isLogged);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {isLogged ? (
          <Stack.Screen name="Home" component={Home} />
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
