import { View } from "react-native";
import Paragraph from "./Paragraph";

export default function TextBox({children}) {
    return (
        <View style={{
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: '#ed7a2f',
        }}>
            <Paragraph size='sm' color='#fff'>{children}</Paragraph>
        </View>
    );
}