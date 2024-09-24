import { TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function TextButton({icon, bg = '#fff', fg = '#000', func = null}) {
    return (
        <TouchableOpacity style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-start',
            borderRadius: 100,
            padding: 10,
            backgroundColor: bg,
        }} onPress={func}>
            <FeatherIcon name={icon} size={24} color={fg}/>
        </TouchableOpacity>
    );
}