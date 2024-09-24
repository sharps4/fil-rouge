import { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';
import DefaultPage from './DefaultPage';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';
import CompanyCarousel from '../components/CompanyCarousel';
import COMPANIES from '../data/companies.json';

export default function MainPage({navigation}) {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        let result = [];
        for (let company in COMPANIES) {result.push(company);}
        setCompanies(result);
    }, []);

    return (
        <DefaultPage navigation={navigation}>
            <ScrollView>
                <View style={{
                    borderBottomRightRadius: 80,
                    backgroundColor: '#fff',
                }}>
                    <View style={{
                        alignItems: 'center',
                        padding: 20,
                    }}>
                        <Svg viewBox='0 0 300 300' width={100} height={100} fill="#033165">
                            <Polygon points="62.36 0 43.44 0 43.44 68.74 97.44 68.74 97.44 52.51 62.43 52.51 62.36 0"/>
                            <Polygon points="102.05 0 118.49 0 118.49 26.39 150.05 26.39 150.05 0 166.3 0 166.3 84.5 150.33 84.5 150.33 41.69 118.77 41.69 118.77 68.74 102.05 68.74 102.05 0"/>
                            <Path d="M43.65,89.22c-.07,0-.14,0-.21,0h0s-43.44,0-43.44,0v67.08h18.24v-19.08h25.41c10.96,0,19.85-10.75,19.85-24s-8.89-24-19.85-24ZM43.44,118.33c-2.28,3.42-6.38,3.86-6.38,3.86h-18.92v-18.56h19.42s3.73.43,5.88,3.71c.88,1.33,1.49,3.13,1.49,5.57s-.61,4.1-1.49,5.42Z"/>
                            <Path d="M105.16,89.22c-21.34,0-38.64,16.12-38.64,36s17.3,36,38.64,36,38.65-16.12,38.65-36-17.3-36-38.65-36ZM105.16,145.24c-11.64,0-21.08-8.96-21.08-20.02s9.44-20.02,21.08-20.02,21.09,8.96,21.09,20.02-9.44,20.02-21.09,20.02Z"/>
                            <Path d="M196.32,133.84l-.35-.35c9.95-1.98,17.46-11.04,17.46-21.92,0-12.34-9.66-22.35-21.58-22.35h-42.84v68.5h19.18v-23.81h4.81l30.9,31.56h20.82l-28.4-31.63ZM187.3,119.34h-19.21v-15.8h19.14s8.22.42,8.22,7.9-8.15,7.9-8.15,7.9Z"/>
                            <Polygon points="283.04 89.22 283.04 104.24 257.53 104.24 257.53 157.25 239.67 157.25 239.67 104.24 216.14 104.24 216.14 89.22 283.04 89.22"/>
                            <Path d="M39.7,187.53c-.59-.03-1.19-.05-1.79-.05H0v68.83h39.7c16.67-1.01,29.89-16.02,29.89-34.39s-13.22-33.38-29.89-34.39ZM31.11,241.97h-13.04v-39.82h12.9s20.69-1.35,20.69,19.34-20.55,20.48-20.55,20.48Z"/>
                            <Path d="M39.68,256.26c-.59.03-1.18.05-1.77.05s-1.18-.02-1.76-.05h3.53Z"/>
                            <Path d="M39.7,184.89v.05c-.59-.03-1.19-.05-1.79-.05h1.79Z"/>
                            <Path d="M119.2,187.43h-17.37l-31.18,68.88h20.77l4.39-11.62h29.06l6.09,11.62h19.84l-31.6-68.88ZM101.09,229.13l9.6-20.72,9.68,20.72h-19.28Z"/>
                            <Polygon points="224.13 176.04 204.47 176.04 180.09 217.15 161.29 188.33 142.11 188.33 170.08 235.19 170.08 256.31 188.13 256.31 188.13 234.06 224.13 176.04"/>
                            <Path d="M249.73,256.31c-21,0-28.48-12.24-28.48-23.69h15c0,2.38,0,8.69,13.48,8.69,14.31,0,14.7-7.79,14.71-7.87,0-1.57-.14-2.59-.9-3.43-.86-.96-3.89-3.18-13.38-3.18-19.9,0-26.96-11.42-26.96-21.2,0-10.94,8.22-22.71,26.26-22.71,20.26,0,29.33,11.21,29.33,22.31h-15c0-5.39-7.4-7.31-14.33-7.31-9.79,0-11.26,4.83-11.26,7.71,0,5.12,6.51,6.2,11.96,6.2,25.48,0,29.28,13.55,29.28,21.63,0,9.19-7.91,22.85-29.71,22.85Z"/>
                        </Svg>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <View style={{width: 30, minHeight: 10, maxHeight: 10, backgroundColor: '#379e97'}}/>
                        <View style={{width: 30, minHeight: 10, maxHeight: 10, backgroundColor: '#ff7a2f'}}/>
                        <View style={{width: 30, minHeight: 10, maxHeight: 10, backgroundColor: '#f9ed37'}}/>
                        <View style={{width: 30, minHeight: 10, maxHeight: 10, backgroundColor: '#ff5179'}}/>
                        <View style={{width: 30, minHeight: 10, maxHeight: 10, backgroundColor: '#919eb8'}}/>
                        <View style={{width: 30, minHeight: 10, maxHeight: 10, backgroundColor: '#853b63'}}/>
                    </View>
                    <View style={{padding: 20}}>
                        <Title color='#033165'>Bienvenue aux LH PORT DAYS, l'application édition 2024 !</Title>
                        <Paragraph color='#033165'>Notre forum est le rendez-vous où les esprits novateurs et les leaders de l'industrie maritime se réunissent pour discuter des dernières avancées, de la logistique portuaire à la technologie maritime, LH Port Days offre une plateforme dynamique pour les professionnels, les chercheurs et les étudiants passionnés par l'essor continu du secteur maritime.</Paragraph>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: 30, minHeight: 10, maxHeight: 10, backgroundColor: '#379e97'}}/>
                        <View style={{width: 30, minHeight: 10, maxHeight: 10, backgroundColor: '#ff7a2f'}}/>
                        <View style={{width: 30, minHeight: 10, maxHeight: 10, backgroundColor: '#f9ed37'}}/>
                        <View style={{width: 30, minHeight: 10, maxHeight: 10, backgroundColor: '#ff5179'}}/>
                        <View style={{width: 30, minHeight: 10, maxHeight: 10, backgroundColor: '#919eb8'}}/>
                        <View style={{width: 30, minHeight: 10, maxHeight: 10, backgroundColor: '#853b63'}}/>
                    </View>
                </View>
                <View style={{padding: 20, paddingTop: 40}}>
                    <Title>Liste des exposants</Title>
                    <CompanyCarousel companies={companies} navigation={navigation} from={'Main'}/>
                </View>
            </ScrollView>
        </DefaultPage>
    );
}