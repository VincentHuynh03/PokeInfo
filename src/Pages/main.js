import React, { useState, useEffect } from 'react';
import { getPokemon, getAllPokemon } from '../Services/pokeServices.js';
import PokemonList from './pokemonList.js'; 
import './main.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme.js';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { SearchBar } from '../components/searchBar.js';
import { SearchResultsList } from '../components/searchResultsList.js';
import pokeinfoLogo from '../Assets/pokeinfo-logo.png';
import InfiniteScroll from "react-infinite-scroller";

function Main() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [pokemonPerLoad] = useState(50); 
  const [hasMore, setHasMore] = useState(true);
  const [nextOffset, setNextOffset] = useState(0); 
  const apiURL = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let response = await getAllPokemon(`${apiURL}?limit=${pokemonPerLoad}&offset=${nextOffset}`);
    
    if (response.results.length === 0) {
      setHasMore(false); 
      return;
    }

    let pokemonList = await loadPokemon(response.results);
    setPokemonData([...pokemonData, ...pokemonList]);
    setNextOffset(nextOffset + pokemonPerLoad); 
  };

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonGet = await getPokemon(pokemon);
        return pokemonGet;
      })
    );
    return _pokemonData;
  };

  const loadMore = () => {
    fetchData();
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
        <img 
          className="pokeinfo-font-image"
          src={pokeinfoLogo} 
          alt="pokemon-font" 
          border="0" 
        />

        <div className="search-bar-container">
          <SearchBar setSearchResults={setSearchResults} />
          <SearchResultsList searchResults={searchResults} />
        </div>

        <Grid container spacing={3} justifyContent="center" marginBottom='50px'>
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid item xs={6} sm={6} md={3} lg={2.3} key={i}>
              <Button variant="outlined" size="medium" style={{ margin: '0 auto' }}>
                Generation {toRoman(i + 1)}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ marginBottom : '50px', borderColor : '#6c757d' }} />

        {loading && pokemonData.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore}
            useWindow={true}
          >
            <Grid container spacing={2}>
              {pokemonData.map((pokemon, i) => (
                <Grid item xs={6} sm={6} md={3} lg={2} key={i}>
                  <PokemonList pokemon={pokemon} />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        )}
      </div>
    </ThemeProvider>
  );
}

export default Main;
