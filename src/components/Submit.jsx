import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native';

function Submit({ text, onPress }) {
  return (
    <Button
      title={text}
      onPress={onPress}
    />
  );
}

Submit.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Submit;
