import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useMutationSignIn } from "../../services/mutations";

import { Nav } from "../../type/Nav";

import { useForm } from "react-hook-form";

import { font, margin, padding, color } from "../../styles";
import { View, Text, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { ButtonTypography } from "../../styles/generalStyles/buttons.style";
import TextTypography from "../../styles/generalStyles/text.typography";

import { login } from "../../state/reducer/auth.reducer";
import Form from "./components/Form";

export type FormValues = {
  email: string;
  password: string;
};

const Signin: FC = () => {
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
          <Form control={control} />
          <View style={{ marginTop: margin.lg, marginBottom: margin.lg }}>
            <ButtonTypography.Large onPress={handleSubmit(handleSignin)}>
              <Text>Authenticate</Text>
            </ButtonTypography.Large>
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

export default Signin;
