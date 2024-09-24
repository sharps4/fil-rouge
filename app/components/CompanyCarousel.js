import { useState } from "react";
import { View } from "react-native";
import IconButton from './IconButton';
import CompanyCard from './CompanyCard';

export default function CompanyCarousel({companies = [], navigation, from}) {
    const [view, setView] = useState(0);

    const handlePrevious = () => {
        if (view === 0) {setView(companies.length-1);}
        else {setView(view-1);}
    };

    const handleNext = () => {
        if (view === companies.length-1) {setView(0);}
        else {setView(view+1);}
    };

    return companies.length === 0 ? null : (
        <View style={{
            alignItems: 'center',
            gap: 10,
        }}>
            <CompanyCard name={companies[view]} navigation={navigation} from={from}/>
            <View style={{
                flexDirection: 'row',
                gap: 10,
            }}>
                <IconButton icon='chevron-left' func={handlePrevious}/>
                <IconButton icon='chevron-right' func={handleNext}/>
            </View>
        </View>
    );
}