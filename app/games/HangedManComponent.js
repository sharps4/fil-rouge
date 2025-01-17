import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View } from "react-native";
import { Svg, Rect, Polygon, Path } from "react-native-svg";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import Color from "../models/Color";
import HangedMan from "../models/HangedMan";
import HangedManWord from "../models/HangedManWord";
import { shuffle } from "../utils";

export default function HangedManComponent({ id, handleEnd }) {
    const navigation = useNavigation();

    const [word, setWord] = useState(null);
    const [played, setPlayed] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [lives, setLives] = useState(0);
    const [current, setCurrent] = useState(null);
    const [tested, setTested] = useState('');

    const handlePlay = () => {
        const process = async () => {
            const word = shuffle(await HangedManWord.findBySet((await HangedMan.findById(id)).wordSet))[0];
            if (word) {
                setWord(word);
                setCurrent('_'.repeat(word.word.length));
                setTested('');
                setLives(8);
                setPlaying(true);
            }
        }
        process();
    };

    const handleTest = (char) => {
        setTested(tested+char);
        if (word.word.includes(char)) {
            let result = current;
            for (let i = 0; i < word.word.length; i++) {
                if (word.word[i] === char) {
                    result = result.slice(0, i)+char+result.slice(i+1);
                }
            }
            if (result.includes('_')) setCurrent(result);
            else {
                setPlayed(true);
                setPlaying(false);
                handleEnd(1);
            }
        }
        else if (lives === 1) {
            setPlayed(true);
            setPlaying(false);
            handleEnd(0);
        }
        else setLives(lives-1);
    };

    return (
        <View style={{
            alignItems:      'center',
            borderRadius:    10,
            padding:         20,
            gap:             10,
            backgroundColor: Color.getCode('light'),
        }}>
            {
                playing ? (
                    <>
                        <Svg width='100%' height={100} viewBox="0 0 1152.71 455.41">
                            <Rect fill='#ddd' x="170.22" y="18.59" width=".14" height="49.13"/>
                            <Rect x="169.72" y="18.09" width="1.14" height="50.13"/>
                            <Rect fill='#ddd' x="170.22" y="18.59" width=".14" height="49.13"/>
                            <Rect x="169.72" y="18.09" width="1.14" height="50.13"/>
                            <Polygon fill='#ddd' points="345.56 18.59 345.56 67.72 312.52 67.72 312.52 235.48 37.04 235.48 121.23 131.75 121.23 0 170.36 0 170.36 18.59 345.56 18.59"/>
                            <Rect fill='#333' x="192.71" y="32.75" width="51.15" height="23.72"/>
                            <Path d="M244.36,56.97h-52.15v-24.72h52.15v24.72ZM193.21,55.97h50.15v-22.72h-50.15v22.72Z"/>
                            <Rect fill='#333' x="271.91" y="32.75" width="51.15" height="23.72"/>
                            <Path d="M323.56,56.97h-52.15v-24.72h52.15v24.72ZM272.41,55.97h50.15v-22.72h-50.15v22.72Z"/>
                            <Rect fill='#333' x="249.11" y="84.62" width="51.15" height="23.72"/>
                            <Path d="M300.76,108.84h-52.15v-24.72h52.15v24.72ZM249.61,107.84h50.15v-22.72h-50.15v22.72Z"/>
                            <Rect fill='#333' x="249.11" y="140.29" width="51.15" height="23.72"/>
                            <Path d="M300.76,164.5h-52.15v-24.72h52.15v24.72ZM249.61,163.5h50.15v-22.72h-50.15v22.72Z"/>
                            <Rect fill='#333' x="249.11" y="195.95" width="51.15" height="23.72"/>
                            <Path d="M300.76,220.17h-52.15v-24.72h52.15v24.72ZM249.61,219.17h50.15v-22.72h-50.15v22.72Z"/>
                            <Rect fill='#333' x="182.47" y="84.62" width="59.2" height="135.05"/>
                            <Path d="M242.17,220.17h-60.2V84.12h60.2v136.05ZM182.97,219.17h58.2V85.12h-58.2v134.05Z"/>
                            {
                                lives >= 8 ? (
                                    <>
                                        <Rect stroke='#000' strokeMiterlimit={10} fill='#fcd71b' x="382.9" y="131.75" width="129.88" height="51.86"/>
                                        <Path stroke='#000' strokeMiterlimit={10} fill='#fff' d="M462.27,145.93c3.16,3.16,3.16,8.3,0,11.46l-2.97,2.97-11.46,11.46-11.46-11.46-2.97-2.97c-3.16-3.16-3.16-8.29,0-11.46h0c3.16-3.16,8.29-3.16,11.46,0l2.97,2.97,2.97-2.97c3.16-3.16,8.29-3.16,11.46,0h0Z"/>
                                    </>
                                ) : null
                            }
                            {
                                lives >= 7 ? (
                                    <>
                                        <Rect stroke='#000' strokeMiterlimit={10} fill='#c1272d' x="512.78" y="131.75" width="129.88" height="51.86"/>
                                        <Path stroke='#000' strokeMiterlimit={10} fill='#fff' d="M592.15,145.93c3.16,3.16,3.16,8.3,0,11.46l-2.97,2.97-11.46,11.46-11.46-11.46-2.97-2.97c-3.16-3.16-3.16-8.29,0-11.46h0c3.16-3.16,8.29-3.16,11.46,0l2.97,2.97,2.97-2.97c3.16-3.16,8.29-3.16,11.46,0h0Z"/>
                                    </>
                                ) : null
                            }
                            {
                                lives >= 6 ? (
                                    <>
                                        <Rect stroke='#000' strokeMiterlimit={10} fill='#009245' x="642.66" y="131.75" width="129.88" height="51.86"/>
                                        <Path stroke='#000' strokeMiterlimit={10} fill='#fff' d="M722.03,145.93c3.16,3.16,3.16,8.3,0,11.46l-2.97,2.97-11.46,11.46-11.46-11.46-2.97-2.97c-3.16-3.16-3.16-8.29,0-11.46h0c3.16-3.16,8.29-3.16,11.46,0l2.97,2.97,2.97-2.97c3.16-3.16,8.29-3.16,11.46,0h0Z"/>
                                    </>
                                ) : null
                            }
                            {
                                lives >= 5 ? (
                                    <>
                                        <Rect stroke='#000' strokeMiterlimit={10} fill='#c1272d' x="772.54" y="131.75" width="129.88" height="51.86"/>
                                        <Path stroke='#000' strokeMiterlimit={10} fill='#fff' d="M856.88,145.93c3.16,3.16,3.16,8.3,0,11.46l-2.97,2.97-11.46,11.46-11.46-11.46-2.97-2.97c-3.16-3.16-3.16-8.29,0-11.46h0c3.16-3.16,8.29-3.16,11.46,0l2.97,2.97,2.97-2.97c3.16-3.16,8.29-3.16,11.46,0h0Z"/>
                                    </>
                                ) : null
                            }
                            {
                                lives >= 4 ? (
                                    <>
                                        <Rect stroke='#000' strokeMiterlimit={10} fill='#3fa9f5' x="382.9" y="182.75" width="129.88" height="51.86"/>
                                        <Path stroke='#000' strokeMiterlimit={10} fill='#fff' d="M462.27,196.93c3.16,3.16,3.16,8.3,0,11.46l-2.97,2.97-11.46,11.46-11.46-11.46-2.97-2.97c-3.16-3.16-3.16-8.29,0-11.46h0c3.16-3.16,8.29-3.16,11.46,0l2.97,2.97,2.97-2.97c3.16-3.16,8.29-3.16,11.46,0h0Z"/>
                                    </>
                                ) : null
                            }
                            {
                                lives >= 3 ? (
                                    <>
                                        <Rect stroke='#000' strokeMiterlimit={10} fill='#009245' x="512.78" y="182.75" width="129.88" height="51.86"/>
                                        <Path stroke='#000' strokeMiterlimit={10} fill='#fff' d="M592.48,196.93c3.16,3.16,3.16,8.3,0,11.46l-2.97,2.97-11.46,11.46-11.46-11.46-2.97-2.97c-3.16-3.16-3.16-8.29,0-11.46h0c3.16-3.16,8.29-3.16,11.46,0l2.97,2.97,2.97-2.97c3.16-3.16,8.29-3.16,11.46,0h0Z"/>
                                    </>
                                ) : null
                            }
                            {
                                lives >= 2 ? (
                                    <>
                                        <Rect stroke='#000' strokeMiterlimit={10} fill='#fcd71b' x="642.66" y="182.75" width="129.88" height="51.86"/>
                                        <Path stroke='#000' strokeMiterlimit={10} fill='#fff' d="M722.03,196.93c3.16,3.16,3.16,8.3,0,11.46l-2.97,2.97-11.46,11.46-11.46-11.46-2.97-2.97c-3.16-3.16-3.16-8.29,0-11.46h0c3.16-3.16,8.29-3.16,11.46,0l2.97,2.97,2.97-2.97c3.16-3.16,8.29-3.16,11.46,0h0Z"/>
                                    </>
                                ) : null
                            }
                            {
                                lives >= 1 ? (
                                    <>
                                        <Rect stroke='#000' strokeMiterlimit={10} fill='#3fa9f5' x="772.54" y="182.75" width="129.88" height="51.86"/>
                                        <Path stroke='#000' strokeMiterlimit={10} fill='#fff' d="M856.88,196.93c3.16,3.16,3.16,8.3,0,11.46l-2.97,2.97-11.46,11.46-11.46-11.46-2.97-2.97c-3.16-3.16-3.16-8.29,0-11.46h0c3.16-3.16,8.29-3.16,11.46,0l2.97,2.97,2.97-2.97c3.16-3.16,8.29-3.16,11.46,0h0Z"/>
                                    </>
                                ) : null
                            }
                            <Rect fill='#fff' x="1083.06" y="118.03" width="22.59" height="43.63"/>
                            <Rect fill='#fff' x="1049.18" y="118.03" width="22.59" height="43.63"/>
                            <Rect fill='#fff' x="320.52" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="328.99" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="340.05" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="348.52" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="357.18" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="365.65" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="376.71" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="385.18" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="393.51" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="401.98" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="413.04" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="421.51" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="430.17" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="438.64" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="611.71" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="620.18" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="631.24" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="639.71" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="648.37" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="656.84" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="667.9" y="222.79" width="2.54" height="12.7"/> 
                            <Rect fill='#fff' x="676.37" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="684.7" y="222.79" width="2.54" height="12.7"/> 
                            <Rect fill='#fff' x="693.17" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="704.23" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="712.7" y="222.79" width="2.54" height="12.7"/> 
                            <Rect fill='#fff' x="721.36" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="729.83" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="738.92" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="747.39" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="758.45" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="766.92" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="775.58" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="784.05" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="795.11" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="803.58" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="811.91" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="820.38" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="831.44" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="839.91" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="848.57" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="857.04" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="864.52" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="873.18" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="881.65" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="449.7" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="458.17" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="465.86" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="474.33" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="485.39" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="493.86" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="502.52" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="510.99" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="522.05" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="530.52" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="538.85" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="547.32" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="558.38" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="566.85" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="575.51" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="583.98" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="595.04" y="222.79" width="2.54" height="12.7"/>
                            <Rect fill='#fff' x="603.51" y="222.79" width="2.54" height="12.7"/>
                            <Polygon fill='#1a1a1a' points="1152.71 156.27 1014.75 455.41 67.45 455.41 0 230.09 879.06 230.09 913.1 156.27 1152.71 156.27"/>
                            <Polygon fill='#ed1c24' points="1014.75 455.41 67.45 455.41 48.48 392.6 1043.72 392.6 1014.75 455.41"/>
                            <Rect fill='#fff' x="312.52" y="218.55" width="583.4" height="4.24"/>
                        </Svg>
                        <Paragraph
                            type    = 'dark'
                            spacing = { 5 }
                            center  = { true }
                        >{current}</Paragraph>
                        <View style={{
                            flexDirection:  'row',
                            justifyContent: 'center',
                            flexWrap:       'wrap',
                            gap:            5,
                        }}>
                            {
                                'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((char, i) => 
                                    tested.includes(char)
                                    ? null
                                    : <Button key={ i } onPress={ () => handleTest(char) }>{char}</Button>
                                )
                            }
                        </View>
                    </>
                ) : played ? <>
                    <Paragraph type='dark' center={ true }>Le mot était {word.word} ({word.description})</Paragraph>
                    <Button center={ true } onPress={ () => navigation.navigate('Map') }>Retour à la carte</Button>
                    <Button center={ true } onPress={ handlePlay }>Rejouer au pendu</Button>
                </> : <Button center={ true } onPress={ handlePlay }>Jouer au pendu</Button>
            }
        </View>
    );
}