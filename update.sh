#!/bin/bash

# Quick Update Script for ARC Project
# Use this for regular updates after initial deployment

set -e  # Exit on any error

# Configuration
PROJECT_DIR="/home/ubuntu/projects/arc-deploy/arc_frontend"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

echo "🚀 Starting quick update..."
echo "=========================="

# Step 1: Pull latest code
print_status "Pulling latest changes from repository..."
cd $PROJECT_DIR
git pull origin main

# Step 2: Update frontend
print_status "Updating frontend..."
cd $PROJECT_DIR/arc_frontend

# Install/update dependencies
npm install

# Build for production
npm run build

# Set proper permissions
sudo chown -R ubuntu:ubuntu $PROJECT_DIR/arc_frontend/dist
sudo chmod -R 755 $PROJECT_DIR/arc_frontend/dist

# Step 3: Restart nginx to serve new build
print_status "Reloading nginx..."
sudo systemctl reload nginx

print_success "✅ Update completed successfully!"
echo ""
echo "🎉 Your changes are now live!"
