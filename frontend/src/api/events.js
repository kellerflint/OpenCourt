const API_URL = "http://localhost:3000"; // later swap with droplet IP

export async function getEvents() {
  const res = await fetch(`${API_URL}/events`);
  return res.json();
}

export async function createEvent(eventData) {
  const res = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  return res.json();
}
