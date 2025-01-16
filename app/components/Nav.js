import { View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Button from './Button';
import Color from '../models/Color';
import Setup from '../models/Setup';

export default function Nav() {
    const route = useRoute();
    const navigation = useNavigation();

    const buttons = Setup.getWaitingTime() === 'started' ? [
        ['Home', 'home'],
        ['Search', 'search'],
        ['Map', 'map'],
        ['Camera', 'camera'],
    ] : [
        ['Home', 'home'],
        ['Search', 'search'],
    ];

    return (
        <View style={{
            boxSizing:            'border-box',
            width:                '100%',
            flexDirection:        'row',
            justifyContent:       'space-evenly',
            alignItems:           'center',
            gap:                  5,
            padding:              10,
            borderTopLeftRadius:  10,
            borderTopRightRadius: 10,
            backgroundColor:      Color.getCode('light'),
        }}>
            { buttons.map((data, key) => <Button
                key     = { key }
                size    = 'lg'
                type    = { data[0] === route.name ? 'disabled' : 'dark' }
                hasBg   = { false }
                icon    = { data[1] }
                onPress = { () => navigation.navigate(data[0]) }
            />) }
        </View>
    );
}
