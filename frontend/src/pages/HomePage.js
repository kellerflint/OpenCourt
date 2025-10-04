import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Stack } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 6 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to OpenCourt 🏀🎾🏐
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Find a court. Join a game. Play more, search less.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <Button component={Link} to="/form" variant="contained" color="primary">
          Create an Event
        </Button>
        <Button component={Link} to="/events" variant="outlined" color="secondary">
          View Events
        </Button>
      </Stack>
    </Container>
  );
}
