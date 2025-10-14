const API_URL = process.env.REACT_APP_API; // pulled from .env file, curently using the localhost address

// Get all events
export async function getEvents() {
  const res = await fetch(`${API_URL}/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

// Create a new event 
export async function createEvent(eventData) {
  // Send POST request with event data 
  const res = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });

  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
}
