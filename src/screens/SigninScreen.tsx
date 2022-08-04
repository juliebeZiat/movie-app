import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useMutationSignIn } from "../services/mutations";

import { Nav } from "../type/Nav";

import Input from "../components/Input";
import { Controller, useForm } from "react-hook-form";

import { font, margin, padding, color } from "../styles";
import { View, Text, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { ButtonTypography } from "../styles/generalStyles/buttons.style";
import TextTypography from "../styles/generalStyles/text.typography";

import { login } from "../state/reducer/auth.reducer";

type FormValues = {
  email: string;
  password: string;
};

const Home: FC = () => {
  const { navigate } = useNavigation<Nav>();
  const dispatch = useDispatch();

  const { control, handleSubmit, clearErrors } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const { mutateAsync, isError, isLoading } = useMutationSignIn();

  const handleSignin = async (data: { email: string; password: string }) => {
    await mutateAsync(data, {
      onSuccess: (data) => {
        dispatch(login(data.access_token));
        clearErrors();
      },
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={{ justifyContent: "space-evenly" }}>
        <View style={{ padding: padding.md, marginVertical: margin.xxlg }}>
          <TextTypography.Title style={{ marginBottom: margin.md }}>
            Authentication
          </TextTypography.Title>
          <TextTypography.LargeText>
            Login or register into your favorite movie app build for azot.dev
            technical test
          </TextTypography.LargeText>
        </View>
        <View style={{ alignItems: "center" }}>
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
                message:
                  "Password must be longer than or equal to 4 characters",
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

          <View style={{ marginTop: margin.lg, marginBottom: margin.lg }}>
            <ButtonTypography.Large onPress={handleSubmit(handleSignin)}>
              <Text>Authenticate</Text>
            </ButtonTypography.Large>
          </View>
          {isLoading && <ActivityIndicator />}
          {isError && (
            <TextTypography.Text style={{ textAlign: 'center', fontSize: font.md, color: color.primary, marginBottom: margin.md }}>
              Wrong email or password
            </TextTypography.Text>
          )}
          <ButtonTypography onPress={() => navigate("Register")}>
            <Text>Don't have an account yet ? Register here.</Text>
          </ButtonTypography>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Home;
