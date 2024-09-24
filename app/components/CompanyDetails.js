import { View, Linking } from 'react-native';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';
import TextButton from '../components/TextButton';
import COMPANIES from '../data/companies.json';

export default function CompanyDetails({name}) {
    const company = COMPANIES[name];

    return (
        <>
            <Title>{company.name}</Title>
            <Paragraph marge={5}>{company.description}</Paragraph>
            <Paragraph size='sm'>Source : {company.site}</Paragraph>
            <View style={{paddingBottom: 20}}>
                {
                    company.site ? (
                        <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 20}}>
                            <TextButton func={() => Linking.openURL(company.site)}>Voir le site de l'exposant</TextButton>
                        </View>
                    ) : null
                }
            </View>
        </>
    );
}