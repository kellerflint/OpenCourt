

export default function GameCard({ game }) {

    const sportImage = game.sport.toLowerCase().replace(/\s+/g, '');
    const imageSrc = `/sports/${sportImage}.jpg`;

    return (
        <div className="game-card">
            <img
                src={imageSrc}
                alt={game.sport}
                className="sport-image"
            />
            <div className="game-info">
                <h3>{game.sport}</h3>
                <p><strong>Date:</strong> {game.date}</p>
                <p><strong>Time:</strong> {game.time}</p>
                <p><strong>Posted by:</strong> {game.username}</p>
                {game.peopleNeeded !== null && (
                    <p><strong>People Needed:</strong> {game.peopleNeeded}</p>
                )}
            </div>
        </div>
    ); 
}