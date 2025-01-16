import { useState, useEffect } from 'react';
import { View } from 'react-native';
import Map from '../models/Map';
import Stand from '../models/Stand';
import DefaultPage from './DefaultPage';
import MapStand from '../components/MapStand';
import Paragraph from '../components/Paragraph';
import Pagination from '../components/Pagination';

export default function MapPage() {
    const [map, setMap] = useState(-1);
    const [maps, setMaps] = useState([]);
    const [stands, setStands] = useState([]);
    const [mapWidth, setMapWidth] = useState(0);
    const [mapHeight, setMapHeight] = useState(0);
    const [cellSize, setCellSize] = useState(0);
    const [dx, setDx] = useState(0);
    const [dy, setDy] = useState(0);

    const handlePrevious = () => setMap(map > 0 ? map-1 : maps.length-1);
    const handleNext = () => setMap(map < maps.length-1 ? map+1 : 0);

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
                flex:       1,
                alignItems: 'center',
            }}>
                <Paragraph
                    size='lg'
                    center={true}
                    marge={20}
                >{map === -1 ? 'Aucune carte disponible' : maps[map].name}</Paragraph>
                <View
                    style={{
                        flex:  1,
                        width: '100%',
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
                {map === -1 ? null : <Pagination
                    index      = { map }
                    total      = { maps.length }
                    onPrevious = { handlePrevious }
                    onNext     = { handleNext }
                />}
            </View>
        </DefaultPage>
    );
}