import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import {
  View,
  Text,
  SafeAreaView,
} from 'react-native';

import Input from '../components/Input';
import { ButtonTypography } from '../components/typography/buttons.typography';
import { TextTypography } from '../components/typography/text.typography';

import { Nav } from '../type/Nav';

import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Signin: FC = () => {
  const { navigate } = useNavigation<Nav>();

  type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
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
      .min(4, "Password must be longer than or equal to 4 characters"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Password must be same"),
  }).required();
  
  const { control, handleSubmit, clearErrors } = useForm<FormValues>({
    resolver: yupResolver(validationSchema)
  })

  const Signup = () => {
    clearErrors();
  }

  return (
    <View style={{ flex: 1, justifyContent: 'space-evenly', width: 350, margin: 15 }}>
      <TextTypography.Title>Register</TextTypography.Title>
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

        <Controller control={control} name="confirmPassword" defaultValue='' render={({ field: {onChange, value} , fieldState: {error}}) => (
          <Input
            placeholder="Repeat Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={!!error}
            errorDetails={error?.message}
          />
        )} />
      </SafeAreaView>

      <ButtonTypography.Large
        onPress={handleSubmit(Signup)}
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
