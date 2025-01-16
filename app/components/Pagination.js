import { View } from 'react-native';
import Paragraph from './Paragraph';
import Button from './Button';

export default function Pagination({
    index,
    total,
    onPrevious,
    onNext,
}) {
    return (
        <View style={{
            width:          '100%',
            flexDirection:  'row',
            justifyContent: 'center',
            alignItems:     'center',
            gap:            10,
        }}>
            <Button
                type    = 'light'
                icon    = 'chevron-left'
                onPress = { onPrevious }
            />
            <Paragraph>{index+1}/{total}</Paragraph>
            <Button
                type    = 'light'
                icon    = 'chevron-right'
                onPress = { onNext }
            />
        </View>
    );
}