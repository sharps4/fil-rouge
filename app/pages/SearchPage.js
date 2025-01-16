import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DefaultPage from './DefaultPage';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import Color from '../models/Color';
import Company from '../models/Company';

export default function SearchPage() {
    const navigation = useNavigation();

    const [search, setSearch] = useState('');
    const [sector, setSector] = useState('Tous');
    const [sectors, setSectors] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const process = async () => setCompanies(await Company.search(search, sector));
        process();
    }, [search, sector]);

    useEffect(() => {
        const process = async () => {
            const results = (await Company.findAllSectors()).map(result => result.activitySector);
            results.push('Tous');
            setSectors(results);
        }
        process();
    }, []);

    return (
        <DefaultPage>
            <TextInput
                style={{
                    marginBottom:    20,
                    padding:         10,
                    borderRadius:    20,
                    backgroundColor: Color.getCode('light'),
                    color:           Color.getCode('dark'),
                }}
                placeholder  = 'Rechercher un exposant'
                value        = { search }
                onChangeText = { (text) => setSearch(text) }
            />
            <Picker
                style         = {{
                    marginBottom:    20,
                    borderRadius:    20,
                    fontSize:        12,
                    backgroundColor: Color.getCode('light'),
                    color:           Color.getCode('dark'),
                }}
                selectedValue = { sector }
                onValueChange = { (value) => setSector(value) }
            >
                { sectors.map((sector, key) => <Picker.Item key={ key } label={ sector } value={ sector } />) }
            </Picker>
            <ScrollView>
                { companies.map((company, key) => (
                    <TouchableOpacity
                        key   = { key }
                        style = {{
                            flexDirection:   'row',
                            alignItems:      'center',
                            width:           '100%',
                            gap:             10,
                            marginBottom:    10,
                            padding:         10,
                            borderRadius:    5,
                            backgroundColor: Color.getCode('light'),
                        }}
                        onPress = { () => navigation.navigate('Company', { company: company.name }) }
                    >
                        <Image
                            source = {{ uri: company.logo }}
                            style  = {{
                                borderRadius: 2,
                                width:        30,
                                minHeight:    30,
                                maxHeight:    30,
                            }}
                        />
                        <Paragraph
                            type = 'dark'
                            bold = { true }
                        >{company.name}</Paragraph>
                    </TouchableOpacity>
                )) }
            </ScrollView>
        </DefaultPage>
    );
}