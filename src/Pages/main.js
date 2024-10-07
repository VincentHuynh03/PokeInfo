import React, { useState, useEffect } from 'react';
import { getPokemon, getAllPokemon } from '../Services/pokeServices.js';
import PokemonList from './pokemonList.js'; 
import './main.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme.js';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { SearchBar } from '../components/searchBar.js';
import { SearchResultsList } from '../components/searchResultsList.js';

function Main() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  const generations = 8;
  
  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(apiURL);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonGet = await getPokemon(pokemon);
        return pokemonGet;
      })
    );
    setPokemonData(_pokemonData);
  };

  const toRoman = (num) => {
    const romanNumerals = {
      1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V',
      6: 'VI', 7: 'VII', 8: 'VIII'
    };
    return romanNumerals[num] || num;
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='gridContainer' style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <Typography 
          variant="h1" 
          sx={{ textAlign: 'center', margin: '20px 0', color: 'white', marginTop: '60px', 
          textShadow: '#ec4b41 -2px -2px 0px, #ec4b41 2px -2px 0px, #ec4b41 -2px 2px 0px, #ec4b41 2px 2px 0px' }}
        >
          PokeInfo
        </Typography>

        <div className="search-bar-container">
          <SearchBar setSearchResults={setSearchResults} />
          <SearchResultsList searchResults={searchResults} />
        </div>

        <Grid container spacing={3} justifyContent="center" marginBottom='50px'>
          {Array.from({ length: generations }).map((_, i) => (
            <Grid item xs={6} sm={6} md={3} lg={2.3} key={i}>
              <Button variant="outlined" size="medium" style={{ margin: '0 auto' }}>
                Generation {toRoman(i + 1)}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ marginBottom : '50px', borderColor : '#6c757d' }} />

        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Grid container spacing={2}>
            {pokemonData.map((pokemon, i) => (
              <Grid item xs={6} sm={6} md={3} lg={2} key={i}>
                <PokemonList pokemon={pokemon} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </ThemeProvider>
  );
}

export default Main;
