#!/bin/bash
# Start OpenCourt server and frontend

# Exit immediately if a command fails
set -e

echo "Starting server..."

# Navigate to server directory and restart with PM2
cd src/server/
npm run pm2-stop || echo "PM2 stop failed or not running, continuing..."
npm run pm2

echo "Server started."

# Navigate to frontend and run dev server
cd ../frontend/opencourt/
echo "Starting frontend (accessible via network)..."
npm run dev -- --host
