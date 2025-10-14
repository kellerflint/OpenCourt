import { createEvent } from "../api/events";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Stack } from "@mui/material";

export default function FormPage() {
  const [sport, setSport] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { sport, eventLocation };
    await createEvent(newEvent);
    navigate("/confirmation", { state: { eventName: sport, eventLocation } });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom align="center">
        Create an Event
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Sport"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            required
          />
          <TextField
            label="Location"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
