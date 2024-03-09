import React, { useState, useEffect } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import GenericBtn from '../../Buttons/GenericBtn';

interface SearchBarProps {
    onSearch: (stockName: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');
    const [suggestedStocks, setSuggestedStocks] = useState<string[]>([]);

    useEffect(() => {
        // Fetch suggested stocks when searchText changes
        const fetchSuggestedStocks = async () => {
            try {
                // Fetch stocks from your backend
                const response = await fetch(`http://localhost:3001/api/stocks?search=${searchText}`);
                const data = await response.json();
                setSuggestedStocks(data);
            } catch (error: any) {
                console.error('Error fetching suggested stocks:', error.message);
            }
        };

        // Fetch suggested stocks only if searchText has at least 2 characters
        if (searchText.length >= 2) {
            fetchSuggestedStocks();
        } else {
            setSuggestedStocks([]);
        }
    }, [searchText]);


    const handleSearch = () => {
        // Trigger search with the selected stock
        onSearch(searchText);
    };

    return (
        <div>
            <AutoComplete
                value={searchText}
                suggestions={suggestedStocks}
                completeMethod={(e: { query: string }) => setSearchText(e.query)}
                placeholder="Search stock..."
                onChange={(e) => setSearchText(e.value)}
            />
            <button onClick={handleSearch}> Search</button>
        </div>
    );
};

export default SearchBar;