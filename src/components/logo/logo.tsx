import React from 'react';
import { Text, View } from 'react-native';

export const Logo = () => (
  <View style={{ height: 80, padding: 10, backgroundColor: '#FBF9FF', flexDirection: 'row', flexWrap: 'wrap' }}>
    <Text style={{ fontSize: 30, fontWeight: 'bold', paddingTop: 30, paddingLeft: 15 }}>Logo</Text>
    <Text style={{ fontSize: 30, fontWeight: 'bold', paddingTop: 30, color: 'red' }}>.</Text>
  </View>
)

export const LargeLogo = () => (
  <View style={{ height: 80, padding: 10, backgroundColor: '#FBF9FF', flexDirection: 'row', flexWrap: 'wrap' }}>
    <Text style={{ fontSize: 50, fontWeight: 'bold', paddingTop: 20 }}>Logo</Text>
    <Text style={{ fontSize: 50, fontWeight: 'bold', paddingTop: 20, color: 'red' }}>.</Text>
  </View>
)
