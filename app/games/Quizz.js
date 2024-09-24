import { useState } from 'react';
import { View } from 'react-native';
import Paragraph from '../components/Paragraph';
import TextButton from '../components/TextButton';
import DATA from '../data/quizz.json';

export default function Quizz({navigation, set, handleValidate}) {
    const [played, setPlayed] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [question, setQuestion] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [choosen, setChoosen] = useState(0);
    const [score, setScore] = useState(0);

    const requiredScore = parseInt(DATA[set].length/2+0.5);

    const handlePlay = () => {
        setPlaying(true);
        setQuestion(0);
        setScore(0);
    }

    const handleAnswer = i => {
        setAnswered(true);
        setChoosen(i);
        if (i === DATA[set][question].answer) {setScore(score+1);}
    }

    const handleNext = () => {
        if (question === DATA[set].length-1) {
            setPlayed(true);
            setPlaying(false);
            handleValidate(score >= requiredScore);
        }
        else {setQuestion(question+1);}
        setAnswered(false);
    }

    const buttons = playing ? DATA[set][question].options.map((element, i) => <TextButton
        key={i}
        bg={answered && i === DATA[set][question].answer ? '#0f0' : answered && i === choosen ? '#f00' : '#7f7fff'}
        fg='#fff'
        expand={true}
        func={answered ? null : () => handleAnswer(i)}
    >{element}</TextButton>) : null;

    return (
        <View style={{
            alignItems: 'center',
            borderRadius: 10,
            padding: 20,
            gap: 10,
            backgroundColor: '#fff',
        }}>
            {
                playing ? (
                    <>
                        <Paragraph color='#000' center={true}>Question {question+1}/{DATA[set].length} : {DATA[set][question].question}</Paragraph>
                        {buttons}
                        {
                            answered
                            ? <>
                                <Paragraph color='#000' center={true}>{DATA[set][question].explanation}</Paragraph>
                                <TextButton
                                    expand={true}
                                    func={handleNext}
                                >{question === DATA[set].length-1 ? 'Terminer' : 'Question suivante'}</TextButton>
                            </>
                            : null
                        }
                    </>
                ) : played ? (
                    <>
                        <Paragraph color='#000' center={true}>Vous avez obtenu un score de {score}/{DATA[set].length}</Paragraph>
                        <Paragraph color='#000' center={true}>{score >= requiredScore ? 'Vous avez validé le quizz !' : 'Il vous faut un score d\'au moins '+requiredScore+' pour valider le quizz'}</Paragraph>
                        <TextButton expand={true} func={() => navigation.navigate('Map')}>Retour à la carte</TextButton>
                        <TextButton expand={true} func={handlePlay}>Recommencer le quizz</TextButton>
                    </>
                ) : <TextButton expand={true} func={handlePlay}>Faire le quizz</TextButton>
            }
        </View>
    );
}