"use client"; 

import { useEffect, useState } from "react";
import GameList from "./../components/GameList"; // adjust path as needed
import { buildApiUrl } from "../../lib/config";

export default function GamesPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(buildApiUrl("/api/courts"), {
          credentials: 'include'
        });
        const json = await res.json();
        setGames(json.data);
      } catch (err) {
        console.error("Failed to fetch games", err);
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
      <h1>All Games</h1>
      <GameList games={games} />
    </div>
  );
}