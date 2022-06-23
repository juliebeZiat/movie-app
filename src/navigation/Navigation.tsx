import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Welcome from '../screens/Welcome';
import Signin from '../screens/Signin';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

export type RootStackParamList = {
  Home: undefined;
  Welcome: undefined;
  Signin: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: FC = () => {
  const isLogged = useSelector((state: RootState) => state.auth.logged);
  console.log(isLogged);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {isLogged ? (
          <Stack.Screen name="Welcome" component={Welcome} />
      ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Signin" component={Signin} />
          </>
      )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
