# 🧾 Order Management System

This monorepo contains the full-stack **Order Management System**, composed of:

- **Backend**: A REST API built with NestJS (`order-management-api`)
- **Frontend**: A modern Angular app (`order-management-ui`)

Both parts are containerized with Docker and designed for scalable development and deployment.

---

## 📁 Project Structure

order-management/
├── order-management-api/ # NestJS backend
└── order-management-ui/ # Angular frontend


---

## 🧱 Backend: NestJS API (`order-management-api`)

A robust REST API built with [NestJS](https://nestjs.com/), using PostgreSQL and TypeORM. Includes production-ready configurations, validation, and Docker support.

### 🚀 Features

- Modular, scalable NestJS architecture  
- PostgreSQL with TypeORM & migrations  
- DTO validation with `class-validator`  
- RESTful API with dynamic filtering  
- CORS support  
- Dockerized for local development  
- Centralized `.env` configuration  
- Optional Swagger documentation

### 📦 Tech Stack

- **Framework**: NestJS  
- **Database**: PostgreSQL  
- **ORM**: TypeORM  
- **Validation**: class-validator  
- **Runtime**: Node.js  
- **Container**: Docker / Docker Compose

### 🛠️ Local Setup

```bash
cd order-management-api
npm install

### Create a .env file:
PORT=3000
API_PREFIX=api

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=nestdb

FRONTEND_URL=http://localhost:4200

🐳 Docker Setup
### To run with Docker and PostgreSQL:
docker-compose up --build

# 🧾 Order Management System

This monorepo contains the full-stack Order Management System, composed of:

- Backend: A REST API built with NestJS (order-management-api)
- Frontend: A modern Angular app (order-management-ui)

Both parts are containerized with Docker and designed for scalable development and deployment.

## 📁 Project Structure

order-management/
├── order-management-api/    # NestJS backend
└── order-management-ui/     # Angular frontend

## 🧱 Backend: NestJS API (order-management-api)

A robust REST API built with NestJS, using PostgreSQL and TypeORM. Includes production-ready configurations, validation, and Docker support.

### 🚀 Features

- Modular, scalable NestJS architecture
- PostgreSQL with TypeORM & migrations
- DTO validation with class-validator
- RESTful API with dynamic filtering
- CORS support
- Dockerized for local development
- Centralized .env configuration
- Optional Swagger documentation

### 📦 Tech Stack

- Framework: NestJS
- Database: PostgreSQL
- ORM: TypeORM
- Validation: class-validator
- Runtime: Node.js
- Container: Docker / Docker Compose

### 🛠️ Local Setup

cd order-management-api
npm install

Create a .env file:

PORT=3000
API_PREFIX=api
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=nestdb
FRONTEND_URL=http://localhost:4200

Start the server:

npm run start:dev

### 🐳 Docker Setup

docker-compose up --build

This exposes:
- PostgreSQL on port 5432
- NestJS API on http://localhost:3000

### 🧪 Testing

npm run test

### 📄 Useful Scripts

start:dev          - Run in watch mode (development)
start:prod         - Run optimized production build
migration:run      - Run all pending DB migrations
migration:generate - Generate a new migration file
test               - Run unit tests with Jest

### 🧭 Folder Structure

src/
├── main.ts              # Entry point
├── app.module.ts        # Root module
├── config/              # Env & DB config
├── modules/             # Domain modules (e.g. orders)
├── common/              # Filters, interceptors, pipes
├── database/            # TypeORM migrations
└── dto/                 # Shared data transfer objects

### 🛡️ Production & Security Tips

- Set synchronize: false in TypeORM config
- Use HTTPS in production
- Apply rate limiting and CSRF protection
- Use helmet for secure HTTP headers
- Store secrets using .env or a secrets manager

### 📫 API Usage

Base URL: http://localhost:3000/api

Example endpoint:

GET /api/orders?country=Estonia&paymentDescription=invoice

## 🎨 Frontend: Angular UI (order-management-ui)

A responsive Angular frontend interfacing with the NestJS backend.

### 🧰 Development Server
cd order-management-ui
npm install
ng serve

Navigate to: http://localhost:4200

### ⚙️ Code Scaffolding

ng generate component component-name
ng generate --help

### 🏗️ Building the Project

ng build

Build artifacts will be stored in the dist/ directory.

### ✅ Running Unit Tests

ng test

Executes unit tests via Karma.

### 🧪 Running End-to-End Tests

ng e2e

Note: Angular CLI does not include an E2E framework by default. Choose one that fits your needs.

### 📚 Additional Resources

- Angular CLI Documentation: https://angular.dev/tools/cli

## 👥 Contributors

- Your Name (https://github.com/martovandre)

## 📃 License

MIT — Free to use and modify.
