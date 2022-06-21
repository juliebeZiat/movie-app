import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import Input from '../components/Input';
import Submit from '../components/Submit';

function Signin() {
  const { navigate } = useNavigation();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordRepeat, setUserPasswordRepeat] = useState('');

  const signinSubmit = () => {
    navigate('Welcome');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Register</Text>
      <Text>Login or register into your favorite movie app build for azot.dev technical test</Text>
      <SafeAreaView>
        <Input
          name="email"
          placeholder="Email"
          value={userEmail}
          changeField={setUserEmail}
          secureTextEntry={false}
        />
        <Input
          name="password"
          placeholder="Password"
          value={userPassword}
          changeField={setUserPassword}
          secureTextEntry
        />
        <Input
          name="password"
          placeholder="Repeat Password"
          value={userPasswordRepeat}
          changeField={setUserPasswordRepeat}
          secureTextEntry
        />
      </SafeAreaView>
      <Submit text="Authenticate" onPress={signinSubmit} />
    </View>
  );
}

export default Signin;
