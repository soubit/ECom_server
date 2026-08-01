# 🛒 Medical E-Commerce API Server

A production-ready RESTful backend for a **Medical E-Commerce Platform** built with **Node.js**, **Express.js**, **Prisma ORM**, **MariaDB**, and **Redis**.

The server provides secure OTP-based authentication, session management, product APIs, shopping cart functionality, Redis caching, and guest-to-user cart synchronization using a clean MVC architecture.

---

## 🚀 Features

- 📦 RESTful Product APIs
- 🔐 OTP-Based Authentication
- 🍪 Redis Session Management
- 🛍️ Shopping Cart APIs
- 👤 Guest Cart Support
- 🔄 Automatic Guest Cart Merge After Login
- ⚡ Redis Product Caching
- 🗄️ Prisma ORM + MariaDB
- 📄 Pagination Support
- 🧩 Modular MVC Architecture
- ✅ Request Validation Middleware
- 🚨 Centralized Error Handling
- 📝 Custom Logging Utility
- ⚙️ Environment-based Configuration

---

# 🏗️ Tech Stack

| Category | Technology |
|-----------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MariaDB / MySQL |
| ORM | Prisma ORM |
| Cache | Redis |
| Session Store | Redis Store |
| Language | JavaScript (ES Modules) |
| Authentication | OTP + Session Authentication |
| Package Manager | npm |

---

# 📁 Project Structure

```
.
├── controller/
├── router/
├── middleware/
├── prisma/
├── redis/
│   └── lua/
├── lib/
├── util/
├── db/
├── app.js
├── package.json
└── README.md
```

---

# 🔑 Authentication Flow

```
Phone Number
      │
      ▼
Generate OTP
      │
      ▼
Store OTP in Redis
      │
      ▼
Verify OTP
      │
      ▼
Create Session
      │
      ▼
Merge Guest Cart
      │
      ▼
Authenticated User
```

---

# 🛍️ Product Module

### Features

- Product Listing
- Product Details
- Pagination
- Redis Caching
- Optimized Database Queries

---

# 🛒 Shopping Cart

Supports both:

- Guest Users
- Authenticated Users

Features

- Add Product
- Update Quantity
- Remove Product
- View Cart
- Automatic Cart Merge After Login

---

# ⚡ Redis Integration

Redis is used for

- Session Storage
- OTP Storage
- Product Cache
- Atomic Operations using Lua Scripts

---

# 🗄️ Database

The application uses **Prisma ORM** with **MariaDB**.

Major entities include:

- User
- Product
- Product Images
- Cart

---

# 🧠 Architecture

```
            Client
               │
               ▼
        Express Router
               │
               ▼
          Controllers
               │
        ┌──────┴──────┐
        ▼             ▼
    Prisma ORM      Redis
        │             │
        ▼             ▼
    MariaDB      Cache/Session
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/project-name.git

cd project-name
```

## Install Dependencies

```bash
npm install
```

## Configure Environment

Create a `.env` file.

Example:

```env
PORT=3000

DATABASE_URL="mysql://username:password@localhost:3306/database"

REDIS_HOST=localhost
REDIS_PORT=6379

SESSION_SECRET=your_secret_key
```

---

## Generate Prisma Client

```bash
npx prisma generate
```

---

## Run Database Migration

```bash
npx prisma migrate deploy
```

or

```bash
npx prisma db push
```

---

## Start Development Server

```bash
npm run dev
```

---

## Production

```bash
npm start
```

---

# 📌 REST API Modules

| Module | Status |
|---------|--------|
| Authentication | ✅ |
| Product | ✅ |
| Cart | ✅ |
| Session | ✅ |
| Redis Cache | ✅ |
| Pagination | ✅ |
| Logging | ✅ |

---

# 🔒 Security

- OTP Authentication
- Redis-backed Sessions
- Cookie-based Authentication
- Request Validation
- Error Handling Middleware

---

# 🚀 Future Improvements

- Payment Gateway Integration
- Wishlist
- Order Management
- Admin Dashboard
- Product Search
- Notification Service
- Rate Limiting
- API Documentation (Swagger)

---

# 👨‍💻 Author

**Souvik Sasmal**

GitHub: https://github.com/soubit

LinkedIn: https://www.linkedin.com/in/souvik-sasmal-b060111b6/

---

