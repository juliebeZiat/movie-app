import * as React from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';

export function LoadingIndicator() {
  return (
    <View style={styles.fill}>
      <Text style={{color: 'white'}}>Loading...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});