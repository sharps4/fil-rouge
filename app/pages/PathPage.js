import { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DefaultPage from './DefaultPage';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';
import IconButton from '../components/IconButton';
import TextButton from '../components/TextButton';
import CompanyCarousel from '../components/CompanyCarousel';
import PATHS from '../data/paths.json';
import STANDS from '../data/stands.json';

export default function StandPage({route, navigation}) {
    const [isFocused, setFocused] = useState(false);
    const [selected, setSelected] = useState(false);
    const [states, setStates] = useState(null);

    const data = PATHS[route.params.id];

    useEffect(() => {
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
            if (value) {
                value = JSON.parse(value);
                setSelected(value.id === route.params.id);
            }
        }
        getData();
    }, [isFocused]);

    useFocusEffect(
        useCallback(() => {
            setFocused(true);
            return () => {setFocused(false);}
        }, [])
    );

    const handleSelect = async () => {
        if (selected) {await AsyncStorage.removeItem('path');}
        else {
            let grid = [];
            let search = [];
            for (let y = 0; y < STANDS.map.height; y++) {
                grid.push([]);
                search.push([]);
                for (let x = 0; x < STANDS.map.width; x++) {
                    grid[y].push(null);
                    search[y].push(0);
                }
            }
            for (let stand in STANDS.stands) {
                for (let y = STANDS.stands[stand].from.y; y <= STANDS.stands[stand].to.y; y++) {
                    for (let x = STANDS.stands[stand].from.x; x <= STANDS.stands[stand].to.x; x++) {
                        grid[y][x] = stand;
                    }
                }
            }
            let queue = [];
            let path = [];
            let i = parseInt(Math.random()*data.stands.length);
            for (let j = 0; j < data.stands.length; j++) {
                if (!states[data.stands[i]].scanned) {queue.push(data.stands[i]);}
                i++;
                if (i === data.stands.length) {i = 0;}
            }
            if (queue.length > 0)
            {
                for (let j = 0; j < queue.length-1; j++) {
                    for (let y = 0; y < STANDS.map.height; y++) {for (let x = 0; x < STANDS.map.width; x++) {search[y][x] = 0;}}
                    if (j === 0) {
                        let from = STANDS.stands[queue[j]].from;
                        let to = STANDS.stands[queue[j]].to;
                        for (let x = from.x; x <= to.x; x++) {
                            if (from.y > 0 && grid[from.y-1][x] === null) {search[from.y-1][x] = 1;}
                            if (to.y < STANDS.map.height-1 && grid[to.y+1][x] === null) {search[to.y+1][x] = 1;}
                        }
                        for (let y = from.y; y <= to.y; y++) {
                            if (from.x > 0 && grid[y][from.x-1] === null) {search[y][from.x-1] = 1;}
                            if (to.x < STANDS.map.width-1 && grid[y][to.x+1] === null) {search[y][to.x+1] = 1;}
                        }
                    }
                    else {search[path[j-1][path[j-1].length-1].y][path[j-1][path[j-1].length-1].x] = 1;}
                    let found = false;
                    let stage = 1;
                    let reversePath = [];
                    while (!found) {
                        for (let y = 0; y < STANDS.map.height; y++) {
                            for (let x = 0; x < STANDS.map.width; x++) {
                                if (search[y][x] === stage) {
                                    for (let c of [{x: x-1, y: y}, {x: x+1, y: y}, {x: x, y: y-1}, {x: x, y: y+1}]) {
                                        if (
                                            0 <= c.x && c.x < STANDS.map.width &&
                                            0 <= c.y && c.y < STANDS.map.height &&
                                            search[c.y][c.x] === 0
                                        ) {
                                            if (grid[c.y][c.x] === null) {search[c.y][c.x] = stage+1;}
                                            else if (grid[c.y][c.x] === queue[j+1]) {
                                                reversePath.push({x: x, y: y});
                                                found = true;
                                            }
                                        }
                                        if (found) {break;}
                                    }
                                }
                                if (found) {break;}
                            }
                            if (found) {break;}
                        }
                        stage++;
                    }
                    for (let k = 0; k < stage-2; k++) {
                        let stage = reversePath[reversePath.length-1];
                        for (let c of [{x: stage.x-1, y: stage.y}, {x: stage.x+1, y: stage.y}, {x: stage.x, y: stage.y-1}, {x: stage.x, y: stage.y+1}]) {
                            if (
                                0 <= c.x && c.x < STANDS.map.width &&
                                0 <= c.y && c.y < STANDS.map.height &&
                                search[c.y][c.x] === search[stage.y][stage.x]-1
                            ) {
                                reversePath.push({x: c.x, y: c.y});
                                break;
                            }
                        }
                    }
                    path.push([]);
                    for (let k = reversePath.length-1; k >= 0; k--) {path[path.length-1].push(reversePath[k]);}
                }
                await AsyncStorage.setItem('path', JSON.stringify({
                    id: route.params.id,
                    stands: queue,
                    path: path,
                    stage: 0,
                }));
            }
        }
        navigation.navigate('Map');
    };

    

    let companies = [];
    for (let i of data.stands) {
        for (let j of STANDS.stands[i].companies) {
            companies.push(j);
        }
    }

    return (
        <DefaultPage navigation={navigation}>
            <ScrollView style={{paddingHorizontal: 20}}>
                <View style={{paddingTop: 40}}/>
                <IconButton icon='arrow-left' func={() => navigation.navigate('Paths')}/>
                <Title>{data.name}</Title>
                <Paragraph marge={10}>{data.description}</Paragraph>
                <CompanyCarousel companies={companies} navigation={navigation} from={['Path', route.params.id]}/>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingVertical: 20,
                }}>
                    <TextButton func={handleSelect}>{selected ? 'Abandonner le parcours' : 'Sélectionner le parcours'}</TextButton>
                </View>
            </ScrollView>
        </DefaultPage>
    );
}