import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, ScrollView, Linking, Image } from 'react-native';
import DefaultPage from './DefaultPage';
import Button from '../components/Button';
import Company from '../models/Company';
import Paragraph from '../components/Paragraph';

export default function CompanyPage() {
    const route = useRoute();
    const navigation = useNavigation();

    const [company, setCompany] = useState(null);

    useEffect(() => {
        const process = async () => {
            setCompany(await Company.findByName(route.params.company));
        };
        process();
    }, [route]);

    return (
        <DefaultPage>
            <ScrollView>
                {company ? <>
                    <Button
                        size    = 'sm'
                        type    = 'light'
                        onPress = { () => navigation.navigate('Stand', { stand: company.stand, from: 'Map' }) }
                    >Retour</Button>
                    <View style={{ padding: 20 }}>
                        <Paragraph
                            size   = 'lg'
                            bold   = { true }
                            center = { true }
                            marge  = { 40 }
                        >{company.name}</Paragraph>
                        <Image
                            source = {{ uri: company.logo }}
                            style  = {{
                                width:        100,
                                minHeight:    100,
                                maxHeight:    100,
                                margin:       'auto',
                                marginBottom: 40,
                            }}
                        />
                        <Paragraph marge = { 40 }>{company.description}</Paragraph>
                        {company.site ? <Button
                            type    = 'secondary'
                            icon    = 'globe'
                            center  = 'center'
                            onPress = { () => Linking.openURL(company.site) }
                        >Voir le site de l'entreprise</Button> : null}
                    </View>
                </> : null}
            </ScrollView>
        </DefaultPage>
    );
}