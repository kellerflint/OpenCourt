import React from "react";
import GameCard from "./GameCard.jsx";
import { Grid } from "@mui/material";

// will have all the court information from the lower level component courtsCard

const Courts = ({ courts }) => {
  return (
    <Grid container spacing={4}>
      {rentals.map((rental, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <GameCard rental={rental} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Rentals;
