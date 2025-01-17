import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { View, ScrollView } from 'react-native';
import DefaultPage from './DefaultPage';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import Stand from '../models/Stand';
import Company from '../models/Company';
import Game from '../models/Game';
import CompanyCarousel from '../components/CompanyCarousel';
import QuizzComponent from '../games/QuizzComponent';
import IntruderComponent from '../games/IntruderComponent';
import HangedManComponent from '../games/HangedManComponent';
import TetrisComponent from '../games/TetrisComponent';

export default function StandPage() {
    const route = useRoute();
    const navigation = useNavigation();

    const ref = useRef(null);

    const [stand, setStand] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [game, setGame] = useState(null);

    const loadGame = async name => setGame(await Game.findByStand(name));

    const handleEndGame = async score => {
        game.played = true;
        if (score > game.score) game.score = score;
        await game.update();
        await loadGame(stand.name);
    }

    useEffect(() => {
        const process = async () => {
            const s = await Stand.findByName(route.params.stand)
            setStand(s);
            if (s) {
                setCompanies(await Company.findByStand(s.name));
                loadGame(s.name);
            }
        };
        process();
    }, [route]);

    const status = (
        stand === null || !stand.visited
        ? {
            color:    'error',
            iconSet:  'AntDesign',
            icon:     'qrcode',
            text:     'Scanner le QR code',
            callback: () => navigation.navigate('Scanner'),
        } : game && !game.played
        ? {
            color:    'warning',
            iconSet:  'FontAwesome',
            icon:     'gamepad',
            text:     'Jouer au mini-jeu',
            callback: () => ref.current.scrollToEnd({animated: true}),
        } : {
            color:    'valid',
            iconSet:  'Feather',
            icon:     'check',
            text:     'Stand validé',
            callback: null,
        }
    );

    return (
        <DefaultPage>
            <ScrollView ref={ ref }>
                <View style={{
                    flexDirection:  'row',
                    justifyContent: 'space-between',
                    marginBottom:   40,
                }}>
                    <Button
                        type    = 'light'
                        onPress = { () => navigation.navigate(route.params.from) }
                    >Retour</Button>
                    {
                        stand
                        ? <Button
                            type    = { status.color }
                            iconSet = { status.iconSet }
                            icon    = { status.icon }
                            onPress = { status.callback }
                        >{ status.text }</Button>
                        : null
                    }
                </View>
                {
                    stand
                    ? <>
                        <Paragraph
                            size   = 'lg'
                            bold   = { true }
                            center = { true }
                            marge  = { 20 }
                        >{stand.name}</Paragraph>
                        <CompanyCarousel companies={companies}/>
                        {
                            stand.visited && game ? (
                                <View style={{
                                    marginTop: 40,
                                    padding:   20,
                                }}>
                                    {
                                        game.type === 'Quizz'
                                        ? <QuizzComponent id={ game.gameId } handleEnd={ handleEndGame }/>
                                        : game.type === 'Intruder'
                                        ? <IntruderComponent id={ game.gameId } handleEnd={ handleEndGame }/>
                                        : game.type === 'HangedMan'
                                        ? <HangedManComponent id={ game.gameId } handleEnd={ handleEndGame }/>
                                        : game.type === 'Tetris'
                                        ? <TetrisComponent id={ game.gameId } handleEnd={ handleEndGame }/>
                                        : null
                                    }
                                </View>
                             ) : null
                        }
                    </>
                    : null
                }
            </ScrollView>
        </DefaultPage>
    );
}