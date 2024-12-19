import { useNavigation } from '@react-navigation/native';
import { View, Image } from "react-native";
import Paragraph from './Paragraph';
import Button from './Button';

export default function CompanyCard({ company }) {
    const navigation = useNavigation();

    return (
        <View style={{
            borderRadius:    10,
            padding:         20,
            backgroundColor: '#fff',
            overflow:        'hidden',
            alignItems:      'center',
            gap:             10,
            width:           '100%',
        }}>
            {
                company.logo
                ? (
                    <View style={{alignItems: 'center'}}>
                        <Image
                            source = {{ uri: company.logo }}
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
            >{company.name}</Paragraph>
            <View style={{
                flexDirection:  'row',
                justifyContent: 'center',
            }}>
                <Button
                    onPress = { () => navigation.navigate('Company', { company: company.name })
                    }
                >En savoir plus</Button>
            </View>
        </View>
    )
}