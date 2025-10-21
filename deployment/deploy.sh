#!/bin/bash

# ARC Frontend Deployment Script
# This script deploys the React/Vite frontend

set -e

# Load configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/config.sh"

# Validate configuration
if ! validate_config; then
    print_error "Configuration validation failed."
    exit 1
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if required commands exist
check_requirements() {
    print_status "Checking requirements..."
    
    if ! command_exists node; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command_exists npm; then
        print_error "npm is not installed. Please install npm first."
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
    if [ -d "$FRONTEND_DIST_DIR" ]; then
        print_status "Backing up current build..."
        cp -r "$FRONTEND_DIST_DIR" "$FRONTEND_DIR/dist.backup.$(date +%Y%m%d_%H%M%S)"
        print_success "Current build backed up."
    fi
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    cd "$FRONTEND_DIR"
    
    # Clean npm cache
    npm cache clean --force
    
    # Install dependencies
    npm install
    
    print_success "Dependencies installed successfully."
}

# Function to build the project
build_project() {
    print_status "Building the project..."
    
    cd "$FRONTEND_DIR"
    
    # Remove old build
    if [ -d "dist" ]; then
        rm -rf dist
    fi
    
    # Set production environment
    export NODE_ENV=production
    
    # Build the project
    npm run build
    
    # Check if build was successful
    if [ ! -d "dist" ]; then
        print_error "Build failed. No dist directory created."
        exit 1
    fi
    
    # Check if build has content
    if [ -z "$(ls -A dist)" ]; then
        print_error "Build failed. Dist directory is empty."
        exit 1
    fi
    
    print_success "Project built successfully."
}

# Function to setup nginx
setup_nginx() {
    print_status "Setting up nginx configuration..."
    
    # Create nginx configuration with variables substituted
    envsubst < nginx/arc_frontend.conf > /tmp/arc_frontend.conf
    
    # Copy nginx configuration
    sudo cp /tmp/arc_frontend.conf "$NGINX_SITES_AVAILABLE/arc_frontend.conf"
    
    # Enable site
    sudo ln -sf "$NGINX_SITES_AVAILABLE/arc_frontend.conf" "$NGINX_SITES_ENABLED/"
    
    # Remove default site if it exists
    sudo rm -f "$NGINX_SITES_ENABLED/default"
    
    # Test nginx configuration
    if sudo nginx -t; then
        print_success "Nginx configuration is valid."
    else
        print_error "Nginx configuration test failed."
        exit 1
    fi
    
    print_success "Nginx configuration complete."
}

# Function to restart nginx
restart_nginx() {
    print_status "Restarting nginx..."
    
    # Test nginx configuration
    if ! sudo nginx -t; then
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
    if [ ! -d "$FRONTEND_DIST_DIR" ] || [ -z "$(ls -A $FRONTEND_DIST_DIR)" ]; then
        print_error "Deployment verification failed. Dist directory is empty or doesn't exist."
        exit 1
    fi
    
    # Check if nginx is serving the files
    if ! systemctl is-active --quiet nginx; then
        print_error "Nginx is not running."
        exit 1
    fi
    
    # Test if nginx is serving the frontend
    if curl -s -o /dev/null -w "%{http_code}" http://localhost/ | grep -q "200\|301\|302"; then
        print_success "Frontend is being served by nginx."
    else
        print_warning "Frontend health check failed. Check nginx logs for details."
    fi
    
    print_success "Deployment verification complete."
}

# Function to cleanup old backups
cleanup_backups() {
    print_status "Cleaning up old backups..."
    
    # Keep only the last 5 backups
    find "$FRONTEND_DIR" -name "dist.backup.*" -type d | sort -r | tail -n +6 | xargs rm -rf
    
    print_success "Old backups cleaned up."
}

# Function to setup SSL certificates
setup_ssl() {
    print_status "Checking SSL certificates..."
    
    # Check if Let's Encrypt certificates exist
    if [ -f "$SSL_CERT_FRONTEND" ] && [ -f "$SSL_KEY_FRONTEND" ]; then
        print_success "SSL certificates found."
        return 0
    fi
    
    print_warning "SSL certificates not found."
    print_warning "Please set up SSL certificates before deployment:"
    print_warning "sudo certbot --nginx -d $FRONTEND_DOMAIN"
    print_warning ""
    print_warning "Or create self-signed certificates for development:"
    print_warning "sudo mkdir -p /etc/ssl/certs /etc/ssl/private"
    print_warning "sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \\"
    print_warning "    -keyout /etc/ssl/private/$FRONTEND_DOMAIN.key \\"
    print_warning "    -out /etc/ssl/certs/$FRONTEND_DOMAIN.crt \\"
    print_warning "    -subj \"/C=US/ST=State/L=City/O=Organization/CN=$FRONTEND_DOMAIN\""
    
    read -p "Do you want to continue without SSL? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Deployment aborted. SSL certificates required."
        exit 1
    fi
}

# Main deployment function
main() {
    echo "=========================================="
    echo "🚀 ARC Frontend Deployment Script"
    echo "=========================================="
    echo "Project Directory: $FRONTEND_DIR"
    echo "Started at: $(date)"
    echo "=========================================="
    
    # Check if project directory exists
    if [ ! -d "$FRONTEND_DIR" ]; then
        print_error "Project directory does not exist: $FRONTEND_DIR"
        print_status "Please ensure you're running this from the correct location."
        exit 1
    fi
    
    # Run deployment steps
    check_requirements
    setup_ssl
    backup_current_build
    install_dependencies
    build_project
    setup_nginx
    restart_nginx
    verify_deployment
    cleanup_backups
    
    echo "=========================================="
    print_success "🎉 Frontend deployment completed successfully!"
    echo "Frontend will be available at: https://$FRONTEND_DOMAIN"
    echo "Deployment finished at: $(date)"
    echo "=========================================="
}

# Run main function
main "$@"