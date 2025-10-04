import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, List, ListItem, ListItemText } from "@mui/material";

export default function EventsPage({ events }) {
  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom align="center">
        Available Events
      </Typography>

      {events.length === 0 ? (
        <Typography variant="body1" align="center">
          No events yet. Create one!
        </Typography>
      ) : (
        <List>
          {events.map((event, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={`${event.sport} @ ${event.eventLocation}`} />
            </ListItem>
          ))}
        </List>
      )}

      <Button
        component={Link}
        to="/"
        variant="outlined"
        color="primary"
        sx={{ display: "block", mt: 4, mx: "auto" }}
      >
        Back to Home
      </Button>
    </Container>
  );
}
