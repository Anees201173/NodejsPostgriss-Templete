# Node + PostgreSQL (Sequelize) Template

A minimal, easy-to-understand Express + Sequelize template with a clean layering:
- Controller → Service → Repository
- JWT auth middleware, error handling, and simple logging
- Sequelize migrations and seeders, configured for Neon (serverless Postgres)

## Structure

```
project-root/
├── src/
│   ├── config/
│   │   ├── database.js        # Sequelize DB instance and connection
│   │   ├── env.js             # Environment variables loader
│   │   ├── sequelize-cli.js   # CLI config (migrations/seeders)
│   ├── models/
│   │   ├── index.js           # Sequelize init + model relations
│   │   ├── User.js            # Example model
│   ├── migrations/            # Sequelize migrations
│   ├── seeders/               # Database seeders
│   ├── controllers/
│   │   ├── user.controller.js # Handle request/response logic
│   ├── services/
│   │   ├── user.service.js    # Business logic
│   ├── repositories/
│   │   ├── user.repo.js       # DB queries using Sequelize models
│   ├── routes/
│   │   ├── user.routes.js     # All user API routes
│   │   ├── index.js           # Combine all routes
│   ├── middlewares/
│   │   ├── auth.middleware.js # Auth / JWT middleware
│   │   ├── error.middleware.js# Global error handling
│   ├── utils/
│   │   ├── logger.js          # Logger / Helpers
│   │   ├── response.js        # Helper for API response formatting
│   ├── app.js                 # Express app config (routes, middleware)
│   └── server.js              # Server start file
├── .env                       # Env variables (create by copying .env.example)
├── .env.example               # Sample env vars
├── .sequelizerc               # Paths for sequelize-cli
├── package.json
└── README.md
```

## Quick start

1) Install dependencies

```powershell
# from project root
npm install
```

2) Copy and fill environment variables

```powershell
Copy-Item .env.example .env
# Edit .env and set DATABASE_URL to your Neon connection string
# Example: postgres://user:password@ep-xxx-yyy.aws.neon.tech/dbname?sslmode=require
```

3) Run migrations (optional initially)

```powershell
npx sequelize db:migrate
```

4) Start the server

```powershell
npm run dev
```

Server runs on http://localhost:3000 by default.

## Neon (Postgres) notes

- Use the full connection string from Neon with `sslmode=require`.
- This template enables SSL in Sequelize automatically for Neon.

## API examples

- POST /api/v1/users/register { name, email, password }
- POST /api/v1/users/login { email, password }
- GET /api/v1/users/me (requires Authorization: Bearer <token>)

## Scripts

- `npm run dev` – start with nodemon
- `npm start` – start without nodemon
- `npm run db:migrate` – run migrations
- `npm run db:migrate:undo` – undo last migration
- `npm run db:seed` – run seeders
- `npm run db:seed:undo` – undo last seeder

## License
MIT
