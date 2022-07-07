import React, { FC } from 'react';
import { TextInputProps } from 'react-native';
import { TextInputStyle } from '../styles/generalStyles/form.style';
import TextTypography from '../styles/generalStyles/text.typography';

type InputType = TextInputProps & {
  error?: boolean;
  errorDetails?: string;
}

const Input: FC<InputType> = ({
  placeholder, value, onChangeText, secureTextEntry, error = false, errorDetails,
}) => {
  return (
    <>
      <TextInputStyle
        style={ error ? { borderColor: 'red', borderWidth: 1 } : ''}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {!!errorDetails && <TextTypography.Error>{errorDetails}</TextTypography.Error>}
    </>
  );
}

export default Input;
