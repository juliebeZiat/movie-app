import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native';

const Submit: FC<{text: string; onPress(): void;}> = ({ text, onPress }) => {
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
