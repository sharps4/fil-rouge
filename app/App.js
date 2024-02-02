import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import NavBar from './components/navbar';

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavBar
        icons={[
          { label: 'Home', icon: 'home' },
          { label: 'User', icon: 'user' },
          { label: 'Settings', icon: 'settings' },
          { label: 'Bell', icon: 'bell' },
        ]}
        selectedIndex={selectedIndex}
        onPress={(index) => setSelectedIndex(index)}
      />
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