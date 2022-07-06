import { useNavigation } from '@react-navigation/native';
import React, { FC, useState, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  Pressable,
} from 'react-native';

import Input from '../components/Input';

import useValidateEmail from '../hooks/useValidateEmail';
import useValidatePassword from '../hooks/useValidatePassword';
import { Nav } from '../type/Nav';

const Signin: FC = () => {
  const { navigate } = useNavigation<Nav>();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordRepeat, setUserPasswordRepeat] = useState('');
  const [errorPasswordRepeat, setErrorPasswordRepeat] = useState('');

  const [submitted, setSubmitted] = useState<boolean>(false);

  const errorEmail = useValidateEmail(userEmail);
  const errorPassword = useValidatePassword(userPassword);

  const handleSignup = useCallback (async () => {
    setSubmitted(true);
    if (userPassword !== userPasswordRepeat) {
      setErrorPasswordRepeat('Passwords must be same');
    }
    if ((!errorEmail) && (!errorPassword) && (userPassword === userPasswordRepeat)) {
      setErrorPasswordRepeat('');
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'space-evenly', width: 350, margin: 15 }}>
      <Text style={{ fontSize: 50, fontWeight: 'bold'}}>Register</Text>
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
        <Input
          placeholder="Repeat Password"
          value={userPasswordRepeat}
          onChangeText={setUserPasswordRepeat}
          secureTextEntry
          errorMessage={errorPasswordRepeat}
        />
      </SafeAreaView>
      <Pressable
        onPress={handleSignup}
        style={{ backgroundColor: '#030303', padding: 15, borderRadius: 15 }}
      >
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>Create a new account</Text>
      </Pressable>
      <Pressable onPress={() => navigate('Signin')}>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>Already have an account ? Login here</Text>
      </Pressable>
    </View>
  );
}

export default Signin;
