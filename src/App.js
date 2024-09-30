import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getPokemon, getAllPokemon } from './Services/pokeServices.js';
import PokemonList from './Pages/pokemonList.js';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(apiURL);
      await loadPokemon(response.results);
      setLoading(false);
      console.log(response);
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

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className='gridContainer' style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <Typography variant="h2" sx={{ textAlign: 'center', margin: '20px 0' }}>
            PokeInfo
          </Typography>
          

          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <Routes>
              <Route
                exact
                path='/'
                element={
                  <Grid container spacing={2}>
                  {pokemonData.map((pokemon, i) => (
                    <Grid item xs={6} sm={6} md={3} lg={2} key={i}>
                      <PokemonList pokemon={pokemon} />
                    </Grid>
                  ))}
                </Grid>
                }
              />
            </Routes>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
