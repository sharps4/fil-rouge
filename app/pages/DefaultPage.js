import { View } from 'react-native';
import Color from '../models/Color';
import Nav from '../components/Nav';

export default function DefaultPage({ padding = 20, children }) {
    return (
        <View style={{
            flex:            1,
            alignItems:      'center',
            backgroundColor: Color.getCode('primary')
        }}>
            <View style={{
                flex:            1,
                flexGrow:        1,
                width:           '100%',
                padding:         padding,
            }}>{children}</View>
            <Nav/>
        </View>
    );
}