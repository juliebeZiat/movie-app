import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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

const Home: FC = () => {
  const { navigate } = useNavigation<Nav>();
  
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const errorEmail = useValidateEmail(userEmail);
  const errorPassword = useValidatePassword(userPassword);
  
  const handleLogin = () => {
    if ((!errorEmail) && (!errorPassword)) {
      navigate('Welcome');
    }
  };

  // console.log(Boolean(errorEmail));

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Authentication</Text>
      <Text>Login or register into your favorite movie app build for azot.dev technical test</Text>
      <SafeAreaView>
        <Input
          placeholder="Email"
          value={userEmail}
          changeField={setUserEmail}
          secureTextEntry={false}
          errorMessage={errorEmail}
        />
        <Input
          placeholder="Password"
          value={userPassword}
          changeField={setUserPassword}
          secureTextEntry
          errorMessage={errorPassword}
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
