import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Dimensions, View, Alert } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';
import DefaultPage from './DefaultPage';
import STANDS from '../data/stands.json';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ScannerPage({navigation}) {
    const [isFocused, setFocused] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [states, setStates] = useState(null);
    const [path, setPath] = useState(null);

    useEffect(() => {
        const getData = async () => {
            let value = await AsyncStorage.getItem('stands');
            if (value) {setStates(JSON.parse(value));}
            else {
                let result = {};
                for (let stand in STANDS.stands) {result[stand] = {scanned: false, validate: STANDS.stands[stand].game === undefined, nPlays: 0};}
                setStates(result);
                await AsyncStorage.setItem('stands', JSON.stringify(result));
            }
            value = await AsyncStorage.getItem('path');
            if (value) {setPath(JSON.parse(value));}
        }
        getData();
    }, [isFocused]);

    useFocusEffect(
        useCallback(() => {
            setFocused(true);
            return () => {setFocused(false);}
        }, [])
    );

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };
        getCameraPermissions();
    }, [isFocused]);

    const handleScan = async ({type, data}) => {
        if (!scanned && states) {
            setScanned(true);
            if (data === 'SCORE') {
                Alert.alert('Vous avez un obtenu un score de '+(await AsyncStorage.getItem('score')));
                setScanned(false);
                navigation.navigate('Map');
            }
            else if (data.startsWith('STAND ') && STANDS.stands[data.slice(6)]) {
                let name = data.slice(6);
                states[name].scanned = true;
                await AsyncStorage.setItem('stands', JSON.stringify(states));
                if (path && path.stands[path.stage] === name) {
                    while (path.stage < path.stands.length && states[path.stands[path.stage]].scanned) {path.stage++;}
                    if (path.stage === path.stands.length) {await AsyncStorage.removeItem('path');}
                    else {await AsyncStorage.setItem('path', JSON.stringify(path));}
                }
                await AsyncStorage.setItem('score', (parseInt(await AsyncStorage.getItem('score'))+10).toString());
                setScanned(false);
                navigation.navigate('Stand', {stand: name, from: 'Map'});
            }
            else {Alert.alert('Erreur', 'Ce QR Code n\'est pas reconnu', [{text: 'Ok', onPress: () => setScanned(false)}]);}
        }
    }

    return (
        <DefaultPage navigation={navigation}>
            <View style={[StyleSheet.absoluteFillObject, {backgroundColor: '#000'}]}>
                {
                    hasPermission && isFocused ? <Camera
                        onBarCodeScanned={scanned ? null : handleScan}
                        barcodeScannerSettings={{barCodeTypes: ["qr", "pdf417"]}}
                        style={StyleSheet.absoluteFillObject}
                    /> : null
                }
                <Svg
                    style={{
                        position: 'absolute',
                        zIndex: 100,
                        left: windowWidth*0.05,
                        top: (windowHeight-windowWidth*0.9)/2,
                    }}
                    width={windowWidth*0.9}
                    height={windowWidth*0.9}
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke={scanned ? '#0f0' : '#000'}
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'>
                    <Path d='M3 7V5a2 2 0 012-2h2'/>
                    <Path d='M17 3h2a2 2 0 012 2v2'/>
                    <Path d='M21 17v2a2 2 0 01-2 2h-2'/>
                    <Path d='M7 21H5a2 2 0 01-2-2v-2'/>
                </Svg>
            </View>
        </DefaultPage>
    );
}