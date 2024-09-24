import { Text } from 'react-native';

export default function Title({color = '#fff', children}) {
    return <Text style={{
        marginBottom: 20,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        color: color,
    }}>{children}</Text>
}