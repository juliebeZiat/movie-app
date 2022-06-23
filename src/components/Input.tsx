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
          height: 40, margin: 12, borderWidth: 1, padding: 10,
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {!!errorMessage && <Text>{errorMessage}</Text>}
    </>
  );
}

export default Input;
