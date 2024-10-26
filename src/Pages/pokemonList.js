import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import pokegif from "../Assets/pokebg.gif";

const typeColors = {
  grass: { backgroundColor: "#78C850", color: "#FFFFFF" },
  dark: { backgroundColor: "#36454F", color: "#FFFFFF" },
  poison: { backgroundColor: "#A040A0", color: "#FFFFFF" },
  fire: { backgroundColor: "#F08030", color: "#FFFFFF" },
  flying: { backgroundColor: "#A890F0", color: "#FFFFFF" },
  water: { backgroundColor: "#6890F0", color: "#FFFFFF" },
  bug: { backgroundColor: "#A8B820", color: "#FFFFFF" },
  normal: { backgroundColor: "#A8A878", color: "#FFFFFF" },
  electric: { backgroundColor: "#F8D030", color: "#FFFFFF" },
  fairy: { backgroundColor: "#F0B6C2", color: "#FFFFFF" },
  fighting: { backgroundColor: "#C03028", color: "#FFFFFF" },
  psychic: { backgroundColor: "#F85888", color: "#FFFFFF" },
  rock: { backgroundColor: "#B8A038", color: "#FFFFFF" },
  ghost: { backgroundColor: "#705898", color: "#FFFFFF" },
  ice: { backgroundColor: "#98D8D8", color: "#FFFFFF" },
  ground: { backgroundColor: "#E0C068", color: "#FFFFFF" },
  steel: { backgroundColor: "#B8B8D0", color: "#FFFFFF" },
  dragon: { backgroundColor: "#7038F8", color: "#FFFFFF" },
};

function PokemonList({ pokemon, onClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          p: 0,
          width: "12rem",
          maxWidth: 200,
        },
      }}
    >
      <Card
        onClick={onClick}
        sx={{
          cursor: "pointer",
          transition: "transform 0.3s ease, background 0.3s ease",
          position: "relative",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 3,
            backgroundImage: `url(${pokegif})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          },
        }}
      >
        <div style={{ position: "relative", paddingTop: "100%" }}>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              padding: "4px",
            }}
          />
        </div>
        <CardContent
          sx={{
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 1)",
            position: "relative",
            padding: 2,
          }}
        >
          <Typography variant="body2" sx={{ margin: 0 }}>
            #{pokemon.id.toString().padStart(3, "0")}
          </Typography>
          <Typography variant="h6" sx={{ margin: 0 }}>
            {pokemon.name}
          </Typography>
          <Grid item xs={12}>
            <Grid
              container
              spacing={0.5}
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
              wrap="nowrap"
            >
              {pokemon.types.map((type, i) => (
                <Grid item key={i}>
                  <Chip
                    label={type.type.name}
                    sx={{
                      backgroundColor:
                        typeColors[type.type.name]?.backgroundColor ||
                        "#CCCCCC",
                      color: typeColors[type.type.name]?.color || "#000000",
                      "&:hover": {
                        backgroundColor:
                          typeColors[type.type.name]?.backgroundColor ||
                          "#CCCCCC",
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PokemonList;
