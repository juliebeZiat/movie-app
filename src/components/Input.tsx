import React, { FC } from 'react';
import { TextInput, Text, StyleProp, TextStyle } from 'react-native';

type InputType = {
  placeholder: string;
  value?: string;
  changeField: ((text: string) => void);
  secureTextEntry: boolean;
  errorMessage?: string | null;
  style?: StyleProp<TextStyle>;
}

const Input: FC<InputType> = ({
  placeholder, value, changeField, secureTextEntry, errorMessage,
}) => {
  return (
    <>
      <TextInput
        style={{
          height: 40, margin: 12, borderWidth: 1, padding: 10,
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={changeField}
        secureTextEntry={secureTextEntry}
        errorMessage={errorMessage}
      />
      <Text>{errorMessage}</Text>
    </>
  );
}

export default Input;
