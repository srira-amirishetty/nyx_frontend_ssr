sudo bash -c '
  echo "🔄 Pulling latest code..."

  # Mark the directory as safe for Git
  git config --global --add safe.directory /var/www/nyx_frontend_ssr

  # Change directory
  cd /var/www/nyx_frontend_ssr

  # Fix ownership (if needed)
  chown -R root:root /var/www/nyx_frontend_ssr

  # Set GitHub remote
  git remote set-url origin https://'"$GH_PERSONAL_ACCESS_TOKEN"'@github.com/tech-nyx/nyx_frontend_ssr.git

  # Pull the latest changes
  git pull origin main

  npm install

  npm run build

  echo "🚀 Restarting frontend app using PM2..."

  # Restart or start PM2 process
  pm2 restart frontend-prod-ssr || pm2 start ecosystem.config.js --only frontend-prod-ssr

  echo "✅ Deployment complete!"
'
