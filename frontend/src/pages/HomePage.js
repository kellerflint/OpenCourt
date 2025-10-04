import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to OpenCourt! 🏀🎾🏐</h1>
      <p>Find a court. Join a game. Play more, search less.</p>

      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <Link to="/form">
          <button>Create an Event</button>
        </Link>

        <Link to="/events">
          <button>View Events</button>
        </Link>
      </div>
    </div>
  );
}
