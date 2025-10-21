#!/bin/bash

# ARC Frontend Deployment Configuration
# This file contains all configurable paths and settings for the frontend

# Base paths
export HOME_DIR="/home"
export PROJECTS_DIR="$HOME_DIR"
export FRONTEND_DIR="$PROJECTS_DIR/arc_frontend"

# User configuration
export DEPLOY_USER="ubuntu"
export DEPLOY_GROUP="ubuntu"

# Domain configuration
export FRONTEND_DOMAIN="arc.pingtech.dev"
export BACKEND_DOMAIN="api.arc.pingtech.dev"

# Nginx configuration
export NGINX_SITES_AVAILABLE="/etc/nginx/sites-available"
export NGINX_SITES_ENABLED="/etc/nginx/sites-enabled"
export NGINX_LOG_DIR="/var/log/nginx"

# SSL configuration
export SSL_CERT_DIR="/etc/letsencrypt/live"
export SSL_CERT_FRONTEND="$SSL_CERT_DIR/$FRONTEND_DOMAIN/fullchain.pem"
export SSL_KEY_FRONTEND="$SSL_CERT_DIR/$FRONTEND_DOMAIN/privkey.pem"

# Frontend directories
export FRONTEND_DIST_DIR="$FRONTEND_DIR/dist"

# Colors for output
export RED='\033[0;31m'
export GREEN='\033[0;32m'
export YELLOW='\033[1;33m'
export BLUE='\033[0;34m'
export PURPLE='\033[0;35m'
export NC='\033[0m' # No Color

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

print_header() {
    echo -e "${PURPLE}[HEADER]${NC} $1"
}

# Function to check if directory exists and create if needed
ensure_directory() {
    local dir="$1"
    local owner="$2"
    local group="$3"
    local permissions="$4"
    
    if [ ! -d "$dir" ]; then
        print_status "Creating directory: $dir"
        sudo mkdir -p "$dir"
    fi
    
    if [ -n "$owner" ] && [ -n "$group" ]; then
        sudo chown "$owner:$group" "$dir"
    fi
    
    if [ -n "$permissions" ]; then
        sudo chmod "$permissions" "$dir"
    fi
}

# Function to check if file exists
check_file_exists() {
    local file="$1"
    if [ -f "$file" ]; then
        return 0
    else
        return 1
    fi
}

# Function to check if directory exists
check_dir_exists() {
    local dir="$1"
    if [ -d "$dir" ]; then
        return 0
    else
        return 1
    fi
}

# Function to get absolute path
get_absolute_path() {
    local path="$1"
    if [ -d "$path" ]; then
        cd "$path" && pwd
    else
        echo "$path"
    fi
}

# Function to validate configuration
validate_config() {
    print_status "Validating configuration..."
    
    # Check if user exists
    if ! id "$DEPLOY_USER" &>/dev/null; then
        print_error "User '$DEPLOY_USER' does not exist."
        return 1
    fi
    
    # Check if group exists
    if ! getent group "$DEPLOY_GROUP" &>/dev/null; then
        print_error "Group '$DEPLOY_GROUP' does not exist."
        return 1
    fi
    
    # Check if frontend directory exists
    if [ ! -d "$FRONTEND_DIR" ]; then
        print_warning "Frontend directory does not exist: $FRONTEND_DIR"
        print_status "Please ensure you're running this from the correct location."
        return 1
    fi
    
    print_success "Configuration validation passed."
    return 0
}

# Function to show configuration
show_config() {
    print_header "Frontend Deployment Configuration"
    echo "=========================================="
    echo "Base Paths:"
    echo "  Home Directory: $HOME_DIR"
    echo "  Projects Directory: $PROJECTS_DIR"
    echo "  Frontend Directory: $FRONTEND_DIR"
    echo ""
    echo "Domain:"
    echo "  Frontend: $FRONTEND_DOMAIN"
    echo "  Backend: $BACKEND_DOMAIN"
    echo ""
    echo "User Configuration:"
    echo "  User: $DEPLOY_USER"
    echo "  Group: $DEPLOY_GROUP"
    echo "=========================================="
}
