# Portfolio Frontend (Vite + React)

This is the frontend for the portfolio website.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your env file:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your values.

## Required Environment Variables

- `VITE_API_URL`: Backend API base URL (for example `http://localhost:5005/api`).
- `VITE_CLERK_PUBLISHABLE_KEY`: Clerk publishable key for admin authentication.

Optional:

- `VITE_CLERK_JWT_TEMPLATE`: Custom Clerk JWT template name (only if your backend expects one).

If `VITE_CLERK_PUBLISHABLE_KEY` is not set, public pages still work but admin sign-in/sign-up is disabled.

## Scripts

- `npm run dev`: Start local development server.
- `npm run build`: Build for production.
- `npm run preview`: Preview production build locally.
- `npm run lint`: Run lint checks.
