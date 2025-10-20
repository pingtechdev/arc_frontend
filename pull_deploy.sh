#!/bin/bash

# ===========================================
# ARC Frontend Deployment Script
# ===========================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
NGINX_SITE="arc.pingtech.dev"
BACKUP_DIR="./backups"
LOG_FILE="./deployment.log"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command succeeded
check_status() {
    if [ $? -eq 0 ]; then
        print_success "$1"
    else
        print_error "$1"
        exit 1
    fi
}

# Start deployment
echo "=========================================="
echo "🚀 Starting ARC Frontend Deployment"
echo "=========================================="

# Step 1: Create backup of current build
print_status "Creating backup of current build..."
if [ -d "dist" ]; then
    mkdir -p $BACKUP_DIR
    cp -r dist $BACKUP_DIR/dist-$(date +%Y%m%d-%H%M%S)
    print_success "Backup created successfully"
else
    print_warning "No existing dist folder found, skipping backup"
fi

# Step 2: Pull latest changes from Git
print_status "Pulling latest changes from Git..."
git fetch origin
git pull origin main
check_status "Git pull completed"

# Step 3: Install/Update dependencies
print_status "Installing/updating dependencies..."
npm install
check_status "Dependencies installed"

# Step 4: Build the React application
print_status "Building React application for production..."
npm run build
check_status "React application built successfully"

# Step 5: Verify build files exist
print_status "Verifying build files..."
if [ ! -f "dist/index.html" ]; then
    print_error "index.html not found in dist folder!"
    exit 1
fi
print_success "Build verification completed"

# Step 6: Set proper permissions
print_status "Setting proper file permissions..."
sudo chown -R www-data:www-data dist/
sudo chmod -R 755 dist/
sudo chmod 644 dist/index.html
check_status "Permissions set correctly"

# Step 7: Test Nginx configuration
print_status "Testing Nginx configuration..."
sudo nginx -t
check_status "Nginx configuration is valid"

# Step 8: Restart Nginx
print_status "Restarting Nginx..."
sudo systemctl reload nginx
check_status "Nginx reloaded successfully"

# Step 9: Verify deployment
print_status "Verifying deployment..."
sleep 2

# Test HTTPS response
HTTPS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://$NGINX_SITE)
if [ "$HTTPS_STATUS" = "200" ]; then
    print_success "HTTPS site is accessible"
else
    print_error "HTTPS test failed with status: $HTTPS_STATUS"
fi

# Step 10: Cleanup old backups (keep last 5)
print_status "Cleaning up old backups..."
if [ -d "$BACKUP_DIR" ]; then
    cd $BACKUP_DIR
    ls -t dist-* 2>/dev/null | tail -n +6 | xargs -r rm -rf
    cd ..
    print_success "Old backups cleaned up"
fi

# Step 11: Show deployment summary
echo "=========================================="
echo "🎉 Deployment Summary"
echo "=========================================="
print_success "Deployment completed successfully!"
print_status "Site URL: https://$NGINX_SITE"
print_status "Project Directory: $(pwd)"
print_status "Backup Directory: $BACKUP_DIR"

# Show recent commits
echo ""
print_status "Recent commits:"
git log --oneline -5

echo "=========================================="
echo "🚀 Your ARC frontend is now live at https://$NGINX_SITE"
echo "=========================================="
