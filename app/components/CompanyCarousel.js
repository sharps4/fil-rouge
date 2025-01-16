import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Image } from 'react-native';
import Paragraph from './Paragraph';
import Button from './Button';
import Pagination from './Pagination';
import CompanyCard from './CompanyCard';
import Color from '../models/Color';

export default function CompanyCarousel({ companies }) {
    const navigation = useNavigation();

    const [view, setView] = useState(0);

    const handlePrevious = () => setView(view === 0 ? companies.length-1 : view-1);
    const handleNext = () => setView(view === companies.length-1 ? 0 : view+1);

    return (
        <View style={{
            alignItems: 'center',
            gap: 10,
        }}>
            { companies.length === 0 ? null : <>
                <View style={{
                    alignItems:      'center',
                    gap:             10,
                    width:           '100%',
                    padding:         20,
                    borderRadius:    10,
                    backgroundColor: Color.getCode('light'),
                }}>
                    {
                        companies[view].logo
                        ? (
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source = {{ uri: companies[view].logo }}
                                    style  = {{
                                        borderRadius: 5,
                                        width:        60,
                                        minHeight:    60,
                                        maxHeight:    60,
                                    }}
                                />
                            </View>
                        ) : null
                    }
                    <Paragraph
                        size   = 'lg'
                        type   = 'dark'
                        bold   = { true }
                        center = { true }
                        marge  = { 10 }
                    >{companies[view].name}</Paragraph>
                    <View style={{
                        flexDirection:  'row',
                        justifyContent: 'center',
                    }}>
                        <Button onPress = { () => navigation.navigate('Company', { company: companies[view].name }) }>En savoir plus</Button>
                    </View>
                </View>
                <Pagination
                    index      = { view }
                    total      = { companies.length }
                    onPrevious = { handlePrevious }
                    onNext     = { handleNext }
                />
            </> }
        </View>
    );
}