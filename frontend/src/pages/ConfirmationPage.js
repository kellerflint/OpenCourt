import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Stack } from "@mui/material";

// This is the confirmation page, after an event is created 
// displays event and location, buttons here will go back to home page or view all events
export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventName, eventLocation } = location.state || {};

// Renders a the confirmation page with the nav buttons 
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        ✅ Event Created!
      </Typography>
      <Typography variant="body1" gutterBottom>
        {eventName && eventLocation
          ? `${eventName} at ${eventLocation} has been added.`
          : "Event has been added."}
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <Button onClick={() => navigate("/")} variant="outlined" color="primary">
          Back to Home
        </Button>
        <Button onClick={() => navigate("/events")} variant="contained" color="secondary">
          View All Events
        </Button>
      </Stack>
    </Container>
  );
}
