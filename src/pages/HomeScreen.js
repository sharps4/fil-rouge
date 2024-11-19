import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { Modalize, ModalizeProps } from 'react-native-modalize';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>"Bienvenue sur l'application QR Scanner"</Text>
      <Button
        title="Ouvrir le scanner QR"
        /*onPress={() => navigation.navigate('Scan')}*/
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;