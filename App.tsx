/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";

import LoadingPage from './app/pages/LoadingPage';
import MapPage from './app/pages/MapPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Loading" component={LoadingPage} options={{headerShown: false}}/>
        <Stack.Screen name="Map"     component={MapPage}     options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}