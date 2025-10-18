#!/bin/bash

# Complete ARC Project Deployment Script
# This single script handles everything: setup, deployment, and configuration

set -e  # Exit on any error

# Configuration - UPDATE THESE VALUES
DOMAIN="arc.pingtech.dev"  # Replace with your actual domain
REPO_URL="https://github.com/pingtechdev/arc_frontend.git"  # Adhttps://github.com/pingtechdev/arc_frontend.gitd your GitHub repository URL here
PROJECT_DIR="/home/ubuntu/projects/arc-deploy/arc_frontend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

echo "🚀 Starting Complete ARC Deployment..."
echo "====================================="

# Check if running as ubuntu user
if [ "$USER" != "ubuntu" ]; then
    print_error "Please run this script as ubuntu user"
    exit 1
fi

# Step 1: Update system and install dependencies
print_status "Step 1: Installing system dependencies..."
sudo apt update -y
sudo apt upgrade -y

# Install Node.js
if ! command -v node &> /dev/null; then
    print_status "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install other required packages
print_status "Installing required packages..."
sudo apt install -y nginx supervisor certbot python3-certbot-nginx git ufw

# Install serve globally
if ! command -v serve &> /dev/null; then
    print_status "Installing serve..."
    sudo npm install -g serve
fi

# Step 2: Get repository URL if not set
if [ -z "$REPO_URL" ]; then
    print_warning "Repository URL not set. Please provide your GitHub repository URL:"
    read -p "Enter your GitHub repository URL: " REPO_URL
fi

# Step 3: Setup project directory and clone repository
print_status "Step 2: Setting up project directory..."
sudo mkdir -p $PROJECT_DIR
sudo chown -R ubuntu:ubuntu $PROJECT_DIR

# Clone or update repository
if [ -d "$PROJECT_DIR/.git" ]; then
    print_status "Updating existing repository..."
    cd $PROJECT_DIR
    git pull origin main
else
    print_status "Cloning repository from GitHub..."
    cd /home/ubuntu/projects
    git clone $REPO_URL arc-deploy
    cd arc-deploy
fi

# Step 4: Install frontend dependencies and build
print_status "Step 3: Installing frontend dependencies and building..."
cd $PROJECT_DIR/arc_frontend

# Install dependencies
npm install

# Create production environment file
print_status "Creating production environment file..."
cat > .env.production << EOF
NODE_ENV=production
VITE_API_URL=https://$DOMAIN/api
VITE_CMS_URL=https://$DOMAIN/cms
EOF

# Build the frontend
print_status "Building frontend for production..."
npm run build

# Set proper permissions
sudo chown -R ubuntu:ubuntu $PROJECT_DIR/arc_frontend/dist
sudo chmod -R 755 $PROJECT_DIR/arc_frontend/dist

print_success "Frontend built successfully!"

# Step 5: Configure nginx
print_status "Step 4: Configuring nginx..."

# Create nginx configuration
sudo tee /etc/nginx/sites-available/arc > /dev/null << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    # Redirect HTTP to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;

    # SSL Configuration (will be updated by certbot)
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    
    # SSL Security
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Frontend (React App) - Serve static files directly
    location / {
        root $PROJECT_DIR/arc_frontend/dist;
        index index.html;
        try_files \$uri \$uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API (Django Admin)
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # CMS (Wagtail)
    location /cms/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Static files
    location /static/ {
        alias $PROJECT_DIR/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Media files
    location /media/ {
        alias $PROJECT_DIR/media/;
        expires 1y;
        add_header Cache-Control "public";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;
    gzip_disable "MSIE [1-6]\.";
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/arc /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
print_status "Testing nginx configuration..."
sudo nginx -t

print_success "Nginx configuration created successfully!"

# Step 6: Configure supervisor
print_status "Step 5: Configuring supervisor..."

# Create supervisor configuration
sudo tee /etc/supervisor/conf.d/arc_frontend.conf > /dev/null << EOF
[program:arc_frontend]
command=serve -s $PROJECT_DIR/arc_frontend/dist -l 3000
directory=$PROJECT_DIR/arc_frontend
user=ubuntu
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/var/log/supervisor/arc_frontend.log
stderr_logfile=/var/log/supervisor/arc_frontend_error.log
EOF

# Update supervisor
sudo supervisorctl reread
sudo supervisorctl update

print_success "Supervisor configuration created successfully!"

# Step 7: Configure firewall
print_status "Step 6: Configuring firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw --force enable

print_success "Firewall configured successfully!"

# Step 8: Start services
print_status "Step 7: Starting services..."

# Start and enable nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Start supervisor
sudo systemctl start supervisor
sudo systemctl enable supervisor

print_success "Services started successfully!"

# Step 9: Set up SSL certificate
print_status "Step 8: Setting up SSL certificate..."
print_warning "Make sure your domain $DOMAIN points to this server's IP address!"

# Get SSL certificate
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

print_success "SSL certificate installed successfully!"

# Step 10: Set up log rotation
print_status "Step 9: Setting up log rotation..."
sudo tee /etc/logrotate.d/arc-frontend > /dev/null << EOF
/var/log/supervisor/arc_frontend*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 ubuntu ubuntu
}
EOF

print_success "Log rotation configured successfully!"

# Step 11: Final status check
print_status "Step 10: Performing final status check..."

# Check nginx status
if sudo systemctl is-active --quiet nginx; then
    print_success "✅ Nginx is running"
else
    print_error "❌ Nginx is not running"
fi

# Check supervisor status
if sudo systemctl is-active --quiet supervisor; then
    print_success "✅ Supervisor is running"
else
    print_error "❌ Supervisor is not running"
fi

# Check SSL certificate
if sudo certbot certificates | grep -q "$DOMAIN"; then
    print_success "✅ SSL certificate is installed"
else
    print_warning "⚠️ SSL certificate may not be properly installed"
fi

# Display final information
echo ""
echo "=============================================="
print_success "🎉 Complete deployment finished successfully!"
echo "=============================================="
echo ""
echo "📋 Summary:"
echo "• Project directory: $PROJECT_DIR"
echo "• Domain: $DOMAIN"
echo "• Frontend URL: https://$DOMAIN"
echo "• API URL: https://$DOMAIN/api"
echo "• CMS URL: https://$DOMAIN/cms"
echo ""
echo "🔧 Useful commands:"
echo "• Check nginx status: sudo systemctl status nginx"
echo "• Check nginx logs: sudo tail -f /var/log/nginx/error.log"
echo "• Check supervisor logs: sudo tail -f /var/log/supervisor/arc_frontend.log"
echo "• Restart nginx: sudo systemctl restart nginx"
echo "• Restart frontend: sudo supervisorctl restart arc_frontend"
echo ""
echo "🚀 Your frontend should now be accessible at https://$DOMAIN"
echo ""
print_success "Deployment completed! 🎉"
