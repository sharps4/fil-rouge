import { TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Paragraph from './Paragraph';
import Color from '../models/Color';

export default function Button({
    size    = 'md',
    type    = 'primary',
    hasBg   = true,
    icon    = null,
    center  = false,
    onPress = null,
    children,
}) {
    const fg = hasBg ? (
        type === 'light'
        ? 'dark'
        : 'light'
    ) : type;

    return (
        <TouchableOpacity style={{
            alignSelf:         'flex-start',
            flexDirection:     'row',
            justifyContent:    'center',
            alignItems:        'center',
            gap:               8,
            margin:            center ? 'auto' : 0,
            paddingHorizontal: children ? 15 : 5,
            paddingVertical:   children ? 8 : 5,
            borderRadius:      5,
            backgroundColor:   hasBg ? Color.getCode(type) : null,
        }} onPress={onPress}>
            { icon ? <FeatherIcon
                name  = { icon }
                size  = { size === 'sm' ? 20 : size === 'md' ? 24 : 28 }
                color = { Color.getCode(fg) }
            /> : null }
            { children ? <Paragraph 
                size = { size }
                type = { fg }
            >{children}</Paragraph> : null }
        </TouchableOpacity>
    );
}