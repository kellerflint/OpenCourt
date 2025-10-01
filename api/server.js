import express from 'express';
import cors from 'cors';
import pool from './db/pool.js';
import routes from '../api/routes/router.js'

const app = express();
const PORT = 3001;

//allowing other things to make request to the api
app.use(cors());
//allows it to parse json
app.use(express.json());

// Test DB connection at startup
async function testDbConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    console.log('Connected to MySQL openCourt DB');
  } catch (err) {
    console.error(' DB connection failed:', err.message);
  }
}

testDbConnection();


app.use('/api', routes)

app.listen(PORT, () =>
  console.log(`API listening on http://localhost:${PORT}/api`)
);
