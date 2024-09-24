import { View, ScrollView } from 'react-native';
import DefaultPage from './DefaultPage';
import Title from '../components/Title';
import TextButton from '../components/TextButton';
import PATHS from '../data/paths.json';

export default function PathsPage({navigation}) {
    return (
        <DefaultPage navigation={navigation}>
            <ScrollView style={{paddingHorizontal: 20}}>
                <View style={{paddingTop: 40}}/>
                <Title>Choisissez un parcours</Title>
                <View style={{gap: 20}}>
                    {
                        PATHS.map((path, i) => (
                            <TextButton
                                key={i}
                                icon='arrow-right'
                                expand={true}
                                func={() => navigation.navigate('Path', {id: i})}
                            >{path.name}</TextButton>
                        ))
                    }
                </View>
                <View style={{paddingTop: 20}}/>
            </ScrollView>
        </DefaultPage>
    );
}