import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getPokemon, getAllPokemon } from './Services/pokeServices.js';
import PokemonList from './Pages/pokemonList.js';
import './App.css';

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
    <>
  <Router>
        <div className='gridContainer' style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <Routes>
              <Route
                exact
                path='/'
                element={
                  pokemonData.map((pokemon, i) => (
                    <PokemonList key={i} pokemon={pokemon} />
                  ))
                }
              />
            </Routes>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
