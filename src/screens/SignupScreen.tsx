import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";

import Input from "../components/Input";
import { ButtonTypography } from "../styles/generalStyles/buttons.style";
import TextTypography from "../styles/generalStyles/text.typography";

import { Nav } from "../type/Nav";

import { Controller, useForm } from "react-hook-form";
import { margin, padding } from "../styles";
import { useMutation } from "react-query";
import authService from "../services/authService";
import { useDispatch } from "react-redux";
import { login } from "../state/reducer/auth.reducer";

const Signin: FC = () => {
  const { navigate } = useNavigation<Nav>();
  const dispatch = useDispatch();

  type FormValues = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const { control, handleSubmit, clearErrors, watch } = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const signUpQuery = useMutation(async (data: { username: string; email: string; password: string }) => await authService.signUp({
    name: data.username,
    email: data.email,
    password: data.password,
  }));

  const handleSignup = async (data: { username: string, email: string; password: string }) => {
    await signUpQuery.mutateAsync(data, {
      onSuccess: (data) => {
        dispatch(login(data.access_token));
        clearErrors();
      },
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={{ justifyContent: 'space-evenly' }}>
        <View style={{ padding: padding.md, marginVertical: margin.lg }}>
        <TextTypography.Title style={{ marginBottom: margin.md }}>Register</TextTypography.Title>
        <TextTypography.LargeText>
          Login or register into your favorite movie app build for azot.dev
          technical test
        </TextTypography.LargeText>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Controller
              control={control}
              name="username"
              rules={{
                required: "Username should not be empty",
                minLength: {
                  value: 4,
                  message: "Username must be longer than or equal to 4 characters"
                },
                pattern: {
                  value: /^\S*$/,
                  message: "No whitespace allowed",
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Input
                  placeholder="Username"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  errorDetails={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email should not be empty",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email must be an email",
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Input
                  placeholder="Email"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  errorDetails={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password should not be empty",
                minLength: {
                  value: 4,
                  message: "Password must be longer than or equal to 4 characters"
                },
                validate: {
                  gotNumber: (value) => /([0-9])/.test(value) || "Password must contain at least one number",
                  gotUppercase: (value) => /([A-Z])/.test(value) || "Password must contain at least one uppercase",
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Input
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  error={!!error}
                  errorDetails={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: "Please confirm your password",
                validate: value => value === watch('password') || "Password do not match"
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Input
                  placeholder="Repeat Password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  error={!!error}
                  errorDetails={error?.message}
                />
              )}
            />

          <View style={{ marginTop: margin.lg, marginBottom: margin.lg }}>
            <ButtonTypography.Large onPress={handleSubmit(handleSignup)}>
              <Text>Create a new account</Text>
            </ButtonTypography.Large>
          </View>
        </View>
        <ButtonTypography onPress={() => navigate("Signin")}>
          <Text>Already have an account ? Login here</Text>
        </ButtonTypography>

      </View>
    </KeyboardAvoidingView>
  );
};

export default Signin;
