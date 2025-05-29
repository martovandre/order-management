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

cd order-management-ui
npm install
```

### Create a .env file for api:

PORT=3000
API_PREFIX=api

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=db

FRONTEND_URL=http://localhost:4200

### 🐳 Running Both Services with Docker (Root Folder Only)
## To run both the NestJS backend and PostgreSQL database using Docker, you must run this command from the root of the repository (where docker-compose.yml is located):

```bash
docker-compose up --build
```

This will:

Launch the PostgreSQL container on port 5432

Start the NestJS API at http://localhost:3000

📌 Note: Do not run this inside order-management-api or order-management-ui — it must be executed from the project root.