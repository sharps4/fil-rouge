import { View, Image } from "react-native";
import Paragraph from '../components/Paragraph';
import TextButton from '../components/TextButton';
import COMPANIES from '../data/companies.json';

export default function CompanyCard({name, navigation, from}) {
    const company = COMPANIES[name];

    return (
        <View style={{
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#fff',
            overflow: 'hidden',
            alignItems: 'center',
            gap: 10,
            width: '100%',
        }}>
            {
                company.logo
                ? (
                    <View style={{alignItems: 'center'}}>
                        <Image
                            source={{uri: company.logo}}
                            style={{borderRadius: 5, width: 60, minHeight: 60, maxHeight: 60}}
                        />
                    </View>
                ) : null
            }
            <Paragraph color='#000' bold={true} size='lg' center={true}>{company.name}</Paragraph>
            {
                company.slogan
                ? <Paragraph color='#000' center={true}>« {company.slogan} »</Paragraph>
                : null
            }
            <TextButton
                icon='arrow-right'
                bg='#aaa'
                fg='#000'
                func={() => navigation.navigate('Company', {company: name, from: from})}
            >En savoir plus</TextButton>
        </View>
    )
}