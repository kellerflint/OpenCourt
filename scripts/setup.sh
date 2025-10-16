#!/bin/bash
# min-setup.sh - Quick VM setup script for OpenCourt
# Installs all required dependencies and configures the application

# Exit on error
set -e

# Default values for our app
REPO="https://github.com/brittLiban/OpenCourt.git"
DB_NAME="openCourt"
DB_USER="opencourt"
DB_PASS="blue123"
APP_DIR="/home/OpenCourt"

# Get server IP for configs
SERVER_IP=$(hostname -I | awk '{print $1}')

# Start installation
echo "Starting OpenCourt setup..."

# System updates
echo "Updating system packages..."
apt-get update
apt-get upgrade -y

# Install basic dependencies
echo "Installing dependencies..."
apt-get install -y git curl mysql-server

# Install Node.js 20
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PM2 globally
echo "Installing PM2..."
npm install -g pm2

# Setup MySQL
echo "Setting up MySQL database..."
systemctl start mysql
mysql -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME};"
mysql -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';"
mysql -e "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

# Clone repo
echo "Cloning repository..."
if [ -d "$APP_DIR" ]; then
  echo "Directory exists, pulling latest changes..."
  cd $APP_DIR
  git pull
else
  git clone $REPO $APP_DIR
fi

# Setup API environment
echo "Setting up API environment..."
cat > $APP_DIR/api/.env << EOF
DB_HOST=localhost
DB_USER=$DB_USER
DB_PASS=$DB_PASS
DB_NAME=$DB_NAME
DB_PORT=3306
PORT=3001
SESSION_SECRET=$(openssl rand -hex 16)
CORS_ORIGIN=http://$SERVER_IP:3000,http://localhost:3000
NODE_ENV=development
EOF

# Setup frontend environment
echo "Setting up frontend environment..."
cat > $APP_DIR/frontend/.env.local << EOF
NEXT_PUBLIC_API_URL=http://$SERVER_IP:3001
EOF

# Install API dependencies
echo "Installing API dependencies..."
cd $APP_DIR/api
npm install

# Install frontend dependencies and build
echo "Installing frontend dependencies and building..."
cd $APP_DIR/frontend
npm install
npm run build

# Start with PM2
echo "Starting services with PM2..."
cd $APP_DIR/api
pm2 delete opencourt-api 2>/dev/null || true
pm2 start server.js --name opencourt-api

cd $APP_DIR/frontend
pm2 delete opencourt-frontend 2>/dev/null || true
pm2 start npm --name opencourt-frontend -- start -- -p 3000

# Save PM2 config
pm2 save

# Done!
echo "===== Setup Complete! ====="
echo "Frontend: http://$SERVER_IP:3000"
echo "API: http://$SERVER_IP:3001"
echo "PM2 commands:"
echo "  - View services: pm2 ls"
echo "  - View logs: pm2 logs opencourt-api opencourt-frontend"