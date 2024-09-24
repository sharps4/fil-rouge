import { useState } from 'react';
import { Dimensions, View, TouchableOpacity, Image, Alert } from 'react-native';
import Paragraph from '../components/Paragraph';
import TextButton from '../components/TextButton';
import DATA from '../data/intruder.json';

const windowWidth = Dimensions.get('window').width;

export default function Intruder({navigation, set, handleValidate}) {
    const [played, setPlayed] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [choosen, setChoosen] = useState(-1);

    const imageSize = (windowWidth-100)/2;

    const handlePlay = () => {
        setPlayed(false);
        setPlaying(true);
        setChoosen(-1);
    }

    const handleAnswer = i => {
        setChoosen(i);
        setPlayed(true);
        setPlaying(false);
        handleValidate(i === DATA[set].answer);
    }

    const images = playing || played ? DATA[set].pictures.map((picture, i) => (
        <TouchableOpacity
            key={i}
            onPress={choosen === -1 ? () => handleAnswer(i) : null}
        >
            <Image
                source={{uri: picture}}
                style={{
                    width: imageSize,
                    minHeight: imageSize,
                    maxHeight: imageSize,
                    borderWidth: 4,
                    borderColor: played && i === DATA[set].answer ? '#0f0' : i === choosen ? '#f00' : '#fff',
                }}
            />
        </TouchableOpacity>
    )) : null;

    return (
        <View style={{
            alignItems: 'center',
            borderRadius: 10,
            padding: 20,
            gap: 10,
            backgroundColor: '#fff',
        }}>
            {
                playing || played ? (
                    <>
                        <Paragraph color='#000' center={true}>Trouvez l'intrus</Paragraph>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 20,
                        }}>
                            {images}
                        </View>
                    </>
                ) : null
            }
            {
                played ? (
                    <>
                        <Paragraph color='#000' center={true}>{choosen === DATA[set].answer ? 'Vous avez validé le mini-jeu !' : 'Vous n\'avez pas validé le mini-jeu'}</Paragraph>
                        <TextButton expand={true} func={() => navigation.navigate('Map')}>Retour à la carte</TextButton>
                        <TextButton expand={true} func={handlePlay}>Rejouer au jeu de l'intrus</TextButton>
                    </>
                ) : <TextButton expand={true} func={handlePlay}>Jouer au jeu de l'intrus</TextButton>
            }
        </View>
    );
}