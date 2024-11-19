import { useEffect, useState } from "react";
import { Dimensions, View, Text } from "react-native";
import MapStand from "./MapStand";
import Stand from "../db/models/Stand";

const windowWidth = Dimensions.get('window').width;

export default function Map({name}) {
    const [cellSize, setCellSize] = useState(0);
    const [stands, setStands] = useState([]);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        Stand.findByMap(name).then(stands => {
            let width = 0;
            let height = 0;
            for (let stand of stands) {
                if (stand.x+stand.width > width) width = stand.x+stand.width;
                if (stand.y+stand.height > height) height = stand.y+stand.height;
            }
            setCellSize(width > height ? (windowWidth-40)/width : (windowWidth-40)/height);
            setStands(stands);
            setWidth(windowWidth);
            setHeight(height/width*windowWidth);
        });
    }, [name]);

    return (
        <View style={{ flex: 1 }}>
            <Text style={{
                fontSize: 20,
                textAlign: 'center',
                color: '#fff',
                backgroundColor: '#000'
            }}>{name} {stands.length}</Text>
            <View style={{
                width: width,
                height: height,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#333'
            }}>
                {stands.map((stand, key) => <MapStand key={key} stand={stand} cellSize={cellSize}/>)}
            </View>
        </View>
    );
}