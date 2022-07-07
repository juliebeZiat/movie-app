import React, { FC } from 'react';
import { TextInput, Text, TextInputProps } from 'react-native';

type InputType = TextInputProps & {
  error?: boolean;
  errorDetails?: string;
}

const Input: FC<InputType> = ({
  placeholder, value, onChangeText, secureTextEntry, error = false, errorDetails,
}) => {
  return (
    <>
      <TextInput
        style={
          error
          ? {
          height: 50,
          width: 320,
          margin: 12,
          padding: 10,
          borderRadius: 10,
          fontSize: 25,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "red"}
          : {
            height: 50,
            width: 320,
            margin: 12,
            padding: 10,
            borderRadius: 10,
            fontSize: 25,
            backgroundColor: "white",
          }
        }
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {!!errorDetails && <Text>{errorDetails}</Text>}
    </>
  );
}

export default Input;
