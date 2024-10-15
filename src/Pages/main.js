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
  const [loading, setLoading] = useState(false); 
  const [searchResults, setSearchResults] = useState([]);
  const [pokemonPerLoad, setPokemonPerLoad] = useState(50); 
  const [hasMore, setHasMore] = useState(true);
  const [nextOffset, setNextOffset] = useState(0); 
  const [displayPokemon, setDisplayPokemon] = useState([]);
  const [isGenerationLoading, setIsGenerationLoading] = useState(false);
  const apiURL = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    fetchData(); 
  }, []);

  const fetchData = async () => {
    if (loading || !hasMore) return; 
    setLoading(true);

    try {
      const response = await getAllPokemon(`${apiURL}?limit=${pokemonPerLoad}&offset=${nextOffset}`);
      
      if (!response.results || response.results.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const pokemonList = await loadPokemon(response.results);

      setPokemonData((prevData) => {
        const newData = [...prevData, ...pokemonList];
        const uniqueData = Array.from(new Set(newData.map(p => p.name)))
          .map(name => newData.find(p => p.name === name));
        return uniqueData;
      });

      setNextOffset(nextOffset + pokemonPerLoad);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    } finally {
      setLoading(false);
    }
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
    if (!loading && hasMore) {
      fetchData(); 
    }
  };;

  const toRoman = (num) => {
    const romanNumerals = {
      1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V',
      6: 'VI', 7: 'VII', 8: 'VIII'
    };
    return romanNumerals[num] || num;
  };

  const handleGenerationClick = async (i) => {
    setIsGenerationLoading(true);
    const generationRanges = {
      1: [0, 151],
      2: [151, 251],
      3: [251, 386],
      4: [386, 493],
      5: [493, 649],
      6: [649, 721],
      7: [721, 809],
      8: [809, 905],
    };
  
    const [start, end] = generationRanges[i];
  
    if (pokemonData.length < end) {
      let missingPokemons = await getAllPokemon(`${apiURL}?limit=${end - pokemonData.length}&offset=${pokemonData.length}`);
      let newPokemonList = await loadPokemon(missingPokemons.results);
      
      setPokemonData((prevData) => {
        const updatedData = [...prevData, ...newPokemonList];
          if (i === 1) {
          setDisplayPokemon(updatedData.slice(0, 151));
        } else {
          setDisplayPokemon(updatedData.slice(start, end));
        }
  
        return updatedData;
      });
    } else {
      if (i === 1) {
        setDisplayPokemon(pokemonData.slice(0, 151));
      } else {
        setDisplayPokemon(pokemonData.slice(start, end));
      }
    }
  
    setIsGenerationLoading(false); 
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
              <Button variant="outlined" size="medium" onClick={() => handleGenerationClick(i + 1)} style={{ margin: '0 auto', width: '170px', }}>
                Generation {toRoman(i + 1)}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ marginBottom : '50px', borderColor : '#6c757d' }} />

        {loading && pokemonData.length === 0 ? (
          <h1>Loading...</h1>
        ) : isGenerationLoading ? (
          <h1>Loading Generation...</h1>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore}
            useWindow={true}
          >
            <Grid container spacing={2}>
              {(displayPokemon.length > 0 ? displayPokemon : pokemonData).map((pokemon, i) => (
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
