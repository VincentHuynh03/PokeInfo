import React from 'react';
import "./searchResults.css"

export const SearchResults =  ({result}) => {
    return (
        <div className="search-result">
            {result.name}
        </div>

    );
};