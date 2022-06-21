import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

function Input({ placeholder }) {
  return (
    <TextInput
      style={{
        height: 40, margin: 12, borderWidth: 1, padding: 10,
      }}
      placeholder={placeholder}
    />
  );
}

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default Input;
