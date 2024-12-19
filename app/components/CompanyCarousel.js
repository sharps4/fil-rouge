import { useState } from 'react';
import { View } from 'react-native';
import Paragraph from './Paragraph';
import Button from './Button';
import Pagination from './Pagination';
import CompanyCard from './CompanyCard';

export default function CompanyCarousel({ companies }) {
    const [view, setView] = useState(0);

    const handlePrevious = () => setView(view === 0 ? companies.length-1 : view-1);
    const handleNext = () => setView(view === companies.length-1 ? 0 : view+1);

    return (
        <View style={{
            alignItems: 'center',
            gap: 10,
        }}>
            {companies.length === 0 ? null : <>
                <CompanyCard company={companies[view]}/>
                <Pagination
                    index      = { view }
                    total      = { companies.length }
                    onPrevious = { handlePrevious }
                    onNext     = { handleNext }
                />
            </>}
        </View>
    );
}