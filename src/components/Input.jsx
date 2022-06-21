import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

function Input({
  placeholder, value, changeField, secureTextEntry,
}) {
  return (
    <TextInput
      style={{
        height: 40, margin: 12, borderWidth: 1, padding: 10,
      }}
      placeholder={placeholder}
      value={value}
      onChangeText={changeField}
      secureTextEntry={secureTextEntry}
    />
  );
}

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  changeField: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool.isRequired,
};

Input.defaultProps = {
  value: '',
};

export default Input;
