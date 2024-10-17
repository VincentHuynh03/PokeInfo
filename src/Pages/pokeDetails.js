import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pokeball from '../Assets/pokeball.png';

function PokeDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) throw new Error('Pokemon not found');
        const data = await response.json();
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  if (loading) return;
  if (error) return  <Typography sx={{ margin: 'auto',  textAlign: 'center', mt: 50 }}>Error: {error}</Typography>;

  return (
    <Box
      sx={{
        margin: 'auto',
        mt: 25,
        width: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage:`url(${Pokeball})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'top center',
        userSelect: 'none',
      }}
      
    >
        <Grid container direction="column" spacing={1} alignItems="center">
          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt="pokemon"
              style={{ width: '80%', display: 'block' }}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="h3" sx={{ margin: 0, userSelect: 'text' }}>
                  #{pokemon.id}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="h2" sx={{ margin: 0, fontWeight: '450', whiteSpace: 'nowrap', userSelect: 'text' }}>
                  {pokemon.name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={0.5}>
              {pokemon.types.map((type, i) => (
                <Grid item key={i}>
                  <Typography variant="body1" sx={{ margin: 0, userSelect: 'text' }}>
                    {type.type.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
    </Box>
  );
}

export default PokeDetails;
