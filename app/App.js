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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#033165' }}>
        <View style={{ marginTop: 200 }}>
          {/* <Image source={require('./assets/splash.png')} style={{ width: 250, height: 250, marginTop: 220, marginBottom: 220 }} /> */}
          <Svg viewBox='0 0 300 300' width={200} height={200}>
            <Polygon fill="#fff" points="62.36 0 43.44 0 43.44 68.74 97.44 68.74 97.44 52.51 62.43 52.51 62.36 0"/>
            <Polygon fill="#fff" points="102.05 0 118.49 0 118.49 26.39 150.05 26.39 150.05 0 166.3 0 166.3 84.5 150.33 84.5 150.33 41.69 118.77 41.69 118.77 68.74 102.05 68.74 102.05 0"/>
            <Path fill="#fff" d="M43.65,89.22c-.07,0-.14,0-.21,0h0s-43.44,0-43.44,0v67.08h18.24v-19.08h25.41c10.96,0,19.85-10.75,19.85-24s-8.89-24-19.85-24ZM43.44,118.33c-2.28,3.42-6.38,3.86-6.38,3.86h-18.92v-18.56h19.42s3.73.43,5.88,3.71c.88,1.33,1.49,3.13,1.49,5.57s-.61,4.1-1.49,5.42Z"/>
            <Path fill="#fff" d="M105.16,89.22c-21.34,0-38.64,16.12-38.64,36s17.3,36,38.64,36,38.65-16.12,38.65-36-17.3-36-38.65-36ZM105.16,145.24c-11.64,0-21.08-8.96-21.08-20.02s9.44-20.02,21.08-20.02,21.09,8.96,21.09,20.02-9.44,20.02-21.09,20.02Z"/>
            <Path fill="#fff" d="M196.32,133.84l-.35-.35c9.95-1.98,17.46-11.04,17.46-21.92,0-12.34-9.66-22.35-21.58-22.35h-42.84v68.5h19.18v-23.81h4.81l30.9,31.56h20.82l-28.4-31.63ZM187.3,119.34h-19.21v-15.8h19.14s8.22.42,8.22,7.9-8.15,7.9-8.15,7.9Z"/>
            <Polygon fill="#fff" points="283.04 89.22 283.04 104.24 257.53 104.24 257.53 157.25 239.67 157.25 239.67 104.24 216.14 104.24 216.14 89.22 283.04 89.22"/>
            <Path fill="#fff" d="M39.7,187.53c-.59-.03-1.19-.05-1.79-.05H0v68.83h39.7c16.67-1.01,29.89-16.02,29.89-34.39s-13.22-33.38-29.89-34.39ZM31.11,241.97h-13.04v-39.82h12.9s20.69-1.35,20.69,19.34-20.55,20.48-20.55,20.48Z"/>
            <Path fill="#fff" d="M39.68,256.26c-.59.03-1.18.05-1.77.05s-1.18-.02-1.76-.05h3.53Z"/>
            <Path fill="#fff" d="M39.7,184.89v.05c-.59-.03-1.19-.05-1.79-.05h1.79Z"/>
            <Path fill="#fff" d="M119.2,187.43h-17.37l-31.18,68.88h20.77l4.39-11.62h29.06l6.09,11.62h19.84l-31.6-68.88ZM101.09,229.13l9.6-20.72,9.68,20.72h-19.28Z"/>
            <Polygon fill="#fff" points="224.13 176.04 204.47 176.04 180.09 217.15 161.29 188.33 142.11 188.33 170.08 235.19 170.08 256.31 188.13 256.31 188.13 234.06 224.13 176.04"/>
            <Path fill="#fff" d="M249.73,256.31c-21,0-28.48-12.24-28.48-23.69h15c0,2.38,0,8.69,13.48,8.69,14.31,0,14.7-7.79,14.71-7.87,0-1.57-.14-2.59-.9-3.43-.86-.96-3.89-3.18-13.38-3.18-19.9,0-26.96-11.42-26.96-21.2,0-10.94,8.22-22.71,26.26-22.71,20.26,0,29.33,11.21,29.33,22.31h-15c0-5.39-7.4-7.31-14.33-7.31-9.79,0-11.26,4.83-11.26,7.71,0,5.12,6.51,6.2,11.96,6.2,25.48,0,29.28,13.55,29.28,21.63,0,9.19-7.91,22.85-29.71,22.85Z"/>
          </Svg>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', marginTop: 300 }}> 
      <View style={styles.container}>
        <Image source={require('./assets/splash.png')} style={styles.splashImage} />
        <View style={styles.byContainer}>
          <Text style={styles.byText}>By </Text>
          <Svg width={150} height={150}>
            <Polygon fill="#fff" points="83.52 33.55 91.11 33.55 87.48 11.36 83.52 33.55" />
            <Polygon fill="#fff" points="25.96 33.55 33.55 33.55 29.92 11.36 25.96 33.55" />
            <Path fill="#fff" d="M0,0v49.08h146.18V0H0ZM95.32,5.71s-.06.02-.08.02c0,0,0-.03-.01-.05.03,0,.05.01.1.03ZM92.49,9.41s0,0,0,0c0,0,.02.02.02.03-.02,0-.03-.01-.05-.01,0,0,.02,0,.03-.01ZM21.53,42.68H7.39V7.39h4.59v34.33h9.55v.96ZM35.67,42.68l-1.67-8.13h-8.34l-1.67,8.13h-1.71L28.92,7.39h4.63l6.72,35.29h-4.59ZM77.72,42.68h-4.55V15.9l-8.47,23.99-9.13-23.99v26.78h-1.88V7.39h3.71l8.8,24.15,8.47-24.15h3.05v35.29ZM93.24,42.68l-1.67-8.13h-8.34l-1.67,8.13h-1.71l6.63-35.29h4.63l6.72,35.29h-4.59ZM117.93,43.39h-.58l-15.43-30.53v29.78h-1.96V7.39h4.05l12.01,24.03V7.39h1.92v36ZM138.79,35.26c0,1.89-.32,3.37-.96,4.44-.64,1.07-1.46,1.88-2.46,2.44-1,.56-2.11.9-3.32,1.04-1.21.14-2.38.21-3.53.21-5.14,0-7.72-2.27-7.72-6.8V7.39h4.63v28.57c0,.83.18,1.61.54,2.33.36.72.84,1.36,1.44,1.92.6.56,1.29.99,2.09,1.31.79.32,1.62.48,2.48.48,1.56,0,2.76-.5,3.61-1.5.85-1,1.27-2.31,1.27-3.92V7.39h1.92v27.87Z" />
        <Image source={require('./assets/splash.png')} style={{ width: 250, height: 250, marginTop: 220, marginBottom: 220 }} />
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}> 
          <Text style={{ color: 'white', fontSize: 20, marginRight: 15 }}>By </Text>
          <Svg viewBox='0 0 300 300' width={220} height={220}>
            <Polygon fill="#fff" points="83.52 33.55 91.11 33.55 87.48 11.36 83.52 33.55"/>
            <Polygon fill="#fff" points="25.96 33.55 33.55 33.55 29.92 11.36 25.96 33.55"/>
            <Path fill='#fff' d="M0,0v49.08h146.18V0H0ZM95.32,5.71s-.06.02-.08.02c0,0,0-.03-.01-.05.03,0,.05.01.1.03ZM92.49,9.41s0,0,0,0c0,0,.02.02.02.03-.02,0-.03-.01-.05-.01,0,0,.02,0,.03-.01ZM21.53,42.68H7.39V7.39h4.59v34.33h9.55v.96ZM35.67,42.68l-1.67-8.13h-8.34l-1.67,8.13h-1.71L28.92,7.39h4.63l6.72,35.29h-4.59ZM77.72,42.68h-4.55V15.9l-8.47,23.99-9.13-23.99v26.78h-1.88V7.39h3.71l8.8,24.15,8.47-24.15h3.05v35.29ZM93.24,42.68l-1.67-8.13h-8.34l-1.67,8.13h-1.71l6.63-35.29h4.63l6.72,35.29h-4.59ZM117.93,43.39h-.58l-15.43-30.53v29.78h-1.96V7.39h4.05l12.01,24.03V7.39h1.92v36ZM138.79,35.26c0,1.89-.32,3.37-.96,4.44-.64,1.07-1.46,1.88-2.46,2.44-1,.56-2.11.9-3.32,1.04-1.21.14-2.38.21-3.53.21-5.14,0-7.72-2.27-7.72-6.8V7.39h4.63v28.57c0,.83.18,1.61.54,2.33.36.72.84,1.36,1.44,1.92.6.56,1.29.99,2.09,1.31.79.32,1.62.48,2.48.48,1.56,0,2.76-.5,3.61-1.5.85-1,1.27-2.31,1.27-3.92V7.39h1.92v27.87Z"/>
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
