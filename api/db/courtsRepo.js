import Game from './../model/games.js'; 

export const getAllGames = async () => {
    return await Game.findAll();
};

export const getGameById = async (gameId) => {
    return await Game.findByPk(gameId);
};

export const getGamesBySport = async (sport) => {
    return await Game.findAll({
        where: { sport }
    });
};

export const addGame = async (game) => {
    console.log('DATALAYER: Data submitted to Sequelize:', game)
    return await Game.create(game);
};

export const updateGame = async (game) => {
    return await Game.update(game, {
        where: { gameId: game.gameId }
    });
};

export const deleteGame = async (gameId) => {
    return await Game.destroy({
        where: { gameId }
    });
};