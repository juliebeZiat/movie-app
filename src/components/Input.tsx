import React, { FC } from 'react';
import { TextInput, Text, StyleProp, TextStyle, TextInputProps } from 'react-native';

type InputType = TextInputProps & {
  errorMessage?: string | null;
}

const Input: FC<InputType> = ({
  placeholder, value, onChangeText, secureTextEntry, errorMessage,
}) => {
  return (
    <>
      <TextInput
        style={{
          height: 50, width: 320, margin: 12, padding: 10, borderRadius: 10, fontSize: 25, backgroundColor: 'white'
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize='none'
        keyboardType="email-address"
      />
      {!!errorMessage && <Text>{errorMessage}</Text>}
    </>
  );
}

export default Input;
