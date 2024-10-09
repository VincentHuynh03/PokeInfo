import "./searchBar.css";
import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


export const SearchBar =  ({setSearchResults}) => {
    const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

    const [searchInput, setSearchInput] = useState("");
    
        async function fetchData(value) {
            try{
                let response = await fetch(apiURL);
                    const json = await response.json();
                    const results = json.results.filter((pokemon) => {
                      return (
                        value && 
                        pokemon && 
                        pokemon.name && 
                        pokemon.name.toLowerCase().includes(value.toLowerCase()
                    ));                                            
                    });
                    setSearchResults(results);
         } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
      const handleChange = (value) => {
        setSearchInput(value)
        fetchData(value)
      }
    return (
      <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex',  alignItems: 'center', width: { xs: '90%', sm: 400 }, margin: '0 auto', marginTop: '50px',}}>
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <ArrowDropDownIcon />
        </IconButton>


        <InputBase
          sx={{ ml: 1, flex: 1 }} 
          placeholder="Search Pokemon.."
          value={searchInput}
          onChange={(e) => handleChange(e.target.value)}
          inputProps={{ 'aria-label': 'search pokemon' }}
        />




        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    )
}