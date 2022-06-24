import React, { FC } from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import authService from '../services/authService';
import { logout } from '../state/reducer/auth.reducer';

const Welcome: FC = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome</Text>
      <Button title='logout' onPress={handleLogout}></Button>
    </View>
  );
}

export default Welcome;
