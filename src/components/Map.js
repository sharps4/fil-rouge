import { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import MapStand from "./MapStand";
import Stand from "../db/models/Stand";

import React, { forwardRef } from 'react';
import { Modalize, ModalizeProps } from 'react-native-modalize';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export default function Map({name}) {
    const [cellSize, setCellSize] = useState(0);
    const [stands, setStands] = useState([]);

    useEffect(() => {
        const stands = Stand.findByMap(name);
        let width = 0;
        let height = 0;
        for (let stand of stands) {
            if (stand.x+stand.width > width) width = stand.x+stand.width;
            if (stand.y+stand.height > height) height = stand.y+stand.height;
        }
        setCellSize(width > height ? (windowWidth-40)/width : (windowWidth-40)/height);
        setStands(stands);
    }, [name]);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {stands.map((stand, key) => (
                <MapStand key={key} stand={stand} cellSize={cellSize}/>
            ))}
        </View>
    );
}