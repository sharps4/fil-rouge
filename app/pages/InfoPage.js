import { ScrollView, View } from 'react-native';
import DefaultPage from './DefaultPage';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';

export default function InfoPage({navigation}) {
    return (
        <DefaultPage navigation={navigation}>
            <ScrollView style={{paddingHorizontal: 20}}>
                <View style={{paddingTop: 40}}/>
                <Title>Conditions générales d'utilisation</Title>
                <Paragraph marge={20}>LH PORT DAYS est une marque déposée. Elle est la propriété de l’UMEP, Union Maritime et Portuaire du Havre.</Paragraph>
                <Paragraph marge={20}>« LH PORT DAYS, l’application ! » est une application a but pédagogique, gratuite, développée par La Manu dans le cadre d’un partenariat avec l’UMEP.</Paragraph>
                <Paragraph marge={20}>Plus d’informations : www.lhportdays.fr</Paragraph>
                <Paragraph marge={20}>Photos droits réservés : © UMEP et © E. HOURI</Paragraph>
                <Paragraph>UMEP</Paragraph>
                <Paragraph>181 quai Frissard</Paragraph>
                <Paragraph>BP 1021</Paragraph>
                <Paragraph>76061 LE HAVRE Cedex</Paragraph>
                <Paragraph>02 35 19 21 75</Paragraph>
                <View style={{paddingBottom: 20}}/>
            </ScrollView>
        </DefaultPage>
    );
}