import Hangman from '../games/Hangman';
import Intruder from '../games/Intruder';
import Quizz from '../games/Quizz';
import TetrisContainer from '../games/TetrisContainer';

export default function Game({name, navigation, handleValidate}) {
    if (name.startsWith('Hangman')) {return <Hangman navigation={navigation} set={name.slice(7)} handleValidate={handleValidate}/>;}
    else if (name.startsWith('Intruder')) {return <Intruder navigation={navigation} set={name.slice(8)} handleValidate={handleValidate}/>;}
    else if (name.startsWith('Quizz')) {return <Quizz navigation={navigation} set={name.slice(5)} handleValidate={handleValidate}/>;}
    else if (name === 'TetrisContainer') {return <TetrisContainer navigation={navigation} handleValidate={handleValidate}/>;}
    else {return null;}
}