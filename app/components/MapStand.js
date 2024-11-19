import { View, TouchableOpacity, Text } from 'react-native';

export default function MapStand({key, stand, cellSize}) {
    console.log(stand);
    return (
        <TouchableOpacity
            key={key}
            style={{
                position: 'absolute',
                left: stand.x*cellSize,
                top: stand.y*cellSize,
                width: stand.width*cellSize,
                height: stand.height*cellSize
            }}
            // onPress={() => navigation.navigate('Stand', {stand: stand, from: 'Map'})}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#000',
                backgroundColor: '#fff'
            }}>
                <Text style={{
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#000',
                }}>{stand.name}</Text>
            </View>
        </TouchableOpacity>
    );
}