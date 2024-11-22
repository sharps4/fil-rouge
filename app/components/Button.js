import { TouchableOpacity, Text } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function Button({onPress, children}) {
    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
        }} onPress={onPress}>
            <Text style={{
                fontSize: 12,
                color: '#000'
            }}>{children}</Text>
        </TouchableOpacity>
    );
}