import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import Input from '../components/Input';
import Submit from '../components/Submit';
import { Nav } from '../type/Nav';
import useValidateEmail from '../hooks/useValidateEmail';
import useValidatePassword from '../hooks/useValidatePassword';

const Signin: FC = () => {
  const { navigate } = useNavigation<Nav>();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordRepeat, setUserPasswordRepeat] = useState('');

  const errorEmail = useValidateEmail(userEmail);
  const errorPassword = useValidatePassword(userPassword);

  const signinSubmit = () => {
    if ((!errorEmail) && (!errorPassword)) {
      navigate('Welcome');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Register</Text>
      <Text>Login or register into your favorite movie app build for azot.dev technical test</Text>
      <SafeAreaView>
        <Input
          placeholder="Email"
          value={userEmail}
          onChangeText={setUserEmail}
          errorMessage={errorEmail}
        />
        <Input
          placeholder="Password"
          value={userPassword}
          onChangeText={setUserPassword}
          secureTextEntry
          errorMessage={errorPassword}
        />
        <Input
          placeholder="Repeat Password"
          value={userPasswordRepeat}
          onChangeText={setUserPasswordRepeat}
          secureTextEntry
        />
      </SafeAreaView>
      <Submit text="Authenticate" onPress={signinSubmit} />
    </View>
  );
}

export default Signin;
