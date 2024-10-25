import React from "react";
import "./searchResultsList.css";
import { SearchResults } from "./searchResults";
import { Link } from "react-router-dom";

export const SearchResultsList = ({ searchResults }) => {
  return (
    <div className="results-list">
      {searchResults.map((result, id) => (
        <Link to={`/pokemon/${result.name}`} key={id} className="result-link"> 
          <SearchResults result={result} />
        </Link>
      ))}
    </div>
  );
};
