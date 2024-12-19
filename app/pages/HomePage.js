import { Linking, ScrollView, View } from 'react-native';
import DefaultPage from './DefaultPage';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import Logo from '../components/Logo';
import Color from '../models/Color';
import Setup from '../models/Setup';

export default function HomePage() {
    return (
        <DefaultPage padding={0}>
            <ScrollView>
                <View style={{
                    padding:                 30,
                    borderBottomRightRadius: 40,
                    backgroundColor:         Color.getCode('light'),
                }}>
                    <Logo
                        color = { Color.getCode('primary') }
                        style = {{
                            margin:       'auto',
                            marginBottom: 40,
                        }}
                    />
                    { Setup.description ? <Paragraph
                        type  = 'dark'
                        marge = { 20 }
                    >{Setup.description}</Paragraph> : null }
                    { Setup.site ? (
                        <View style={{
                            flex:           1,
                            flexDirection:  'row',
                            justifyContent: 'center',
                        }}>
                            <Button
                                type    = 'primary'
                                icon    = 'globe'
                                onPress = { () => Linking.openURL(Setup.site) }
                            >Voir le site de LH Port Days</Button>
                        </View>
                    ) : null }
                </View>
            </ScrollView>
        </DefaultPage>
    );
}