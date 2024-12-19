import { Text } from 'react-native';
import Color from '../models/Color';

export default function Paragraph({
    size   = 'md',
    type   = 'light',
    bold   = false,
    center = false,
    marge  = 0,
    children,
}) {
    return <Text style={{
        fontFamily:   'Roboto',
        fontSize:     size === 'sm' ? 14 : size === 'md' ? 16 : 24,
        color:        Color.getCode(type),
        fontWeight:   bold ? 'bold' : 'normal',
        textAlign:    center ? 'center' : 'left',
        marginBottom: marge,
    }}>{children}</Text>
}