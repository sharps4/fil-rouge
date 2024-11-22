import { useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Database from "../Database";
import Setup from "../models/Setup";
import Map from "../models/Map";
import Stand from "../models/Stand";

export default function LoadingPage() {
    const navigation = useNavigation();

    useEffect(() => {
        const process = async () => {
            await Setup.init();
            await Map.init();
            await Stand.init();
            fetch(`https://site/${Setup.version}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    navigation.navigate('Map');
                })
                .catch(error => {
                    console.log(error);
                    navigation.navigate('Map');
                });
        }
        process();
    }, []);

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#fff',
        }}>
            <Text style={{color: '#000'}}>Recherche de mises à jour...</Text>
        </View>
    );
}