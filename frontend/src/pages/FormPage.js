import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormPage({ addEvent }) {
  const [sport, setSport] = useState("");
  const [eventLocation, setEventLocation] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add to global events
    const newEvent = { sport, eventLocation };
    addEvent(newEvent);

    navigate("/confirmation", {
      state: { eventName: sport, eventLocation: eventLocation },
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Create an Event</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "300px", margin: "0 auto" }}>
        <input
          type="text"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          placeholder="Enter sport (e.g. Tennis, Basketball)"
          required
        />
        <input
          type="text"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)} 
          placeholder="Enter location"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
