import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import Quizz from '../models/Quizz';
import QuizzQuestion from '../models/QuizzQuestion';
import Color from '../models/Color';

export default function QuizzComponent({ id, handleEnd }) {
    const navigation = useNavigation();

    const [quizz, setQuizz] = useState(null);
    const [question, setQuestion] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [played, setPlayed] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [choosen, setChoosen] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const process = async () => setQuizz(await Quizz.findById(id));
        process();
    }, []);

    useEffect(() => {
        if (quizz) {
            const process = async () => setQuestion(await QuizzQuestion.findById(
                questionIndex === 0
                ? quizz.question0Id
                : questionIndex === 1
                ? quizz.question1Id
                : questionIndex === 2
                ? quizz.question2Id
                : quizz.question3Id
            ));
            process();
        }
    }, [quizz, questionIndex]);

    const handlePlay = () => {
        setPlaying(true);
        setQuestionIndex(0);
        setScore(0);
    };

    const handleAnswer = i => {
        setAnswered(true);
        setChoosen(i);
        if (i === question.answer) setScore(score+1);
    }

    const handleNext = () => {
        if (questionIndex === 3) {
            setPlayed(true);
            setPlaying(false);
            handleEnd(score);
        }
        else {
            setQuestionIndex(questionIndex+1);
        }
        setAnswered(false);
    }

    return quizz ? (
        <View style={{
            alignItems:      'center',
            borderRadius:    10,
            padding:         20,
            gap:             10,
            backgroundColor: Color.getCode('light'),
        }}>
            {playing ? (
                question ? <>
                    <Paragraph type='dark' center={ true }>Question {questionIndex+1}/4 : {question.description}</Paragraph>
                    {[
                        question.proposition0,
                        question.proposition1,
                        question.proposition2,
                        question.proposition3,
                    ].map((proposition, i) => (
                        <Button
                            key     = { i }
                            type    = {
                                answered && i === question.answer
                                ? 'valid'
                                : answered && i === choosen
                                ? 'error'
                                : 'light'
                            }
                            center  = { true }
                            onPress = { answered ? null : () => handleAnswer(i) }
                        >{proposition}</Button>
                    ))}
                    {answered ? (
                        <Button
                            center  = { true }
                            onPress = { handleNext }
                        >
                            { questionIndex === 3 ? 'Terminer' : 'Question suivante' }
                        </Button>
                    ) : null}
                </> : null
            ) : played ? <>
                <Paragraph type='dark' center={ true }>Vous avez obtenu un score de {score}/4</Paragraph>
                <Button center={ true } onPress={ () => navigation.navigate('Map') }>Retour à la carte</Button>
                <Button center={ true } onPress={ handlePlay }>Recommencer le quizz</Button>
            </> : (
                <Button center={ true } onPress={ handlePlay }>Faire le quizz</Button>
            )}
        </View>
    ) : null;
}