import { View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Button from './Button';
import Color from '../models/Color';

export default function Nav() {
    const route = useRoute();
    const navigation = useNavigation();

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
            {[
                ['Home', 'home'],
                ['Map', 'map'],
                ['Path', 'compass'],
                ['Camera', 'camera'],
            ].map((data, key) => <Button
                key     = { key }
                size    = 'lg'
                type    = { data[0] === route.name ? 'disabled' : 'dark' }
                hasBg   = { false }
                icon    = { data[1] }
                onPress = { () => navigation.navigate(data[0]) }
            ></Button>)}
        </View>
    );
}
