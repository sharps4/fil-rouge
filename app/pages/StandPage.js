import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import DefaultPage from './DefaultPage';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import Stand from '../models/Stand';
import Company from '../models/Company';
import CompanyCarousel from '../components/CompanyCarousel';

export default function StandPage() {
    const route = useRoute();
    const navigation = useNavigation();

    const [stand, setStand] = useState(null);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const process = async () => {
            setStand(await Stand.findByName(route.params.stand));
            setCompanies(await Company.findByStand(route.params.stand));
        };
        process();
    }, [route]);

    return (
        <DefaultPage>
            <Button
                type    = 'light'
                onPress = { () => navigation.navigate(route.params.from) }
            >Retour</Button>
            <Paragraph
                size   = 'lg'
                bold   = { true }
                center = { true }
            >{route.stand}</Paragraph>
            <CompanyCarousel companies={companies}/>
        </DefaultPage>
    );
}