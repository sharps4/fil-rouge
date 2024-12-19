import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Paragraph from '../components/Paragraph';
import Logo from '../components/Logo';
import Database from '../Database';
import Color from '../models/Color';
import Company from '../models/Company';
import Credits from '../models/Credits';
import Map from '../models/Map';
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
            const models = { Color, Company, Credits, Map, Setup, Stand };
            const entities = {};
            for (const model in models) await models[model].init();
            fetch(`http://10.0.2.2/api?version=${Setup.version}`)
                .then(response => response.json())
                .then(json => {
                    if (json.status === 'new-version') {
                        setMessage('Mise à jour de la base de données');
                        for (const data of json.entities) {
                            if (entities[data.model] === undefined) entities[data.model] = [];
                            entities[data.model].push(models[data.model].fromData(data));
                        }
                        const updateDB = async () => {
                            Setup.version = json.version;
                            for (const model in entities) {
                                if (model !== 'Setup') {
                                    await models[model].deleteAll();
                                    for (const entity of entities[model]) await entity.insert();
                                }
                            }
                            await Setup.update();
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
           <Logo color={ Color.getCode('light') }/>
           <Paragraph>{' '.repeat(loading)}{message}{'.'.repeat(loading)}</Paragraph>
       </View>
    );
}