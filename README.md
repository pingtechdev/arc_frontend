# ARC Frontend

A modern React/Vite frontend application for the ARC project.

## 📁 Project Structure

```
arc_frontend/
├── src/                    # React source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility libraries
│   └── assets/            # Static assets
├── public/                # Public static files
├── deployment/            # Deployment configuration
│   ├── nginx/             # Nginx configuration
│   ├── config.sh          # Deployment settings
│   ├── deploy.sh          # Deployment script
│   └── README_DEPLOYMENT.md
├── deploy.sh              # Deployment wrapper (calls deployment/deploy.sh)
├── package.json           # Node.js dependencies
└── README.md              # This file
```

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Production Deployment
```bash
chmod +x deploy.sh
./deploy.sh
```

## 📖 Documentation

- **Development**: See package.json scripts
- **Deployment**: See `deployment/README_DEPLOYMENT.md`

## 🛠️ Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components