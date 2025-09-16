# Docker Setup Instructions

This project is now configured to run entirely with Docker Compose. Follow these steps to get started:

## Prerequisites

- Docker Desktop installed and running
- Docker Compose v2.0+

## Quick Start

1. **Clone and navigate to the project:**
   ```bash
   cd nestshop
   ```

2. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the applications:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - PostgreSQL: localhost:5432

## What's Fixed

### Frontend Issues Fixed:
- ✅ Changed from dev mode to production build with Nginx
- ✅ Removed volume mounting conflicts
- ✅ Added proper Nginx configuration for SPA routing
- ✅ Optimized Dockerfile with multi-stage build

### Backend Issues Fixed:
- ✅ Added proper CORS configuration for Docker networking
- ✅ Created missing .env file with database configuration
- ✅ Added database connection waiting logic
- ✅ Improved Dockerfile with better caching and health checks

### Docker Compose Issues Fixed:
- ✅ Added proper networking between services
- ✅ Fixed environment variable configuration
- ✅ Added proper service dependencies
- ✅ Removed conflicting volume mounts

## Services

- **postgres**: PostgreSQL 15 database
- **backend**: NestJS API server
- **frontend**: React + Vite application served by Nginx

## Environment Variables

The backend uses these environment variables (configured in `backend/.env`):
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (3000)
- `NODE_ENV`: Environment mode

## Database

The database will be automatically created and migrated when you first run `docker-compose up`. The Prisma client will be generated and the database schema will be pushed automatically.

## Troubleshooting

If you encounter issues:

1. **Clean rebuild:**
   ```bash
   docker-compose down
   docker-compose up --build --force-recreate
   ```

2. **Check logs:**
   ```bash
   docker-compose logs backend
   docker-compose logs frontend
   ```

3. **Reset database:**
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

## Development

For development, you can still run individual services locally:
- Backend: `cd backend && npm run start:dev`
- Frontend: `cd frontend && npm run dev`
- Database: Use the Docker PostgreSQL service or install locally
