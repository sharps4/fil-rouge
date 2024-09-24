import { Text } from 'react-native';

export default function Paragraph({size = 'md', color = '#fff', marge = 0, bold = false, center = false, children}) {
    return <Text style={{
        marginBottom: marge,
        fontFamily: 'Roboto',
        fontWeight: bold ? 'bold' : 'normal',
        fontSize: size === 'sm' ? 12 : size === 'md' ? 16 : 20,
        textAlign: center ? 'center' : 'left',
        color: color,
    }}>{children}</Text>
}