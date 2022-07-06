import React, { FC } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

import Signin from '../screens/SigninScreen';
import Home from '../screens/MoviesScreen';
import Signup from '../screens/SignupScreen';
import MovieDetail from '../screens/MovieDetailScreen';
import { Text, View } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Movie: { movieId: string };
  Signin: undefined;
  Signup: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = DefaultTheme;
navTheme.colors.background = '#FBF9FF';



const Navigation: FC = () => {
  const isLogged = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
      {isLogged ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                header: () => (
                  <View style={{ height: 80, padding: 10, backgroundColor: '#FBF9FF', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', paddingTop: 30, paddingLeft: 15 }}>Logo</Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', paddingTop: 30, paddingLeft: 15, color: 'red' }}>.</Text>
                  </View>
                )
              }}
            />
            <Stack.Screen
              name="Movie"
              component={MovieDetail}
              options={{
                headerTransparent: true,
                headerTitle: '',
                headerTintColor: 'black',
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
                  <View style={{ height: 80, padding: 10, backgroundColor: '#FBF9FF', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', paddingTop: 20 }}>Logo</Text>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', paddingTop: 20, color: 'red' }}>.</Text>
                  </View>
                )
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                header: () => (
                  <View style={{ height: 80, padding: 10, backgroundColor: '#FBF9FF', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', paddingTop: 20 }}>Logo</Text>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', paddingTop: 20, color: 'red' }}>.</Text>
                  </View>
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
