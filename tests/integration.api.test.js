require('dotenv').config({ path: '.env.test' });

const request = require('supertest');
const app = require('../src/server/server');
const db = require('../src/server/model/db');

beforeEach(async () => {

  await db.query('DELETE FROM games_users');
  await db.query('DELETE FROM games');
  await db.query('DELETE FROM users');
  await db.query('DELETE FROM locations');
});

afterAll(async () => {
  await db.end();
});

describe('Locations API', () => {
  test('POST /api/locations creates a location and GET /api/locations returns it', async () => {
    const createRes = await request(app)
      .post('/api/locations')
      .send({ location_name: 'Gym A', address: '123 Main St' })
      .expect(201);

    expect(createRes.body).toHaveProperty('id');

    const [rows] = await db.query('SELECT * FROM locations');
    expect(rows).toHaveLength(1);
    expect(rows[0].location_name).toBe('Gym A');
    expect(rows[0].address).toBe('123 Main St');

    const getRes = await request(app)
      .get('/api/locations')
      .expect(200);

    expect(getRes.body).toHaveLength(1);
    expect(getRes.body[0].location_name).toBe('Gym A');
    expect(getRes.body[0].address).toBe('123 Main St');
  });
});

describe('Users API', () => {
  test('POST /api/users creates a user and GET /api/users returns it', async () => {
    const createRes = await request(app)
      .post('/api/users')
      .send({ user_name: 'Bahram' })
      .expect(201);

    expect(createRes.body).toHaveProperty('id');

    const getRes = await request(app)
      .get('/api/users')
      .expect(200);

    expect(getRes.body).toHaveLength(1);
    expect(getRes.body[0].user_name).toBe('Bahram');
  });
});

describe('Games API', () => {
  test('POST /api/games with valid data inserts a game linked to a location', async () => {
    const [locResult] = await db.query(
      'INSERT INTO locations (location_name, address) VALUES (?, ?)',
      ['Main Gym', '456 Center St']
    );
    const locationId = locResult.insertId;

    const createRes = await request(app)
      .post('/api/games')
      .send({ game_name: 'Basketball', location_id: locationId })
      .expect(201);

    expect(createRes.body).toHaveProperty('id');

    const [games] = await db.query('SELECT * FROM games');
    expect(games).toHaveLength(1);
    expect(games[0].game_name).toBe('Basketball');
    expect(games[0].location_id).toBe(locationId);

    const getRes = await request(app)
      .get('/api/games')
      .expect(200);

    expect(getRes.body).toHaveLength(1);
    expect(getRes.body[0].game_name).toBe('Basketball');
    expect(getRes.body[0].location_id).toBe(locationId);
  });

  test('POST /api/games with invalid input returns 400 and does not insert', async () => {
    await request(app)
      .post('/api/games')
      .send({ game_name: '', location_id: 0 })
      .expect(400);

    const [games] = await db.query('SELECT * FROM games');
    expect(games).toHaveLength(0);
  });
});
