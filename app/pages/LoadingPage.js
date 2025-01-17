import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Paragraph from '../components/Paragraph';
import LHPDLogo from '../components/LHPDLogo';
import Database from '../Database';
import Color from '../models/Color';
import Company from '../models/Company';
import Credits from '../models/Credits';
import Game from '../models/Game';
import HangedMan from '../models/HangedMan';
import HangedManWord from '../models/HangedManWord';
import Intruder from '../models/Intruder';
import IntruderImage from '../models/IntruderImage';
import Map from '../models/Map';
import Quizz from '../models/Quizz';
import QuizzQuestion from '../models/QuizzQuestion';
import Setup from '../models/Setup';
import Stand from '../models/Stand';

export default function LoadingPage() {
    const navigation = useNavigation();

    const [message, setMessage] = useState('Recherche de mises à jour');
    const [loading, setLoading] = useState(0);

    const updateLoading = (i) => {
        i = (i+1)%4;
        setLoading(i);
        setTimeout(() => updateLoading(i), 500);
    };

    useEffect(() => {
        const process = async () => {
            await Database.init();
            const models = { Color, Company, Credits, Game, HangedMan, HangedManWord, Intruder, IntruderImage, Map, Quizz, QuizzQuestion, Stand };
            const entities = {};
            for (const model in models) await models[model].init();
            // fetch(`http://10.0.2.2/api?version=${Setup.version}`)
            fetch(`http://10.0.2.2/api?version=0`)
                .then(response => response.json())
                .then(json => {
                    if (json.status === 'new-version') {
                        setMessage('Mise à jour de la base de données');
                        for (const entity of json.data.entities) {
                            if (entities[entity.model] === undefined) entities[entity.model] = [];
                            entities[entity.model].push(models[entity.model].fromData(entity));
                        }
                        const updateDB = async () => {
                            Setup.fromData(json.data);
                            await Setup.update();
                            for (const model in entities) {
                                await models[model].deleteAll();
                                for (const entity of entities[model]) await entity.insert();
                            }
                            const stand = await Stand.findByName('Stand 1');
                            stand.visited = true;
                            await stand.update();
                        };
                        updateDB()
                            .then(() => navigation.navigate('Home'))
                            .catch(() => navigation.navigate('Home'));
                    }
                    else {
                        navigation.navigate('Home');
                    }
                })
                .catch(error => navigation.navigate('Home'));
        };
        updateLoading(0);
        process();
    }, []);

    return (
       <View style={{
           flex:            1,
           justifyContent:  'center',
           alignItems:      'center',
           gap:             40,
           backgroundColor: Color.getCode('primary'),
       }}>
           <LHPDLogo color={ Color.getCode('light') }/>
           <Paragraph>{' '.repeat(loading)}{message}{'.'.repeat(loading)}</Paragraph>
       </View>
    );
}