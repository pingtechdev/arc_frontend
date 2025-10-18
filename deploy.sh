#!/bin/bash

# ARC Frontend Deployment Script
# This script pulls the latest changes, installs dependencies, builds the project, and restarts nginx

set -e  # Exit on any error

# Configuration
PROJECT_DIR="/home/ubuntu/projects/arc-deploy/arc_frontend"
REPO_URL="https://github.com/pingtechdev/arc_frontend.git"
NGINX_SERVICE="nginx"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if required commands exist
check_requirements() {
    print_status "Checking requirements..."
    
    if ! command_exists git; then
        print_error "Git is not installed. Please install git first."
        exit 1
    fi
    
    if ! command_exists npm; then
        print_error "npm is not installed. Please install Node.js and npm first."
        exit 1
    fi
    
    if ! command_exists nginx; then
        print_error "nginx is not installed. Please install nginx first."
        exit 1
    fi
    
    print_success "All requirements are met."
}

# Function to backup current build
backup_current_build() {
    if [ -d "$PROJECT_DIR/dist" ]; then
        print_status "Backing up current build..."
        cp -r "$PROJECT_DIR/dist" "$PROJECT_DIR/dist.backup.$(date +%Y%m%d_%H%M%S)"
        print_success "Current build backed up."
    fi
}

# Function to pull latest changes
pull_latest_changes() {
    print_status "Pulling latest changes from repository..."
    
    cd "$PROJECT_DIR"
    
    # Check if we're in a git repository
    if [ ! -d ".git" ]; then
        print_error "Not a git repository. Please clone the repository first."
        exit 1
    fi
    
    # Fetch latest changes
    git fetch origin
    
    # Check if there are any changes
    if [ "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)" ]; then
        print_warning "No new changes to deploy."
        return 0
    fi
    
    # Pull latest changes
    git pull origin main
    
    print_success "Latest changes pulled successfully."
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    cd "$PROJECT_DIR"
    
    # Clean npm cache
    npm cache clean --force
    
    # Install dependencies
    npm install
    
    print_success "Dependencies installed successfully."
}

# Function to build the project
build_project() {
    print_status "Building the project..."
    
    cd "$PROJECT_DIR"
    
    # Remove old build
    if [ -d "dist" ]; then
        rm -rf dist
    fi
    
    # Build the project
    npm run build
    
    # Check if build was successful
    if [ ! -d "dist" ]; then
        print_error "Build failed. No dist directory created."
        exit 1
    fi
    
    print_success "Project built successfully."
}

# Function to restart nginx
restart_nginx() {
    print_status "Restarting nginx..."
    
    # Test nginx configuration
    if ! nginx -t; then
        print_error "Nginx configuration test failed. Please check your nginx configuration."
        exit 1
    fi
    
    # Restart nginx
    sudo systemctl restart nginx
    
    # Check if nginx is running
    if ! systemctl is-active --quiet nginx; then
        print_error "Failed to restart nginx. Please check the logs."
        exit 1
    fi
    
    print_success "Nginx restarted successfully."
}

# Function to verify deployment
verify_deployment() {
    print_status "Verifying deployment..."
    
    # Check if dist directory exists and has content
    if [ ! -d "$PROJECT_DIR/dist" ] || [ -z "$(ls -A $PROJECT_DIR/dist)" ]; then
        print_error "Deployment verification failed. Dist directory is empty or doesn't exist."
        exit 1
    fi
    
    # Check if nginx is serving the files
    if ! systemctl is-active --quiet nginx; then
        print_error "Nginx is not running."
        exit 1
    fi
    
    print_success "Deployment verified successfully."
}

# Function to cleanup old backups
cleanup_backups() {
    print_status "Cleaning up old backups..."
    
    # Keep only the last 5 backups
    find "$PROJECT_DIR" -name "dist.backup.*" -type d | sort -r | tail -n +6 | xargs rm -rf
    
    print_success "Old backups cleaned up."
}

# Main deployment function
main() {
    echo "=========================================="
    echo "🚀 ARC Frontend Deployment Script"
    echo "=========================================="
    echo "Project Directory: $PROJECT_DIR"
    echo "Repository: $REPO_URL"
    echo "Started at: $(date)"
    echo "=========================================="
    
    # Check if project directory exists
    if [ ! -d "$PROJECT_DIR" ]; then
        print_error "Project directory does not exist: $PROJECT_DIR"
        print_status "Please clone the repository first:"
        print_status "git clone $REPO_URL $PROJECT_DIR"
        exit 1
    fi
    
    # Run deployment steps
    check_requirements
    backup_current_build
    pull_latest_changes
    install_dependencies
    build_project
    restart_nginx
    verify_deployment
    cleanup_backups
    
    echo "=========================================="
    print_success "🎉 Deployment completed successfully!"
    echo "Deployment finished at: $(date)"
    echo "=========================================="
}

# Run main function
main "$@"
