import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashPage from './app/pages/SplashPage';
import MainPage from './app/pages/MainPage';
import ScannerPage from './app/pages/ScannerPage';
import MapPage from './app/pages/MapPage';
import PathsPage from './app/pages/PathsPage';
import PathPage from './app/pages/PathPage';
import InfoPage from './app/pages/InfoPage';
import StandPage from './app/pages/StandPage';
import CompanyPage from './app/pages/CompanyPage';

const Stack = createNativeStackNavigator();

export default function App() {
    useEffect(() => {
        const initScore = async () => {
            let value = await AsyncStorage.getItem('score');
            if (!value) {await AsyncStorage.setItem('score', '0');}
        };
        initScore();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={SplashPage} options={{headerShown: false}}/>
                <Stack.Screen name="Main" component={MainPage} options={{headerShown: false}}/>
                <Stack.Screen name="Scanner" component={ScannerPage} options={{headerShown: false}}/>
                <Stack.Screen name="Map" component={MapPage} options={{headerShown: false}}/>
                <Stack.Screen name="Paths" component={PathsPage} options={{headerShown: false}}/>
                <Stack.Screen name="Path" component={PathPage} options={{headerShown: false}}/>
                <Stack.Screen name="Info" component={InfoPage} options={{headerShown: false}}/>
                <Stack.Screen name="Stand" component={StandPage} options={{headerShown: false}}/>
                <Stack.Screen name="Company" component={CompanyPage} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}