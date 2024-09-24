import { useEffect, useState, useCallback } from 'react';
import { Dimensions, View, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DefaultPage from './DefaultPage';
import Paragraph from '../components/Paragraph';
import TextButton from '../components/TextButton';
import STANDS from '../data/stands.json';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MapPage({navigation}) {
    const [isFocused, setFocused] = useState(false);
    const [states, setStates] = useState(null);
    const [path, setPath] = useState(null);
    const [stands, setStands] = useState(null);

    const width = windowWidth-40;
    const height = (windowWidth-40)*(STANDS.map.height/STANDS.map.width);

    useEffect(() => {
        setPath(null);
        setStands(null);
        const getData = async () => {
            let value = await AsyncStorage.getItem('stands');
            if (value) {setStates(JSON.parse(value));}
            else {
                let result = {};
                for (let stand in STANDS.stands) {result[stand] = {scanned: false, validate: STANDS.stands[stand].game === undefined, nPlays: 0};}
                setStates(result);
                await AsyncStorage.setItem('stands', JSON.stringify(result));
            }
            value = await AsyncStorage.getItem('path');
            if (value) {setPath(JSON.parse(value));}
        }
        getData();
    }, [isFocused]);

    useFocusEffect(
        useCallback(() => {
            setFocused(true);
            return () => {setFocused(false);}
        }, [])
    );

    useEffect(() => {
        let cellSize = width/STANDS.map.width;
        if (height/STANDS.map.height < cellSize) {cellSize = height/STANDS.map.height;}
        let offsetX = width-cellSize*STANDS.map.width;
        let offsetY = height-cellSize*STANDS.map.height;
        let elements = [];
        let i = 0;
        for (let stand in STANDS.stands) {
            data = STANDS.stands[stand];
            elements.push((
                <TouchableOpacity
                    key={i}
                    style={{
                        position: 'absolute',
                        left: offsetX+data.from.x*cellSize,
                        top: offsetY+data.from.y*cellSize,
                        width: (data.to.x-data.from.x+1)*cellSize+1,
                        height: (data.to.y-data.from.y+1)*cellSize+1,
                    }}
                    onPress={() => navigation.navigate('Stand', {stand: stand, from: 'Map'})}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#000',
                        backgroundColor: (
                            states ? (
                                states[stand].scanned
                                ? (states[stand].validate ? '#0f0' : '#ed7a2f')
                                : path ? (
                                    stand === path.stands[path.stage]
                                    ? '#7f7fff'
                                    : path.stands.includes(stand)
                                    ? '#f00'
                                    : '#fff'
                                ) : '#fff'
                            ) : '#fff'
                        ),
                    }}>
                        <Text style={{
                            fontSize: cellSize/2,
                            textAlign: 'center',
                            color: '#000',
                        }}>{stand}</Text>
                    </View>
                </TouchableOpacity>
            ));
            i++;
        }
        if (path && path.stage > 0) {
            const createLine = (a, b) => {
                return (
                    <View
                        key={i}
                        style={{
                            position: 'absolute',
                            left: offsetX+((a.x <= b.x ? a.x : b.x)+0.5)*cellSize-(a.x === b.x),
                            top: offsetY+((a.y <= b.y ? a.y : b.y)+0.5)*cellSize-(a.y === b.y),
                            width: a.x === b.x ? 2 : Math.abs(a.x-b.x)*cellSize,
                            height: a.y === b.y ? 2 : Math.abs(a.y-b.y)*cellSize,
                            backgroundColor: '#7f7fff',
                        }}
                    />
                );
            };
            let p = path.path[path.stage-1];
            let stand = STANDS.stands[path.stands[path.stage-1]];
            if (stand.from.y <= p[0].y && p[0].y <= stand.to.y ) {
                if (stand.from.x < p[0].x) {elements.push(createLine({x: p[0].x-0.5, y: p[0].y}, p[0]));}
                else {elements.push(createLine({x: p[0].x+0.5, y: p[0].y}, p[0]));}
            }
            else {
                if (stand.from.y < p[0].y) {elements.push(createLine({x: p[0].x, y: p[0].y-0.5}, p[0]));}
                else {elements.push(createLine({x: p[0].x, y: p[0].y+0.5}, p[0]));}
            }
            i++;
            stand = STANDS.stands[path.stands[path.stage]];
            if (stand.from.y <= p[p.length-1].y && p[p.length-1].y <= stand.to.y ) {
                if (stand.from.x < p[p.length-1].x) {elements.push(createLine({x: p[p.length-1].x-0.5, y: p[p.length-1].y}, p[p.length-1]));}
                else {elements.push(createLine({x: p[p.length-1].x+0.5, y: p[p.length-1].y}, p[p.length-1]));}
            }
            else {
                if (stand.from.y < p[p.length-1].y) {elements.push(createLine({x: p[p.length-1].x, y: p[p.length-1].y-0.5}, p[p.length-1]));}
                else {elements.push(createLine({x: p[p.length-1].x, y: p[p.length-1].y+0.5}, p[p.length-1]));}
            }
            i++;
            for (let j = 0; j < p.length-1; j++) {
                elements.push(createLine(p[j], p[j+1]));
                i++;
            }
        }
        setStands(elements);
    }, [states, path]);

    return (
        <DefaultPage navigation={navigation}>
            <View style={{flex: 1, padding: 20}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={{
                        width: width,
                        height: height,
                    }}>{stands}</View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 10,
                    paddingBottom: 20,
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                        <View style={{width: 10, minHeight: 10, maxHeight: 10, backgroundColor: '#ed7a2f'}}/>
                        <Paragraph size='sm'>Stand non validé</Paragraph>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                        <View style={{width: 10, minHeight: 10, maxHeight: 10, backgroundColor: '#0f0'}}/>
                        <Paragraph size='sm'>Stand validé</Paragraph>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                        <View style={{width: 10, minHeight: 10, maxHeight: 10, backgroundColor: '#7f7fff'}}/>
                        <Paragraph size='sm'>Prochain stand</Paragraph>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                        <View style={{width: 10, minHeight: 10, maxHeight: 10, backgroundColor: '#f00'}}/>
                        <Paragraph size='sm'>Stands suivants</Paragraph>
                    </View>
                </View>
                {
                    path ? (
                        <Paragraph center={true}>{
                            path.stage === 0
                            ? 'Pour commencer rendez-vous au stand '+path.stands[0]+' et scannez le QR code'
                            : 'Continuez vers le stand '+path.stands[path.stage]+' et scannez le QR code'
                        }</Paragraph>
                    ) : null
                }
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 20,
            }}>
                <TextButton func={() => navigation.navigate('Paths')}>Choisir un parcours</TextButton>
            </View>
        </DefaultPage>
    );
}