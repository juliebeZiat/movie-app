import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  SafeAreaView,
} from 'react-native';
import Input from '../components/Input';
import Submit from '../components/Submit';

function Home() {
  const { navigate } = useNavigation();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const loginSubmit = () => {
    navigate('Welcome');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Authentication</Text>
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
      </SafeAreaView>
      <Submit text="Authenticate" onPress={loginSubmit} />
      <Button
        title="Don't have an account yet ? Register here."
        onPress={() => navigate('Signin')}
      />
    </View>
  );
}

export default Home;
