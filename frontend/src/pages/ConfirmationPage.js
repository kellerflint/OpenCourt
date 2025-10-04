import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventName, eventLocation } = location.state || {};

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>✅ Event Created!</h1>
      <p>
        {eventName && eventLocation
          ? `${eventName} at ${eventLocation} has been added.`
          : "Event has been added."}
      </p>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => navigate("/")}>Back to Home</button>
        <button onClick={() => navigate("/events")} style={{ marginLeft: "1rem" }}>
          View All Events
        </button>
      </div>
    </div>
  );
}
