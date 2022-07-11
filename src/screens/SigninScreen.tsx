import React, { FC, useCallback, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { View, Text, ActivityIndicator, KeyboardAvoidingView, Pressable } from "react-native";

import Input from "../components/Input";

import { Nav } from "../type/Nav";

import { login } from "../state/reducer/auth.reducer";
import authService from "../services/authService";
import { ButtonTypography } from "../styles/generalStyles/buttons.style";

import { Controller, useForm } from "react-hook-form";

import { margin, padding } from "../styles";
import TextTypography from "../styles/generalStyles/text.typography";

const Home: FC = () => {
  const { navigate } = useNavigation<Nav>();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  type FormValues = {
    email: string;
    password: string;
  };

  const { control, handleSubmit, clearErrors } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    }
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

  const Signin = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    const result = await authService.loginPost({
      email: data.email,
      password: data.password,
    });
    if (result) {
      dispatch(login(result.access_token));
    }
    clearErrors();
    setIsLoading(false);
    return result;
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
    >
    <View style={{ justifyContent: 'space-evenly' }}>
      <View style={{ padding: padding.md, marginVertical: margin.xxlg }}>
        <TextTypography.Title style={{ marginBottom: margin.md }}>Authentication</TextTypography.Title>
        <TextTypography.LargeText>
          Login or register into your favorite movie app build for azot.dev
          technical test
        </TextTypography.LargeText>
      </View>
      <View style={{ alignItems: 'center' }}>
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
              error={!!error}
              placeholder="Email"
              value={value}
              onChangeText={onChange}
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
            pattern: {
              value: /(?=.*[A-Z])(?=.*[0-9])/,
              message: "Password must contain at least one number and one uppercase",
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
      
        <View style={{ marginTop: margin.lg, marginBottom: margin.lg }}>
          <ButtonTypography.Large onPress={handleSubmit(Signin)}>
            <Text>Authenticate</Text>
          </ButtonTypography.Large>
        </View>
        {isLoading && <ActivityIndicator />}

        <ButtonTypography onPress={() => navigate("Signup")}>
          <Text>Don't have an account yet ? Register here.</Text>
        </ButtonTypography>

      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

export default Home;
