import { View } from 'react-native';
// import Nav from '../components/Nav';

export default function DefaultPage({children}) {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#fff',
        }}>
            <View style={{
                flexGrow: 1,
                width: '100%',
                flex: 1,
                backgroundColor: '#033165',
            }}>{children}</View>
            {/* <Nav/> */}
        </View>
    );
}