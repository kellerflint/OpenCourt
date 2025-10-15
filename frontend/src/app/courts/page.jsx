'use client';
import { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';

export default function CourtsPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch('/api/games');
        if (!res.ok) {
          throw new Error('Failed to fetch games');
        }
        const data = await res.json();
        setGames(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  if (loading) return <p>Loading games...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="courts-page">
      <h1>Available Games</h1>
      <div className="games-list">
        {games.length === 0 ? (
          <p>No games posted yet.</p>
        ) : (
          games.map((game) => <GameCard key={game.id} game={game} />)
        )}
      </div>
    </div>
  );
}