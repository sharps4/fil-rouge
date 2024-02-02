import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path, Polygon } from 'react-native-svg';
import NavBar from './components/navbar';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Utilisation d'une valeur appropriée pour le délai
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/splash.png')} style={styles.splashImage} />
        <View style={styles.byContainer}>
          <Text style={styles.byText}>By </Text>
          <Svg width={150} height={150}>
            <Polygon fill="#fff" points="83.52 33.55 91.11 33.55 87.48 11.36 83.52 33.55" />
            <Polygon fill="#fff" points="25.96 33.55 33.55 33.55 29.92 11.36 25.96 33.55" />
            <Path fill="#fff" d="M0,0v49.08h146.18V0H0ZM95.32,5.71s-.06.02-.08.02c0,0,0-.03-.01-.05.03,0,.05.01.1.03ZM92.49,9.41s0,0,0,0c0,0,.02.02.02.03-.02,0-.03-.01-.05-.01,0,0,.02,0,.03-.01ZM21.53,42.68H7.39V7.39h4.59v34.33h9.55v.96ZM35.67,42.68l-1.67-8.13h-8.34l-1.67,8.13h-1.71L28.92,7.39h4.63l6.72,35.29h-4.59ZM77.72,42.68h-4.55V15.9l-8.47,23.99-9.13-23.99v26.78h-1.88V7.39h3.71l8.8,24.15,8.47-24.15h3.05v35.29ZM93.24,42.68l-1.67-8.13h-8.34l-1.67,8.13h-1.71l6.63-35.29h4.63l6.72,35.29h-4.59ZM117.93,43.39h-.58l-15.43-30.53v29.78h-1.96V7.39h4.05l12.01,24.03V7.39h1.92v36ZM138.79,35.26c0,1.89-.32,3.37-.96,4.44-.64,1.07-1.46,1.88-2.46,2.44-1,.56-2.11.9-3.32,1.04-1.21.14-2.38.21-3.53.21-5.14,0-7.72-2.27-7.72-6.8V7.39h4.63v28.57c0,.83.18,1.61.54,2.33.36.72.84,1.36,1.44,1.92.6.56,1.29.99,2.09,1.31.79.32,1.62.48,2.48.48,1.56,0,2.76-.5,3.61-1.5.85-1,1.27-2.31,1.27-3.92V7.39h1.92v27.87Z" />
          </Svg>
        </View>
      </View>
    );
  }

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
  splashImage: {
    width: 250,
    height: 250,
    marginTop: 220,
    marginBottom: 220,
  },
  byContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  byText: {
    color: 'white',
    fontSize: 20,
    marginRight: 15,
  },
});
