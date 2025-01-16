import { TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Paragraph from './Paragraph';
import Color from '../models/Color';

export default function Button({
    size    = 'md',
    type    = 'primary',
    hasBg   = true,
    icon    = null,
    iconSet = 'Feather',
    center  = false,
    onPress = null,
    children,
}) {
    const fg = hasBg ? (
        type === 'light'
        ? 'dark'
        : 'light'
    ) : type;

    const Icon = (
        iconSet === 'Feather'
        ? FeatherIcon
        : iconSet === 'FontAwesome'
        ? FontAwesomeIcon
        : iconSet === 'AntDesign'
        ? AntDesignIcon
        : null
    );

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
            { icon ? <Icon
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