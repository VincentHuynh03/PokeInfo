import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function PokemonList({ pokemon, onClick }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          p: 1,
          width: '12rem',
          maxWidth: 200,
        },
      }}
    >
      <Paper elevation={6} onClick={onClick} style={{ cursor: 'pointer' }}>
      <Grid container direction="column" spacing={1} alignItems="center">
          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt="pokemon"
              style={{ width: '80%', display: 'block' }}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ margin: 0 }}>
                  #{pokemon.id}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ margin: 0, fontWeight: '450', whiteSpace: 'nowrap' }}>
                  {pokemon.name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={0.5}>
              {pokemon.types.map((type, i) => (
                <Grid item key={i}>
                  <Typography variant="body1" sx={{ margin: 0 }}>
                    {type.type.name}
                  </Typography>
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
