# Flowora API

This folder contains the Flowora backend, built with NestJS (TypeScript). It implements the REST API used by the frontend.

Quick start

1. Install dependencies
```bash
   cd flowora-api
   npm install
```
2. Prepare environment

   - Copy or create an `.env` file in `flowora-api/` if you need to provide configuration values.

3. Run in development mode (with hot reload)
```
   npm run start:dev

   Default: http://localhost:3000
```
Docker (optional)

You can run the API using Docker Compose (there is a `docker-compose.yml` in this folder):
```
   docker-compose up --build
```
Scripts

- `npm run start` — start production server
- `npm run start:dev` — start dev server (watch mode)
- `npm run start:prod` — start production build
- `npm run test` — run unit tests (if present)
- `npm run test:e2e` — run end-to-end tests (if present)

Notes

- Port: the Nest app typically listens on port 3000; check `src/main.ts` if you need to change it.
- Environment variables: sensitive values belong in `.env` and should not be committed to git.

If you want, I can add a minimal `.env.example` here and a few example API curl commands for core endpoints.
