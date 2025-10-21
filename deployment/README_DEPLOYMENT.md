# ARC Frontend Deployment Guide

This guide explains how to deploy the ARC Frontend (React/Vite) application to your Ubuntu server.

## 📁 Project Structure

```
arc_frontend/
├── src/                    # React source code
├── public/                 # Static assets
├── dist/                   # Built application (created during deployment)
├── nginx/                  # Nginx configuration
│   └── arc_frontend.conf   # Frontend nginx config
├── config.sh               # Deployment configuration
├── deploy.sh               # Deployment script
└── README_DEPLOYMENT.md    # This file
```

## 🚀 Quick Deployment

### 1. Clone and Setup

```bash
# Clone your frontend repository
git clone <your-frontend-repo> /home/arc_frontend
cd /home/arc_frontend

# Make deployment script executable
chmod +x deploy.sh
```

### 2. Configure (Optional)

Edit `config.sh` if you need to change any settings:

```bash
# Edit configuration
nano config.sh

# Key settings you might want to change:
# - FRONTEND_DOMAIN="arc.pingtech.dev"
# - DEPLOY_USER="ubuntu"
# - DEPLOY_GROUP="ubuntu"
```

### 3. Deploy

```bash
# Run deployment
./deploy.sh
```

## 🔧 What the Deployment Does

1. **Checks Requirements**: Node.js, npm, nginx
2. **Backs up current build** (if exists)
3. **Installs dependencies**: `npm install`
4. **Builds the project**: `npm run build`
5. **Configures nginx**: Sets up reverse proxy
6. **Restarts nginx**: Applies configuration
7. **Verifies deployment**: Checks if everything works

## 📊 Configuration Details

### Nginx Configuration
- **Domain**: `arc.pingtech.dev`
- **SSL**: Automatic Let's Encrypt setup
- **SPA Routing**: Handles React Router
- **API Proxy**: Routes `/api/` to backend
- **Admin Proxy**: Routes `/admin/` to backend
- **Media Proxy**: Routes `/media/` to backend

### Build Process
- **Environment**: Production mode
- **Output**: `dist/` directory
- **Optimization**: Minified and compressed

## 🔄 Updates

To update your frontend:

```bash
cd /home/arc_frontend
git pull
./deploy.sh
```

## 🐛 Troubleshooting

### Common Issues

#### Build Fails
```bash
# Check Node.js version
node --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Nginx Issues
```bash
# Test nginx configuration
sudo nginx -t

# Check nginx status
sudo systemctl status nginx

# View nginx logs
sudo tail -f /var/log/nginx/arc_frontend_error.log
```

#### SSL Issues
```bash
# Check SSL certificates
sudo certbot certificates

# Renew certificates
sudo certbot renew
```

## 📝 Logs

```bash
# Nginx logs
sudo tail -f /var/log/nginx/arc_frontend_access.log
sudo tail -f /var/log/nginx/arc_frontend_error.log

# System logs
sudo journalctl -u nginx -f
```

## 🎯 Production Checklist

- [ ] SSL certificates installed
- [ ] Domain DNS configured
- [ ] Nginx configuration valid
- [ ] Build process successful
- [ ] Static files served correctly
- [ ] API proxy working
- [ ] Admin panel accessible
- [ ] Health check responding

## 📞 Support

For issues:
1. Check the logs first
2. Verify nginx configuration
3. Test build process manually
4. Check SSL certificate status

---

**Happy Deploying! 🚀**
