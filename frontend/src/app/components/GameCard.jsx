

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
                <p><strong>Date:</strong> {game.reservation_date}</p>
                <p><strong>Time:</strong> {game.reservation_time}</p>
                <p><strong>Posted by:</strong> {game.username}</p>
                {game.number_of_people != null && (
                    <p><strong>People Needed:</strong> {game.number_of_people}</p>
                )}
            </div>
        </div>
    ); 
}