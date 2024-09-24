import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import IconButton from '../components/IconButton';

export default function Nav({navigation}) {
    const route = useRoute();
    const icons = ['home', 'camera', 'map', 'info'];
    const pages = ['Main', 'Scanner', 'Map', 'Info'];

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
            width: '100%',
            backgroundColor: '#fff',
        }}>
            {
                icons.map((icon, i) => <IconButton
                    key={i}
                    icon={icon}
                    fg={pages[i] === route.name ? '#000' : '#aaa'}
                    func={() => navigation.navigate(pages[i])}
                />)
            }
        </View>
    );
}