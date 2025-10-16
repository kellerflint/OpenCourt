# OpenCourt
Find a court. Join a game. Play more. Search less.

OpenCourt helps players discover and organize open-play sessions for sports like pickleball, basketball, tennis, volleyball, and more.

- Tech stack: Next.js (frontend), Node.js/Express + Passport (API), MySQL + Sequelize (DB), PM2 (process manager).
- Core features: Create/join events, view events and participants, update/delete events.
- Extended ideas: User profiles, skill ratings, payments.

## Project Structure
- frontend/ — Next.js app (App Router)
- api/ — Express API with Passport sessions
- api/models — Sequelize models (users, games, sessions)
- api/routes — Routers (login, games, etc.)
- scripts/ — Deployment scripts

## Prerequisites
- Node.js 20.x and npm
- MySQL 8.x
- PM2 (for production)
- Git

## Environment Variables
API (api/.env)
- DB_HOST: MySQL host (default: localhost)
- DB_USER: MySQL user
- DB_PASS: MySQL password
- DB_NAME: Database name (e.g., openCourt)
- DB_PORT: MySQL port (default: 3306)
- PORT: API port (default: 3001)
- SESSION_SECRET: Any random string
- CORS_ORIGIN: Comma-separated allowed origins (e.g., http://YOUR.IP:3000,http://localhost:3000)
- NODE_ENV: development for HTTP, production for HTTPS

Frontend (frontend/.env.local)
- NEXT_PUBLIC_API_URL: Base URL of API (e.g., http://YOUR.IP:3001)

## Local Development
1) Create DB
- Create a MySQL database (e.g., openCourt) and user with full privileges.

2) API env
- Create api/.env:
```
DB_HOST=localhost
DB_USER=your_user
DB_PASS=your_pass
DB_NAME=openCourt
DB_PORT=3306
PORT=3001
SESSION_SECRET=dev-secret
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

3) Frontend env
- Create frontend/.env.local:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4) Install and run
- API:
```
cd api
npm install
npm start
```
- Frontend (dev):
```
cd frontend
npm install
npm run dev
```
- Frontend (prod):
```
cd frontend
npm run build
npm run start -p 3000
```

## Deployment (Minimal VM Script)
Use the provided script to set up a fresh Ubuntu VM end-to-end (updates, Node.js, MySQL, PM2, repo clone, envs, build, PM2 start).

Run on the VM:
```
sudo bash scripts/min-setup.sh \
  -r https://github.com/youruser/OpenCourt.git \
  -b main \
  -d YOUR.SERVER.IP \
  --db-name openCourt \
  --db-user opencourt \
  --db-pass blue123
```

What it does
- Updates the system (non-interactive)
- Installs Git, Node.js 20.x, MySQL, PM2
- Creates MySQL database, user, and grants
- Clones (or updates) the repo to /home/OpenCourt
- Writes api/.env and frontend/.env.local
- Installs npm deps, builds frontend, starts both with PM2
- Prints health endpoints

PM2 commands
- View: pm2 ls
- Logs: pm2 logs opencourt-api opencourt-frontend
- Restart: pm2 restart opencourt-api opencourt-frontend
- Save boot: pm2 save

## Troubleshooting
- Auth cookies on HTTP: set NODE_ENV=development in api/.env.
- CORS: ensure CORS_ORIGIN includes your frontend origin.
- 404 /logo.png: add frontend/public/logo.png.
- Ports in-use: change PORT (API) or Next start -p (frontend).