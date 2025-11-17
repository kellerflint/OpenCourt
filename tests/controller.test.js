// tests/controller.test.js
const db = require('../src/server/model/db');
const {
  getAllGames,
  addGame,
  getAllUsers,
  addUser,
  getAllLocations,
  addLocation,
  getAllGamesUsers
} = require('../src/server/controllers/controller');

// Mock the db module so we don't hit a real database
jest.mock('../src/server/model/db', () => ({
  query: jest.fn()
}));

// Helper to fake Express's res object
const createMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getAllGames', () => {
  it('returns 200 and list of games', async () => {
    const fakeGames = [{ id: 1, game_name: 'Basketball', location_id: 1 }];
    db.query.mockResolvedValueOnce([fakeGames]);

    const req = {};
    const res = createMockRes();

    await getAllGames(req, res);

    expect(db.query).toHaveBeenCalledWith('SELECT * FROM games');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeGames);
  });

  it('returns 500 on database error', async () => {
    db.query.mockRejectedValueOnce(new Error('DB error'));

    const req = {};
    const res = createMockRes();

    await getAllGames(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});

describe('addGame', () => {
  it('returns 400 if game_name or location_id is invalid', async () => {
    const req = { body: { game_name: '', location_id: 0 } };
    const res = createMockRes();

    await addGame(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input' });
    expect(db.query).not.toHaveBeenCalled();
  });

  it('inserts game and returns 201 with id on success', async () => {
    const req = { body: { game_name: 'Soccer', location_id: 2 } };
    const res = createMockRes();

    db.query.mockResolvedValueOnce([{ insertId: 42 }]);

    await addGame(req, res);

    expect(db.query).toHaveBeenCalledWith(
      'INSERT INTO games (game_name, location_id) VALUES (?, ?)',
      ['Soccer', 2]
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 42 });
  });

  it('returns 500 on database error', async () => {
    const req = { body: { game_name: 'Soccer', location_id: 2 } };
    const res = createMockRes();

    db.query.mockRejectedValueOnce(new Error('DB error'));

    await addGame(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});

describe('getAllUsers', () => {
  it('returns 200 and list of users', async () => {
    const fakeUsers = [{ id: 1, user_name: 'Test User' }];
    db.query.mockResolvedValueOnce([fakeUsers]);

    const req = {};
    const res = createMockRes();

    await getAllUsers(req, res);

    expect(db.query).toHaveBeenCalledWith('SELECT * FROM users');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeUsers);
  });
});

describe('addUser', () => {
  it('returns 400 if user_name is empty', async () => {
    const req = { body: { user_name: '' } };
    const res = createMockRes();

    await addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input' });
    expect(db.query).not.toHaveBeenCalled();
  });

  it('inserts user and returns 201 with id on success', async () => {
    const req = { body: { user_name: 'Bahram' } };
    const res = createMockRes();

    db.query.mockResolvedValueOnce([{ insertId: 7 }]);

    await addUser(req, res);

    expect(db.query).toHaveBeenCalledWith(
      'INSERT INTO users (user_name) VALUES (?)',
      ['Bahram']
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 7 });
  });
});

describe('getAllLocations', () => {
  it('returns 200 and list of locations', async () => {
    const fakeLocations = [{ id: 1, location_name: 'Gym', address: '123 St' }];
    db.query.mockResolvedValueOnce([fakeLocations]);

    const req = {};
    const res = createMockRes();

    await getAllLocations(req, res);

    expect(db.query).toHaveBeenCalledWith('SELECT * FROM locations');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeLocations);
  });
});

describe('addLocation', () => {
  it('returns 400 if location_name or address is empty', async () => {
    const req = { body: { location_name: '', address: '' } };
    const res = createMockRes();

    await addLocation(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input' });
    expect(db.query).not.toHaveBeenCalled();
  });

  it('inserts location and returns 201 with id on success', async () => {
    const req = { body: { location_name: 'Gym', address: '123 Main St' } };
    const res = createMockRes();

    db.query.mockResolvedValueOnce([{ insertId: 99 }]);

    await addLocation(req, res);

    expect(db.query).toHaveBeenCalledWith(
      'INSERT INTO locations (location_name, address) VALUES (?, ?)',
      ['Gym', '123 Main St']
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 99 });
  });
});

describe('getAllGamesUsers', () => {
  it('returns 200 and list of games_users', async () => {
    const fakeGamesUsers = [{ id: 1, game_id: 1, user_id: 1 }];
    db.query.mockResolvedValueOnce([fakeGamesUsers]);

    const req = {};
    const res = createMockRes();

    await getAllGamesUsers(req, res);

    expect(db.query).toHaveBeenCalledWith('SELECT * FROM games_users');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeGamesUsers);
  });
});
