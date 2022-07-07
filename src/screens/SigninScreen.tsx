import React, { FC, useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import Input from '../components/Input';

import { Nav } from '../type/Nav';

import { login } from '../state/reducer/auth.reducer';
import authService from '../services/authService';
import { TextTypography } from '../components/typography/text.typography';
import { ButtonTypography } from '../components/typography/buttons.typography';

import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


const Home: FC = () => {
  const { navigate } = useNavigation<Nav>();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  type FormValues = {
    email: string;
    password: string;
  }
  
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email must be an email")
      .required("Email should not be empty"),
    password: Yup.string()
      .required("Password should not be empty")
      .matches(/([0-9])/, "Password must contain at least one number")
      .matches(/([a-z])/, "Password must contain at least one lowercase letter")
      .matches(/([A-Z])/, "Password must contain at least one uppercase letter")
      .min(4, "Password must be longer than or equal to 4 characters")
  }).required();

  const { control, handleSubmit, clearErrors } = useForm<FormValues>({
    resolver: yupResolver(validationSchema)
  });

  //! useCallback
  // const Signin = useCallback (async (data: {email: string, password: string}) => {
  //   setIsLoading(true);
  //   const result = await authService.loginPost({email: data.email, password: data.password});
  //   if (result) {
  //     dispatch(login(result.access_token));
  //   }
  //   clearErrors();
  //   setIsLoading(false);
  //   return result;
  // }, [{email: data.email, password: data.password}]);

  const Signin = async (data: {email: string, password: string}) => {
    setIsLoading(true);
    const result = await authService.loginPost({email: data.email, password: data.password});
    if (result) {
      dispatch(login(result.access_token));
    }
    clearErrors();
    setIsLoading(false);
    return result;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-evenly', width: 350, margin: 15 }}>
      <TextTypography.Title>Authentication</TextTypography.Title>
      <TextTypography.LargeText>Login or register into your favorite movie app build for azot.dev technical test</TextTypography.LargeText>
      <SafeAreaView>
      <Controller control={control} name="email" defaultValue='' render={({ field: {onChange, value}, fieldState: {error}}) => (
          <Input
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            error={!!error}
            errorDetails={error?.message}
          />
        )} />

        <Controller control={control} name="password" defaultValue='' render={({ field: {onChange, value} , fieldState: {error}}) => (
          <Input
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={!!error}
            errorDetails={error?.message}
          />
        )} />
      </SafeAreaView>

      <ButtonTypography.Large onPress={handleSubmit(Signin)}>
        <Text>Authenticate</Text>
      </ButtonTypography.Large>

      {isLoading && <ActivityIndicator />}

      <ButtonTypography
        onPress={() => navigate('Signup')}
      >
        <Text>Don't have an account yet ? Register here.</Text>
      </ButtonTypography>
    </View>
  );
}

export default Home;
