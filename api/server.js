import express from 'express';
import cors from 'cors';
import { initDB } from './db/db.js';
import sequelize from './db/db.js';
import routes from './routes/router.js';
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectSession from "connect-session-sequelize";
import passport from './services/passport.js';

import 'dotenv/config';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const SESSION_SECRET = process.env.SESSION_SECRET ?? 'development-session-secret';
const ALLOWED_ORIGINS = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
  : undefined;

app.use(cors({
  origin: ALLOWED_ORIGINS ?? true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser())



//sessions
// create Sequelize-backed store for express-session
const SequelizeStore = connectSession(session.Store);
const store = new SequelizeStore({ db: sequelize });
await store.sync();


app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,                     // don't re-save session if nothing changed
    saveUninitialized: false,          // don't create empty sessions before login
    store,                             // where sessions are actually stored (DB)
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,     // session expires after 1 day
    },
  })
);


// middleware verifying user is logged in on each route
app.use(passport.initialize());
app.use(passport.session());

// Initialize database
try {
  await initDB();
} catch (err) {
  console.error('Failed to initialize database:', err);
  process.exit(1);
}

//make sure their authenticated! 
app.use('/api', authRouter);
//server mounting - all game/auth routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
}); 