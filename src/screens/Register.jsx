import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  SafeAreaView,
} from 'react-native';
import Input from '../components/Input';

function Signin() {
  const { navigate } = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Register</Text>
      <Text>Login or register into your favorite movie app build for azot.dev technical test</Text>
      <SafeAreaView>
        <Input
          placeholder="Email"
        />
        <Input
          placeholder="Password"
        />
      </SafeAreaView>
      <Button
        title="Register"
        onPress={() => navigate('Welcome')}
      />
    </View>
  );
}

export default Signin;
