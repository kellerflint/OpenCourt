import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FormPage from "./pages/FormPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import EventsPage from "./pages/EventsPage";

export default function App() {
  // Shared state for all events
  const [events, setEvents] = useState([]);

  // Add a new event
  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage addEvent={addEvent} />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/events" element={<EventsPage events={events} />} />
      </Routes>
    </Router>
  );
}
