import express from 'express';
import cors from 'cors';
import db, { initDB } from './db/db.js';            
import routes from './routes/router.js';

const app = express();
const PORT = 3001;

//allow other urls to access this
app.use(cors());
app.use(express.json());

//server mounting
app.use('/api', routes);

initDB()

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}/api`);
});