#!/bin/bash

# Quick Update Script for ARC Frontend
# Run this from /home/ubuntu/projects/arc-deploy/arc_frontend

set -e  # Exit on any error

# Configuration
REPO_URL="https://github.com/pingtechdev/arc_frontend.git"
PROJECT_ROOT="/home/ubuntu/projects/arc-deploy"
FRONTEND_DIR="/home/ubuntu/projects/arc-deploy/arc_frontend"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

echo "🚀 Starting ARC Frontend Update..."
echo "================================="

# Step 1: Navigate to project root and pull latest code
print_status "Pulling latest changes from repository..."
cd $PROJECT_ROOT

# Check if it's a git repository, if not initialize it
if [ ! -d ".git" ]; then
    print_warning "Not a git repository. Initializing..."
    git init
    git remote add origin $REPO_URL
    git fetch origin
    git checkout -b main origin/main
else
    print_status "Pulling latest changes..."
    git pull origin main
fi

# Step 2: Navigate to frontend directory
print_status "Navigating to frontend directory..."
cd $FRONTEND_DIR

# Step 3: Install/update dependencies
print_status "Installing/updating dependencies..."
npm install

# Step 4: Build for production
print_status "Building frontend for production..."
npm run build

# Step 5: Set proper permissions
print_status "Setting proper permissions..."
sudo chown -R ubuntu:ubuntu $FRONTEND_DIR/dist
sudo chmod -R 755 $FRONTEND_DIR/dist

# Step 6: Restart nginx to serve new build
print_status "Reloading nginx..."
sudo systemctl reload nginx

# Step 7: Check if nginx is serving the new build
print_status "Verifying deployment..."
if [ -d "$FRONTEND_DIR/dist" ] && [ -f "$FRONTEND_DIR/dist/index.html" ]; then
    print_success "✅ Frontend build completed successfully!"
    print_success "✅ Nginx reloaded successfully!"
    print_success "✅ Your changes are now live!"
else
    print_error "❌ Build failed or dist directory not found"
    exit 1
fi

echo ""
echo "🎉 Update completed successfully!"
echo "📁 Build location: $FRONTEND_DIR/dist"
echo "🌐 Your frontend should be accessible at your domain"
echo ""
echo "🔧 Useful commands:"
echo "• Check nginx status: sudo systemctl status nginx"
echo "• Check nginx logs: sudo tail -f /var/log/nginx/error.log"
echo "• Restart nginx: sudo systemctl restart nginx"