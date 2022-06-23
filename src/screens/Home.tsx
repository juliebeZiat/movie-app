import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import {
  View,
  Text,
  Button,
  SafeAreaView,
} from 'react-native';

import Input from '../components/Input';
import Submit from '../components/Submit';

import { Nav } from '../type/Nav';

import useValidateEmail from '../hooks/useValidateEmail';
import useValidatePassword from '../hooks/useValidatePassword';

import { loginSubmit } from '../state/slices/authSlice';
import axios from 'axios';

const Home: FC = () => {
  const { navigate } = useNavigation<Nav>();
  const dispatch = useDispatch();
  
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  
  const [submitted, setSubmitted] = useState<boolean>(false);

  const errorEmail = useValidateEmail(userEmail);
  const errorPassword = useValidatePassword(userPassword);

  const handleLogin = () => {
    const loginPost = async () => {
      try {
        const response = await axios.post('/auth', {email: userEmail, password: userPassword});
        dispatch(loginSubmit());

      } catch (error) {
        setSubmitted(true);
      }
    };
    return loginPost();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Authentication</Text>
      <Text>Login or register into your favorite movie app build for azot.dev technical test</Text>
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
      <Submit text="Authenticate" onPress={handleLogin} />
      <Button
        title="Don't have an account yet ? Register here."
        onPress={() => navigate('Signin')}
      />
    </View>
  );
}

export default Home;
