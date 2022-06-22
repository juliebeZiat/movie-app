import React, { FC } from 'react';
import { View, Text } from 'react-native';

const Welcome: FC = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome</Text>
    </View>
  );
}

export default Welcome;
