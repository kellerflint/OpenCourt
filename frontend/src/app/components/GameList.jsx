import GameCard from "./GameCard";

export default function GameList({ games = [] }) {
  if (!Array.isArray(games) || games.length === 0) {
    return <p>No games available right now.</p>;
  }

  return (
    <div className="game-list">
      {games.map((game) => (
        <GameCard key={game.id ?? `${game.sport}-${game.reservation_date}-${game.reservation_time}`} game={game} />
      ))}
    </div>
  );
}
