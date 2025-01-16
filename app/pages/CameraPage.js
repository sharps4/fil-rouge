import { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { Svg, Path } from 'react-native-svg';
import Color from '../models/Color';
import Stand from '../models/Stand';
import DefaultPage from './DefaultPage';
import Paragraph from '../components/Paragraph';

const windowWidth = Dimensions.get('window').width;

export default function CameraPage() {
    const navigation = useNavigation();

    const device = useCameraDevice('back');

    const codeScanner = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned: (codes) => {
            const process = async () => {
                const stand = await Stand.findByName(codes[0].value);
                if (stand) {
                    stand.visited = true;
                    stand.update();
                    navigation.navigate('Stand', { stand: codes[0].value, from: 'Camera' });
                }
            };
            process();
        }
    });

    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const process = async () => setHasPermission((await Camera.requestCameraPermission()) === 'granted');
        process();
    }, []);

    return (
        <DefaultPage padding={0}>
            <View style={{
                flex:            1,
                justifyContent:  'center',
                alignItems:      'center',
                backgroundColor: Color.getCode('dark'),
            }}>
                {
                    device && hasPermission
                    ? <>
                        <Camera
                            style       = { StyleSheet.absoluteFill }
                            codeScanner = { codeScanner }
                            device      = { device }
                            isActive    = { true }
                        />
                        <Svg
                            width           = { windowWidth*0.8 }
                            height          = { windowWidth*0.8 }
                            viewBox         = '0 0 24 24'
                            fill            = 'none'
                            stroke          = { scanned ? Color.getCode('valid') : Color.getCode('dark') }
                            stroke-width    = '2'
                            stroke-linecap  = 'round'
                            stroke-linejoin = 'round'
                        >
                            <Path d='M3 7V5a2 2 0 012-2h2'/>
                            <Path d='M17 3h2a2 2 0 012 2v2'/>
                            <Path d='M21 17v2a2 2 0 01-2 2h-2'/>
                            <Path d='M7 21H5a2 2 0 01-2-2v-2'/>
                        </Svg>
                    </>
                    : <Paragraph>La caméra n'est pas disponible</Paragraph>
                }
            </View>
        </DefaultPage>
    );
}