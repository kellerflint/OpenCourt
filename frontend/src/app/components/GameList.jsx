
import React from "react";
import GameCard from "./GameCard";
import { Grid } from "@mui/material";

const GameList = ({ games }) => {
  return (
    <Grid container spacing={4}>
      {games.map((game, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <GameCard game={game} />
        </Grid>
      ))}
    </Grid>
  );
};

export default GameList;
