import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/components/Login/Login';

export default function App() {
  return (
    <Login />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
