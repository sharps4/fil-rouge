/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";

import LoadingPage from './app/pages/LoadingPage';
import HomePage from './app/pages/HomePage';
import SearchPage from './app/pages/SearchPage';
import MapPage from './app/pages/MapPage';
import StandPage from './app/pages/StandPage';
import CompanyPage from './app/pages/CompanyPage';
import CameraPage from './app/pages/CameraPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Loading'>
        <Stack.Screen name='Loading' component={ LoadingPage } options={{ headerShown: false }}/>
        <Stack.Screen name='Home'    component={ HomePage }    options={{ headerShown: false }}/>
        <Stack.Screen name='Search'  component={ SearchPage }  options={{ headerShown: false }}/>
        <Stack.Screen name='Map'     component={ MapPage }     options={{ headerShown: false }}/>
        <Stack.Screen name='Stand'   component={ StandPage }   options={{ headerShown: false }}/>
        <Stack.Screen name='Company' component={ CompanyPage } options={{ headerShown: false }}/>
        <Stack.Screen name='Camera'  component={ CameraPage }  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}