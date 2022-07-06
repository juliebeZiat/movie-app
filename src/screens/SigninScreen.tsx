import React, { FC, useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import Input from '../components/Input';

import { Nav } from '../type/Nav';

import useValidateEmail from '../hooks/useValidateEmail';
import useValidatePassword from '../hooks/useValidatePassword';

import { login } from '../state/reducer/auth.reducer';
import authService from '../services/authService';
import { TextTypography } from '../components/typography/text.typography';
import { ButtonTypography } from '../components/typography/buttons.typography';


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
      dispatch(login(result.access_token));
    }
    setIsLoading(false);
    return result;  
  }, [{email: userEmail, password: userPassword}]);


  return (
    <View style={{ flex: 1, justifyContent: 'space-evenly', width: 350, margin: 15 }}>
      <TextTypography.Title>Authentication</TextTypography.Title>
      <TextTypography.LargeText>Login or register into your favorite movie app build for azot.dev technical test</TextTypography.LargeText>
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

      <ButtonTypography.Large onPress={handleSignin}>
        <Text>Authenticate</Text>
      </ButtonTypography.Large>

      {isLoading && <ActivityIndicator />}

      <ButtonTypography
        onPress={() => navigate('Signup')}
      >
        <Text>Don't have an account yet ? Register here.</Text>
      </ButtonTypography>
    </View>
  );
}

export default Home;
