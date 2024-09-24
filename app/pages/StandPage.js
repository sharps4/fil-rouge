import { useEffect, useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DefaultPage from './DefaultPage';
import Title from '../components/Title';
import IconButton from '../components/IconButton';
import TextButton from '../components/TextButton';
import CompanyDetails from '../components/CompanyDetails';
import CompanyCarousel from '../components/CompanyCarousel';
import Game from '../components/Game';
import STANDS from '../data/stands.json';

export default function StandPage({route, navigation}) {
    const [isFocused, setFocused] = useState(false);
    const [states, setStates] = useState(null);
    const [path, setPath] = useState(null);
    const [validate, setValidate] = useState(false);

    const stand = STANDS.stands[route.params.stand];

    useEffect(() => {
        const getData = async () => {
            let value = await AsyncStorage.getItem('stands');
            if (value) {
                value = JSON.parse(value);
                setStates(value);
                setValidate(value[route.params.stand].validate);
            }
            else {
                let result = {};
                for (let stand in STANDS.stands) {result[stand] = {scanned: false, validate: STANDS.stands[stand].game === undefined, nPlays: 0};}
                setStates(result);
                await AsyncStorage.setItem('stands', JSON.stringify(result));
                setValidate(result[route.params.stand].validate);
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

    const handleValidate = async (win) => {
        if (states[route.params.stand].validate === false) {
            states[route.params.stand].nPlays++;
            if (win) {
                states[route.params.stand].validate = true;
                await AsyncStorage.setItem('score', (parseInt(await AsyncStorage.getItem('score'))+parseInt(20/states[route.params.stand].nPlays)).toString());
            }
            await AsyncStorage.setItem('stands', JSON.stringify(states));
        }
        setValidate(win);
    };

    const handleBack = () => {
        if (route.params.from === 'Map') {navigation.navigate('Map');}
        else if (route.params.from[0] === 'Path') {navigation.navigate('Path', {id: route.params.from[1]});}
    };

    return (
        <DefaultPage navigation={navigation}>
            <ScrollView style={{paddingHorizontal: 20}}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 40,
                    paddingBottom: 20,
                }}>
                    <IconButton icon='arrow-left' func={handleBack}/>
                    {
                        states ? <TextButton
                            icon={
                                !states[route.params.stand].scanned
                                ? 'maximize'
                                : validate
                                ? 'check'
                                : 'more-horizontal'}
                            bg={
                                !states[route.params.stand].scanned
                                ? (
                                    path && path.stands.includes(route.params.stand)
                                    ? '#f00'
                                    : '#7f7fff'
                                )
                                : validate
                                ? '#0f0'
                                : '#ed7a2f'
                            }
                            func={
                                states[route.params.stand].scanned
                                ? null
                                : () => navigation.navigate('Scanner')
                            }
                        >{
                            !states[route.params.stand].scanned
                            ? 'Scanner le QR code'
                            : validate
                            ? 'Stand validé'
                            : 'Validez le mini-jeu'
                        }</TextButton> : null
                    }
                </View>
                <Title>Stand {route.params.stand}</Title>
                {
                    stand.companies.length == 1
                    ? <CompanyDetails name={stand.companies[0]}/>
                    : (
                        <View style={{paddingBottom: 40}}>
                            <CompanyCarousel companies={stand.companies} navigation={navigation} from={['Stand', route.params.stand, route.params.from]}/>
                        </View>
                    )
                }
                {
                    states && states[route.params.stand].scanned && stand.game
                    ? <Game name={stand.game} navigation={navigation} handleValidate={handleValidate}/>
                    : null
                }
                <View style={{paddingBottom: 20}}/>
            </ScrollView>
        </DefaultPage>
    );
}