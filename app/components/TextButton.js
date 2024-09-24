import { TouchableOpacity, Text } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function TextButton({icon = null, bg = '#ed7a2f', fg='#fff', expand = false, func = null, children}) {
    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            paddingHorizontal: 20,
            paddingVertical: 10,
            width: expand ? '100%' : '',
            gap: 10,
            backgroundColor: bg,
        }} onPress={func}>
            <Text style={{
                fontSize: 16,
                color: fg,
                textAlign: 'center',
            }}>{children}</Text>
            {
                icon
                ? <FeatherIcon name={icon} size={16} color={fg}/>
                : null
            }
        </TouchableOpacity>
    );
}