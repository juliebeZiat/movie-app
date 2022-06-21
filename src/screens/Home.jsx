import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  SafeAreaView,
} from 'react-native';
import Input from '../components/Input';

function Home() {
  const { navigate } = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Authentication</Text>
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
        title="Authenticate"
        onPress={() => navigate('Welcome')}
      />
      <Button
        title="Don't have an account yet ? Register here."
        onPress={() => navigate('Register')}
      />
    </View>
  );
}

export default Home;
