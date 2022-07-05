import React, { FC, useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import {
  View,
  Text,
  Button,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import Input from '../components/Input';

import { Nav } from '../type/Nav';

import useValidateEmail from '../hooks/useValidateEmail';
import useValidatePassword from '../hooks/useValidatePassword';

import { setToken, loginSubmit } from '../state/reducer/auth.reducer';
import authService from '../services/authService';


const Home: FC = () => {
  const { navigate } = useNavigation<Nav>();
  const dispatch = useDispatch();
  
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const errorEmail = useValidateEmail(userEmail);
  const errorPassword = useValidatePassword(userPassword);
  
  const handleSignin = useCallback (async () => {
    setIsLoading(true);
    if (errorEmail && errorPassword) {
      setIsLoading(false);
    }
    setSubmitted(true);
    const result = await authService.loginPost({email: userEmail, password: userPassword});
    if (result) {
      dispatch(loginSubmit(result.access_token));
      dispatch(setToken(result.access_token));
    }
    setIsLoading(false);
    return result;  
  }, [{email: userEmail, password: userPassword}]);


  return (
    <View style={{ flex: 1, justifyContent: 'space-evenly', width: 350, margin: 15 }}>
      <Text style={{ fontSize: 50, fontWeight: 'bold'}}>Authentication</Text>
      <Text style={{ fontSize: 25 }}>Login or register into your favorite movie app build for azot.dev technical test</Text>
      <SafeAreaView>
        <Input
          placeholder="Email"
          value={userEmail}
          onChangeText={setUserEmail}
          errorMessage={submitted ? errorEmail : undefined}
        />
        <Input
          placeholder="Password"
          value={userPassword}
          onChangeText={setUserPassword}
          secureTextEntry
          errorMessage={submitted ? errorPassword : undefined}
        />
      </SafeAreaView>
      <Pressable
        style={{ backgroundColor: '#030303', padding: 15, borderRadius: 15 }}
        onPress={handleSignin}
      >
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>Authenticate</Text>
      </Pressable>
      {isLoading && <ActivityIndicator />}
      <Pressable
        onPress={() => navigate('Signup')}
      >
        <Text style={{ textAlign: 'center', fontSize: 20 }}>Don't have an account yet ? Register here.</Text>
      </Pressable>
    </View>
  );
}

export default Home;
