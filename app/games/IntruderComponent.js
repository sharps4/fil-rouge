import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, View, TouchableOpacity, Image } from 'react-native';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import Color from '../models/Color';
import Intruder from '../models/Intruder';
import IntruderImage from '../models/IntruderImage';
import { shuffle } from '../utils';

const windowWidth = Dimensions.get('window').width;

export default function IntruderComponent({ id, handleEnd }) {
    const navigation = useNavigation();

    const [intruder, setIntruder] = useState(null);
    const [images, setImages] = useState(null);
    const [played, setPlayed] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [choosen, setChoosen] = useState(-1);

    const imageSize = (windowWidth-200)/2;

    const handlePlay = () => {
        setPlayed(false);
        setPlaying(true);
        setChoosen(-1);
        const process = async () => {
            const intruder = await Intruder.findById(id);
            const imageAll = shuffle(await IntruderImage.findAll());
            const imageKeyword = shuffle(await IntruderImage.findByKeyword(intruder.keyword));
            if (imageKeyword.length >= 3 && imageAll.length > imageKeyword.length) {
                const result = [];
                for (let i = 0; i < 3; i++) result.push(imageKeyword[i]);
                let i = 0;
                while (imageAll[i].keyword === intruder.keyword) i++;
                result.push(imageAll[i]);
                setIntruder(intruder);
                setImages(shuffle(result));
            }
        };
        process();
    }

    const handleAnswer = i => {
        setChoosen(i);
        setPlayed(true);
        setPlaying(false);
        handleEnd(images[i].keyword !== intruder.keyword ? 1 : 0);
    }

    return (
        <View style={{
            alignItems: 'center',
            borderRadius: 10,
            padding: 20,
            gap: 10,
            backgroundColor: Color.getCode('light'),
        }}>
            {
                playing || played ? (
                    <>
                        <Paragraph type='dark' center={ true } marge={ 10 }>Trouvez l'intrus</Paragraph>
                        <View style={{
                            justifyContent: 'center',
                            flexDirection:  'row',
                            flexWrap:       'wrap',
                            gap:            20,
                            marginBottom:   10,
                        }}>{images ? images.map((image, i) => (
                            <TouchableOpacity
                                key     = { i }
                                onPress = { choosen === -1 ? () => handleAnswer(i) : null }
                            >
                                <Image
                                    source = {{ uri: image.image }}
                                    style  = {{
                                        width:       imageSize,
                                        minHeight:   imageSize,
                                        maxHeight:   imageSize,
                                        borderWidth: 4,
                                        borderColor: Color.getCode(played && image.keyword !== intruder.keyword ? 'valid' : i === choosen ? 'error' : 'light'),
                                    }}
                                />
                            </TouchableOpacity>
                        )) : null}</View>
                    </>
                ) : null
            }
            {
                !playing ?
                    played ? <>
                        <Button center={ true } onPress={ () => navigation.navigate('Map') }>Retour à la carte</Button>
                        <Button center={ true } onPress={ handlePlay }>Rejouer au jeu de l'intrus</Button>
                    </> : <Button center={ true } onPress={ handlePlay }>Jouer au jeu de l'intrus</Button>
                : null
            }
        </View>
    );
}