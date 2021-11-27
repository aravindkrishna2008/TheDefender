import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraScreen from './src/screens/CameraScreen'
import SignInScreen from './src/screens/SignInScreen';
import Navigator from './src/routes/Navigator';

export default function App() {
  return (
    <View>
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
