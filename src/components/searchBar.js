import "./searchBar.css";
import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const SearchBar = ({ setSearchResults }) => {
    const apiURL = 'https://pokeapi.co/api/v2/pokemon';
    const [searchInput, setSearchInput] = useState("");
    const [allPokemon, setAllPokemon] = useState([]);

    useEffect(() => {
        const fetchAllPokemon = async () => {
            let allPokemons = [];
            let offset = 0;
            const limit = 100;

            try {
                while (true) {
                    const response = await fetch(`${apiURL}?offset=${offset}&limit=${limit}`);
                    const data = await response.json();

                    if (data.results.length === 0) break;

                    allPokemons = [...allPokemons, ...data.results];
                    offset += limit;
                }

                setAllPokemon(allPokemons);
            } catch (error) {
                console.error("Error fetching all Pokémon:", error);
            }
        };

        fetchAllPokemon();
    }, []);

    const fetchData = (value) => {
        const results = allPokemon.filter((pokemon) => {
            return (
                value &&
                pokemon &&
                pokemon.name &&
                pokemon.name.toLowerCase().includes(value.toLowerCase()
            ));
        });
        setSearchResults(results);
    };

    const handleChange = (value) => {
        setSearchInput(value);
        fetchData(value);
    };

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: { xs: '90%', sm: 400 }, margin: '0 auto', marginTop: '50px' }}>
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
    );
};
