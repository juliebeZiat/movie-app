import React, { FC, useCallback, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { View, Text, ActivityIndicator, KeyboardAvoidingView } from "react-native";

import Input from "../components/Input";

import { Nav } from "../type/Nav";

import { login } from "../state/reducer/auth.reducer";
import authService from "../services/authService";
import { ButtonTypography } from "../styles/generalStyles/buttons.style";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinValidationSchema } from "../functions/validationSchema";
import { margin, padding } from "../styles";
import TextTypography from "../styles/generalStyles/text.typography";

const Home: FC = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation<Nav>();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  type FormValues = {
    email: string;
    password: string;
  };

  const validationSchema = signinValidationSchema;

  const { control, handleSubmit, clearErrors } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
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
          defaultValue=""
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
          defaultValue=""
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
