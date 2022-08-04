import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useMutationSignUp } from "../../services/mutations";

import { View, Text, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { color, font, margin, padding } from "../../styles";

import { ButtonTypography } from "../../styles/generalStyles/buttons.style";
import TextTypography from "../../styles/generalStyles/text.typography";

import { Nav } from "../../type/Nav";

import { useForm } from "react-hook-form";
import { login } from "../../state/reducer/auth.reducer";
import Form from "./components/Form";

export type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup: FC = () => {
  const { navigate } = useNavigation<Nav>();
  const dispatch = useDispatch();

  const { control, handleSubmit, clearErrors, watch } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync, isError, isLoading } = useMutationSignUp();

  const handleSignup = async (data: { username: string, email: string; password: string }) => {
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
        <View style={{ padding: padding.md, marginVertical: margin.lg }}>
          <TextTypography.Title style={{ marginBottom: margin.md }}>
            Register
          </TextTypography.Title>
          <TextTypography.LargeText>
            Login or register into your favorite movie app build for azot.dev
            technical test
          </TextTypography.LargeText>
        </View>
        <View style={{ alignItems: "center" }}>
          <Form control={control} watch={watch} />

          <View style={{ marginTop: margin.lg, marginBottom: margin.lg }}>
            <ButtonTypography.Large onPress={handleSubmit(handleSignup)}>
              <Text>Create a new account</Text>
            </ButtonTypography.Large>
          </View>
        </View>
        {isLoading && <ActivityIndicator />}
        {isError && (
          <TextTypography.Text
            style={{
              textAlign: "center",
              fontSize: font.md,
              color: color.primary,
              marginBottom: margin.md,
            }}
          >
            This user already exists. Please login.
          </TextTypography.Text>
        )}
      </View>
      <ButtonTypography onPress={() => navigate("Login")}>
        <Text>Already have an account ? Login here</Text>
      </ButtonTypography>
    </KeyboardAvoidingView>
  );
};

export default Signup;
