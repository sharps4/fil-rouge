import { View, ScrollView } from 'react-native';
import DefaultPage from './DefaultPage';
import IconButton from '../components/IconButton';
import CompanyDetails from '../components/CompanyDetails';

export default function StandPage({route, navigation}) {
    const handleBack = () => {
        if (route.params.from === 'Main') {navigation.navigate('Main');}
        else if (route.params.from[0] === 'Stand') {navigation.navigate('Stand', {stand: route.params.from[1], from: route.params.from[2]});}
        else if (route.params.from[0] === 'Path') {navigation.navigate('Path', {id: route.params.from[1]});}
    };

    return (
        <DefaultPage navigation={navigation}>
            <ScrollView style={{paddingHorizontal: 20}}>
                <View style={{paddingTop: 40, paddingBottom: 20}}>
                    <IconButton icon='arrow-left' func={handleBack}/>
                </View>
                <CompanyDetails name={route.params.company}/>
            </ScrollView>
        </DefaultPage>
    );
}