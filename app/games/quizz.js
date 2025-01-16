import { useState } from 'react';
import { View } from 'react-native';
import Paragraph from '../components/Paragraph';
import TextButton from '../components/TextButton';
import QUIZ_DATA from './api/data/1.json';

export default function Quizz({navigation, gameId, handleValidate}) {
    const [played, setPlayed] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [question, setQuestion] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [choosen, setChoosen] = useState(0);
    const [score, setScore] = useState(0);

    // Get the quiz questions for this game
    const gameQuiz = QUIZ_DATA.gameQuizzes[gameId];
    const quiz = QUIZ_DATA.quizzes[gameQuiz.quizId];
    const questions = [
        QUIZ_DATA.quizzQuestions[quiz.questionId0],
        QUIZ_DATA.quizzQuestions[quiz.questionId1],
        QUIZ_DATA.quizzQuestions[quiz.questionId2],
        QUIZ_DATA.quizzQuestions[quiz.questionId3],
    ];

    const requiredScore = parseInt(questions.length/2+0.5);

    const handlePlay = () => {
        setPlaying(true);
        setQuestion(0);
        setScore(0);
    }

    const handleAnswer = i => {
        setAnswered(true);
        setChoosen(i);
        if (i === questions[question].answer) {
            setScore(score+1);
        }
    }

    const handleNext = () => {
        if (question === questions.length-1) {
            setPlayed(true);
            setPlaying(false);
            handleValidate(score >= requiredScore);
        }
        else {
            setQuestion(question+1);
        }
        setAnswered(false);
    }

    const buttons = playing ? [
        questions[question].proposition0,
        questions[question].proposition1,
        questions[question].proposition2,
        questions[question].proposition3
    ].map((element, i) => (
        <TextButton
            key={i}
            bg={answered && i === questions[question].answer ? '#0f0' : 
                answered && i === choosen ? '#f00' : '#7f7fff'}
            fg='#fff'
            expand={true}
            func={answered ? null : () => handleAnswer(i)}
        >{element}</TextButton>
    )) : null;

    return (
        <View style={{
            alignItems: 'center',
            borderRadius: 10,
            padding: 20,
            gap: 10,
            backgroundColor: '#fff',
        }}>
            {playing ? (
                <>
                    <Paragraph color='#000' center={true}>
                        Question {question+1}/{questions.length} : {questions[question].description}
                    </Paragraph>
                    {buttons}
                    {answered && (
                        <TextButton
                            expand={true}
                            func={handleNext}
                        >
                            {question === questions.length-1 ? 'Terminer' : 'Question suivante'}
                        </TextButton>
                    )}
                </>
            ) : played ? (
                <>
                    <Paragraph color='#000' center={true}>
                        Vous avez obtenu un score de {score}/{questions.length}
                    </Paragraph>
                    <Paragraph color='#000' center={true}>
                        {score >= requiredScore ? 
                            'Vous avez validé le quizz !' : 
                            `Il vous faut un score d'au moins ${requiredScore} pour valider le quizz`}
                    </Paragraph>
                    <TextButton expand={true} func={() => navigation.navigate('Map')}>
                        Retour à la carte
                    </TextButton>
                    <TextButton expand={true} func={handlePlay}>
                        Recommencer le quizz
                    </TextButton>
                </>
            ) : (
                <TextButton expand={true} func={handlePlay}>
                    Faire le quizz
                </TextButton>
            )}
        </View>
    );
}