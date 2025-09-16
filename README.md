## NestShop – Full‑Stack Shopping Cart (React + Redux Toolkit + NestJS + PostgreSQL)

### Overview
NestShop is a full‑stack shopping cart application:
- Frontend: React, Redux Toolkit (RTK Query), TypeScript, Vite, Material UI
- Backend: NestJS, TypeScript, Prisma ORM
- Database: PostgreSQL

You can run it either entirely with Docker Compose or run frontend and backend locally while only PostgreSQL runs in Docker.

---

## Prerequisites
- Node.js 22.12+ (or 20.19+)
- npm 10+
- Docker Desktop (for DB and/or full Docker run)

---

## Quick Start – Option A: Run Everything with Docker Compose
This builds the frontend for production and serves it with Nginx, starts the NestJS backend, and PostgreSQL.

### 1) Start
```bash
docker compose up --build
```

### 2) Access
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Postgres: localhost:5432

### 3) Seed the database (inside backend container)
If you need to seed manually:
```bash
docker compose exec backend sh -lc "npx prisma generate && npx prisma db push && npx ts-node prisma/seed.ts"
```

---

## Quick Start – Option B: Local Dev (Frontend + Backend) with DB in Docker
Run only Postgres in Docker, and use local terminals for the app servers.

### 1) Start PostgreSQL
```bash
docker compose up -d postgres
```

### 2) Backend (NestJS)
Create/update `backend/.env` for local DB:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/shopdb
PORT=3000
NODE_ENV=development
```

Install and run migrations/seed, then start the API:
```bash
cd backend
npm i
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts   # optional – seeds 20 products (cloud images)
npm run start:dev
```

API should be available at `http://localhost:3000`.

### 3) Frontend (Vite)
Create/update `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:3000
```

Install and start Vite:
```bash
cd frontend
npm i
npm run dev
```

Frontend should be available at the Vite dev server URL printed in the terminal (typically `http://localhost:5173`).

---

## Switching Between Modes
- For local dev: you may comment out `backend` and `frontend` services in `docker-compose.yml` and only run `postgres`.
- For full Docker runs: uncomment `backend` and `frontend` services and run `docker compose up --build`.

---

## Project Structure
```
nestshop/
  backend/
    prisma/
      schema.prisma
      seed.ts
    src/
      modules/
        product/
        cart/
  frontend/
    src/
      components/
      pages/
      features/
```

---

## API Summary
Base URL: `http://localhost:3000`

- GET `/products` → List products
  - Response: `[{ id, name, price, image }]`

- GET `/cart` → Cart summary
  - Response: `{ items: [{ id, productId, quantity, product }], totalItems, totalPrice }`

- POST `/cart` → Insert or set absolute quantity for a product
  - Body: `{ productId: string, quantity: number }` (sets to given quantity; 1 to add, n± to update)

- DELETE `/cart/:id` → Remove a cart item by id

Error handling: Invalid ids return appropriate HTTP status codes (e.g., 404 on missing cart item).

---

## Database & Seeding
- ORM: Prisma
- Schema: `Product` and `CartItem`
- Seed: 20 products using cloud images (picsum.photos) in `backend/prisma/seed.ts`.

Manual seed commands (local dev):
```bash
cd backend
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts
```

---

## Frontend Details
- Tech: React + Redux Toolkit + RTK Query + TypeScript + Vite + MUI
- Environment: `frontend/.env` with `VITE_API_BASE_URL`
- UX:
  - Product grid with search-as-you-type
  - Product cards with add to cart; once added, show +/− quantity controls
  - Cart page with items, totals, and remove
  - Loading skeletons and error states
  - Dark, modern theme
- State: RTK Query (API cache) with Redux Persist configured at store level

---

## Backend Details
- NestJS modules: `product`, `cart`
- DTOs for validation
- Prisma service for DB operations
- Config via `.env`

---

## Common Tasks
### Clean rebuild (Docker)
```bash
docker compose down
docker compose up --build --force-recreate
```

### Reset database (Docker)
```bash
docker compose down -v
docker compose up --build
```

### Logs
```bash
docker compose logs backend
docker compose logs frontend
docker compose logs postgres
```

---

## Notes
- Node version: Vite requires Node 20.19+ or 22.12+. If you see errors like `crypto.hash is not a function`, update Node and reinstall `node_modules`.
- When running backend in Docker Compose, database host is `postgres`. When running backend locally, use `localhost`.


