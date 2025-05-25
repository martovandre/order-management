# 🧱 NestJS Backend API

This is a backend REST API built with [NestJS](https://nestjs.com/), using TypeORM, PostgreSQL, and Docker. It serves as the backend for an Angular frontend and includes production-ready configuration, validation, and error handling.

## 🚀 Features

- Modular, scalable architecture using NestJS  
- PostgreSQL with TypeORM & migrations  
- DTO validation with `class-validator`  
- RESTful API with dynamic filtering  
- CORS support for frontend integration  
- Dockerized for local development  
- Central `.env` configuration  
- Swagger API documentation (optional)

## 📦 Tech Stack

- **Framework**: NestJS  
- **Database**: PostgreSQL  
- **ORM**: TypeORM  
- **Validation**: class-validator  
- **Runtime**: Node.js  
- **Container**: Docker / Docker Compose

## 🛠️ Local Setup

Clone the repository:

```bash
git clone https://github.com/your-org/your-project.git
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```env
PORT=3000
API_PREFIX=api

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=nestdb

FRONTEND_URL=http://localhost:4200
```

Start the development server:

```bash
npm run start:dev
```

## 🐳 Docker Setup

To run with Docker and PostgreSQL:

```bash
docker-compose up --build
```

This exposes:
- PostgreSQL on port `5432`
- NestJS API on `http://localhost:3000`

## 🧪 Testing

Run unit tests:

```bash
npm run test
```

## 📄 Scripts

| Command               | Description                     |
|----------------------|---------------------------------|
| `start:dev`          | Run in watch mode (development) |
| `start:prod`         | Run optimized production build  |
| `migration:run`      | Run all pending DB migrations   |
| `migration:generate` | Generate a new migration file   |
| `test`               | Run unit tests with Jest        |

## 🧭 Folder Structure

```
src/
├── main.ts              # Entry point
├── app.module.ts        # Root module
├── config/              # Env & DB config
├── modules/             # Domain modules (e.g. orders)
├── common/              # Filters, interceptors, pipes
├── database/            # TypeORM migrations
└── dto/                 # Shared data transfer objects
```

## 🛡️ Production & Security

- Set `synchronize: false` in TypeORM config  
- Use HTTPS in production  
- Apply rate limiting and CSRF protection  
- Use `helmet` for secure HTTP headers  
- Store secrets using `.env` or a secrets manager

## 📫 API Usage

Base URL: `http://localhost:3000/api`

Example endpoint:

```
GET /api/orders?country=Estonia&paymentDescription=invoice
```

## 👥 Contributors

- [Your Name](https://github.com/martovandre)

## 📃 License

MIT — Free to use and modify.
