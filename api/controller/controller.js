import dataLayer from '../db/courtsRepo.js'

export const getAllGames = async (req, res) => {
    try {
        const data = await dataLayer.getAllGames();
        res.status(200).json({ message: "success", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getGamesBySport = async (req, res) => {
    const { sport } = req.params;
    try {
        const games = await dataLayer.getGamesBySport(sport);
        res.render('games-by-sport', { sport, games });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

export const getGameById = async (req, res) => {
  const { id } = req.params;

  try {
    const game = await dataLayer.getGameById(id); 

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.status(200).json({
      message: "success",
      data: game
    });
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};