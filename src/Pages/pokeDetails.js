import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pokeball from "../Assets/pokeball.png";
import Chip from "@mui/material/Chip";
import { Card, CardContent, CardHeader } from "@mui/material";
import pokeinfoLogo from "../Assets/pokeinfo-logo.png";
import "./pokeDetails.css";

function PokeDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        if (!response.ok) throw new Error("Pokemon not found");
        const data = await response.json();

        const speciesResponse = await fetch(data.species.url);
        if (!speciesResponse.ok)
          throw new Error("Species information not found");
        const speciesData = await speciesResponse.json();

        const typeUrls = data.types.map((types) =>
          fetch(`https://pokeapi.co/api/v2/type/${types.type.name}`)
        );
        const typeResponses = await Promise.all(typeUrls);
        const typeDataArray = await Promise.all(
          typeResponses.map((res) => res.json())
        );

        const weaknessesSet = new Set();
        const strengthsSet = new Set();
        const immuneSet = new Set();

        typeDataArray.forEach((typeData) => {
          typeData.damage_relations.double_damage_from.forEach((damage) =>
            weaknessesSet.add(damage.name)
          );
          typeData.damage_relations.no_damage_from.forEach((damage) =>
            immuneSet.add(damage.name)
          );
          typeData.damage_relations.half_damage_from.forEach((damage) =>
            immuneSet.add(damage.name)
          );
          typeData.damage_relations.double_damage_to.forEach((damage) =>
            strengthsSet.add(damage.name)
          );
        });

        const filteredWeaknesses = Array.from(weaknessesSet).filter(
          (weakness) => !immuneSet.has(weakness)
        );

        setWeaknesses(Array.from(filteredWeaknesses));
        setStrengths(Array.from(strengthsSet));

        weaknessesSet.forEach((weakness) => {
          if (immuneSet.has(weakness)) {
            weaknessesSet.delete(weakness);
          }
        });

        setPokemon({ ...data, speciesData });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  if (loading) return;
  if (error)
    return (
      <Typography sx={{ margin: "auto", textAlign: "center", mt: 50 }}>
        Error: {error}
      </Typography>
    );

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

  return (
    <>
      <Box
        sx={{
          justifyContent: "flex-start",
          display: "flex",
          alignItems: "flex-start",
          height: "150px",
          width: "100%",
          backgroundColor: "#E6F8E2",
          mb: 2,
          position: "relative",
        }}
      >
        <img
          className="pokeinfo-font-image logoDetails"
          src={pokeinfoLogo}
          alt="pokemon-font"
          border="0"
        />
      </Box>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ mt: 4 }}
      >
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          sx={{ order: { xs: 2, sm: 3 }, mt: { xs: 0, md: "80px" } }}
        >
          <Card
            sx={{
              maxWidth: 400,
              mx: "auto",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <CardHeader
              title={
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Types
                </Typography>
              }
              sx={{
                background: "linear-gradient(to right, #7EC8E3, #4DA6D8)",
                p: 2,
              }}
            />
            <CardContent>
              <Grid container spacing={2} sx={{ flexDirection: "column" }}>
                <Grid item xs={12} sx={{ margin: "auto" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      textTransform: "uppercase",
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    Strengths
                  </Typography>
                  <Grid container spacing={2}>
                    {strengths.map((strength, i) => (
                      <Grid item key={i} sx={{ margin: "auto" }}>
                        <Chip
                          label={strength}
                          sx={{
                            backgroundColor:
                              typeColors[strength]?.backgroundColor,
                            color: typeColors[strength]?.color,
                            "&:hover": {
                              backgroundColor:
                                typeColors[strength]?.backgroundColor,
                            },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ margin: "auto" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      textTransform: "uppercase",
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    Weaknesses
                  </Typography>
                  <Grid container spacing={2}>
                    {weaknesses.map((weakness, i) => (
                      <Grid item key={i} sx={{ margin: "auto" }}>
                        <Chip
                          label={weakness}
                          sx={{
                            backgroundColor:
                              typeColors[weakness]?.backgroundColor ||
                              "#CCCCCC",
                            color: typeColors[weakness]?.color || "#000000",
                            "&:hover": {
                              backgroundColor:
                                typeColors[weakness]?.backgroundColor ||
                                "#CCCCCC",
                            },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} md={3} sx={{ order: { xs: 1, sm: 2 } }}>
          <Box
            sx={{
              margin: "auto",
              mt: 5,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundImage: `url(${Pokeball})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top center",
              userSelect: "none",
              "@media (max-width: 600px)": {
                width: "90%",
                backgroundSize: "80%",
              },
            }}
          >
            <Grid container direction="column" spacing={1} alignItems="center">
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "auto",
                }}
              >
                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt="pokemon"
                  style={{ width: "80%", display: "block" }}
                />
              </Grid>

              <Grid item xs={12} sm={8}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography
                      variant="h3"
                      sx={{ margin: 0, userSelect: "text" }}
                    >
                      #{pokemon.id}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography
                      variant="h3"
                      sx={{
                        margin: 0,
                        fontWeight: "450",
                        whiteSpace: "nowrap",
                        userSelect: "text",
                      }}
                    >
                      {pokemon.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={0.5}>
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
            </Grid>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          sx={{ order: { xs: 3, sm: 1 }, mt: { xs: 0, md: "80px" } }}
        >
          <Card
            sx={{
              maxWidth: 400,
              mx: "auto",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <CardHeader
              title={
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "white",
                  }}
                >
                  Pokemon Details
                </Typography>
              }
              sx={{
                background: "linear-gradient(to right, #FF7E7E, #FF4D4D)",
                p: 2,
              }}
            />
            <CardContent>
              <Typography variant="body1" sx={{ mb: 2, textTransform: "none" }}>
                {pokemon.speciesData.flavor_text_entries
                  .find((entry) => entry.language.name === "en")
                  .flavor_text.replace(/\n|\f/g, " ")}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "uppercase" }}
                  >
                    Generation
                  </Typography>
                  <Typography variant="body1">
                    {pokemon.speciesData.generation.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "uppercase" }}
                  >
                    Category
                  </Typography>
                  <Typography variant="body1">
                    {pokemon.speciesData.genera[7].genus}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "uppercase" }}
                  >
                    Ability
                  </Typography>
                  <Chip
                    variant="outlined"
                    label={pokemon.abilities[0].ability.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "uppercase" }}
                  >
                    Height
                  </Typography>
                  <Typography variant="body1">
                    {(pokemon.height / 10).toFixed(1)} m
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "uppercase" }}
                  >
                    Weight
                  </Typography>
                  <Typography variant="body1">
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default PokeDetails;
