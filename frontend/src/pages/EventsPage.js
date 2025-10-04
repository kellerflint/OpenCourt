import React from "react";
import { Link } from "react-router-dom";

export default function EventsPage({ events }) {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Available Events</h1>

      {events.length === 0 ? (
        <p>No events yet. Create one!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {events.map((event, index) => (
            <li key={index} style={{ margin: "1rem 0" }}>
              <strong>{event.sport}</strong> at {event.eventLocation}
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "2rem" }}>
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}
