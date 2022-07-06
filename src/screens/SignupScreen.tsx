import { useNavigation } from '@react-navigation/native';
import React, { FC, useState, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
} from 'react-native';

import Input from '../components/Input';
import { ButtonTypography } from '../components/typography/buttons.typography';
import { TextTypography } from '../components/typography/text.typography';

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
      <TextTypography.Title>Register</TextTypography.Title>
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
        <Input
          placeholder="Repeat Password"
          value={userPasswordRepeat}
          onChangeText={setUserPasswordRepeat}
          secureTextEntry
          errorMessage={errorPasswordRepeat}
        />
      </SafeAreaView>

      <ButtonTypography.Large
        onPress={handleSignup}
      >
        <Text>Create a new account</Text>
      </ButtonTypography.Large>

      <ButtonTypography onPress={() => navigate('Signin')}>
        <Text>Already have an account ? Login here</Text>
      </ButtonTypography>
    </View>
  );
}

export default Signin;
