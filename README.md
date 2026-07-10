# Portfolio

Full-stack portfolio with a React admin dashboard and Supabase backend.

## Project Structure

```
portfolio/
├── frontend/     # React + Vite portfolio & admin dashboard
└── backend/      # Supabase database schema
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Or from the project root:

```bash
npm run install:frontend
npm run dev
```

## Backend

Database schema lives in `backend/supabase/schema.sql`. Run it in your Supabase SQL editor to set up tables.

## Environment Variables

Create `frontend/.env`:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
