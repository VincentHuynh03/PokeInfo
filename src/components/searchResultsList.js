import React from 'react';
import "./searchResultsList.css";
import { SearchResults } from './searchResults';


export const SearchResultsList =  ({searchResults}) => {
    return (
        <div className="results-list">
            {
                searchResults.map((result, id) => {
                    return <SearchResults result={result} key={id}></SearchResults>
                
                })
            }
        </div>

    );
};