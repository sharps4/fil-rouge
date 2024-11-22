import { useState, useEffect } from 'react';
import { View, Text } from "react-native";
import DefaultPage from './DefaultPage';
import MapStand from '../components/MapStand';
import Map from '../models/Map';
import Stand from '../models/Stand';
import Button from '../components/Button';

export default function MapPage() {
    const [map, setMap] = useState(-1);
    const [maps, setMaps] = useState([]);
    const [stands, setStands] = useState([]);
    const [mapWidth, setMapWidth] = useState(0);
    const [mapHeight, setMapHeight] = useState(0);
    const [cellSize, setCellSize] = useState(0);
    const [dx, setDx] = useState(0);
    const [dy, setDy] = useState(0);

    useEffect(() => {
        Map.findAll().then(maps => {
            setMaps(maps);
            if (maps.length > 0) setMap(0);
        });
    }, []);

    useEffect(() => {
        if (map !== -1) {
            Stand.findByMap(maps[map].name).then(stands => {
                if (stands.length > 0) {
                    let width = 0;
                    let height = 0;
                    for (let stand of stands) {
                        if (stand.x+stand.width > width) width = stand.x+stand.width;
                        if (stand.y+stand.height > height) height = stand.y+stand.height;
                    }
                    let cellSize = mapWidth/width;
                    if (mapHeight/height < cellSize) cellSize = mapHeight/height;
                    setCellSize(cellSize);
                    setDx((mapWidth-cellSize*width)/2);
                    setDy((mapHeight-cellSize*height)/2);
                    setStands(stands);
                }
            });
        }
    }, [map, mapWidth, mapHeight]);

    return (
        <DefaultPage>
            <View style={{
                flex: 1,
                alignItems: 'center'
            }}>
                <Text style={{
                    width: '100%',
                    fontSize: 20,
                    textAlign: 'center',
                    color: '#fff',
                    backgroundColor: '#000'
                }}>{map === -1 ? 'Aucune carte disponible' : maps[map].name}</Text>
                <View
                    style={{
                        flex: 1,
                        width: '100%'
                    }}
                    onLayout={(event) => {
                        const {width, height} = event.nativeEvent.layout;
                        setMapWidth(width);
                        setMapHeight(height);
                    }}
                >{
                    map === -1
                    ? null
                    : stands.map((stand, key) => <MapStand key={key} stand={stand} cellSize={cellSize} dx={dx} dy={dy}/>)
                }</View>
                {map === -1 ? null : (
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Button onPress={() => {
                            if (map > 0) setMap(map-1);
                            else setMap(maps.length-1);
                        }}>Précédent</Button>
                        <Text>{map+1}/{maps.length}</Text>
                        <Button onPress={() => {
                            if (map < maps.length-1) setMap(map+1);
                            else setMap(0);
                        }}>Suivant</Button>
                    </View>
                )}
            </View>
        </DefaultPage>
    );
}