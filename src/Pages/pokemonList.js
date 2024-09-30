import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function PokemonList({ pokemon }) {
  return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            p: 2,
            width: '15rem',
            maxWidth: 300, 
          },
        }}
      >
      <Paper elevation={4}>
        <Grid container direction="column" spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt="pokemon"
              style={{ width: '100%' }}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <div>
                  <h1 style={{ margin: '0' }}> 
                    #<span>{pokemon.id}</span>
                  </h1>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <div>
                  <h2 style={{ margin: '0' }}>{pokemon.name}</h2>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1}>
              {pokemon.types.map((type, i) => (
                <Grid item key={i}>
                  <div><h2 style={{ margin: '0' }}>{type.type.name}</h2></div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default PokemonList;
