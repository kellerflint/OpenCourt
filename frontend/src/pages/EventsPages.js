import { useEffect, useState } from "react";
import { getEvents } from "../api/events";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Available Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="border-b py-2">
            {event.sport} @ {event.location} on {event.time}
          </li>
        ))}
      </ul>
    </div>
  );
}
