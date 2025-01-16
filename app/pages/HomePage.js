import { useEffect, useState } from 'react';
import { Linking, ScrollView, View } from 'react-native';
import DefaultPage from './DefaultPage';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import LHPDLogo from '../components/LHPDLogo';
import LMLogo from '../components/LMLogo';
import Color from '../models/Color';
import Credits from '../models/Credits';
import Setup from '../models/Setup';

export default function HomePage() {
    const [timer, setTimer] = useState('started');
    const [credits, setCredits] = useState([]);

    const updateTimer = () => {
        const waitingTime = Setup.getWaitingTime();
        if (typeof waitingTime === 'number') {
            const date = new Date(waitingTime);
            setTimer(`${parseInt(date.getTime()/1000/3600/24)}j ${date.getHours()}h ${date.getMinutes()}m ${date.getSeconds()}s`);
        }
        else {
            setTimer(waitingTime);
        }
        setTimeout(updateTimer, 1000);
    };

    useEffect(updateTimer, []);

    useEffect(() => {
        const process = async () => setCredits(await Credits.findAll());
        process();
    }, []);

    return (
        <DefaultPage padding={0}>
            <ScrollView>
                <View style={{
                    padding:                 30,
                    borderBottomRightRadius: 40,
                    backgroundColor:         Color.getCode('light'),
                }}>
                    <LHPDLogo
                        color = { Color.getCode('primary') }
                        style = {{
                            margin:       'auto',
                            marginBottom: 40,
                        }}
                    />
                    { Setup.description ? <Paragraph
                        type  = 'dark'
                        marge = { 20 }
                    >{Setup.description}</Paragraph> : null }
                    { Setup.site ? (
                        <View style={{
                            flex:           1,
                            flexDirection:  'row',
                            justifyContent: 'center',
                        }}>
                            <Button
                                type    = 'primary'
                                icon    = 'globe'
                                onPress = { () => Linking.openURL(Setup.site) }
                            >Voir le site de LH Port Days</Button>
                        </View>
                    ) : null }
                </View>
                { timer === 'started' ? null : (
                    <View style={{ padding: 30 }}>
                        { timer === 'nothing' ? (
                            <Paragraph
                                size   = 'lg'
                                center = { true }
                            >Aucun salon n'est prévu pour le moment</Paragraph>
                        ) : timer === 'finish' ? (
                            <Paragraph
                                size   = 'lg'
                                center = { true }
                            >Le salon est fini !</Paragraph>
                        ) : (
                            <>
                                <Paragraph
                                    size   = 'lg'
                                    center = { true }
                                    marge  = { 20 }
                                >Le salon commence dans :</Paragraph>
                                <Paragraph
                                    size   = 'xl'
                                    bold   = { true }
                                    center = { true }
                                >{timer}</Paragraph>
                            </>
                        ) }
                    </View>
                ) }
                <View style={{ padding: 30, paddingTop: 60 }}>
                    <Paragraph
                        center = { true }
                        marge  = { 30 }
                    >Cette application a été créée par les étudiants en troisième année de Bachelor à La Manu le Havre</Paragraph>
                    <LMLogo style={{ margin: 'auto', marginBottom: 30 }}/>
                    { credits.map((credit, key) => (
                        <Paragraph
                            key    = { key }
                            size   = 'sm'
                            center = { true }
                            marge  = { 5 }
                        >{credit.name} ({credit.rule})</Paragraph>
                    )) }
                </View>
            </ScrollView>
        </DefaultPage>
    );
}