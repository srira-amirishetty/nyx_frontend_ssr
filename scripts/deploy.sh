#!/bin/bash

echo "Pulling latest code..."
sudo su
cd /var/www/nyx_frontend_ssr
git remote set-url origin https://$GH_PERSONAL_ACCESS_TOKEN@github.com/tech-nyx/nyx_frontend_ssr.git

git pull origin $BRANCH

# Install dependencies
echo "installing dependencies"
npm install --force

# Build the Next.js app
echo "Building the NextJS app"
npm run build

# Restart the app with PM2
echo "Restarting  the app with PM2"

pm2 restart $PM2_APP_NAME --log-date-format 'YYYY-MM-DD HH:mm:ss'
