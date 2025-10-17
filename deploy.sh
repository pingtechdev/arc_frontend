#!/bin/bash

echo "🚀 Deploying React Frontend..."

# Set production environment variables
export VITE_WAGTAIL_API_URL=https://api.arc.pingtech.dev/api/v2
export VITE_CMS_API_URL=https://api.arc.pingtech.dev

# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build the React app for production
npm run build

# Set proper permissions
sudo chown -R www-data:www-data dist/
sudo chmod -R 755 dist/
sudo chmod 644 dist/index.html

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl reload nginx

echo "✅ React Frontend deployed successfully!"
echo "🌐 Frontend: https://arc.pingtech.dev"
echo "🔗 API: https://api.arc.pingtech.dev"
