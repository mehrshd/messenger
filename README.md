# 💬 Messenger

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-black?style=for-the-badge&logo=express)

![MariaDB](https://img.shields.io/badge/MariaDB-blue?style=for-the-badge&logo=mariadb)

![JWT](https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge)

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A structured REST API backend for a Messenger application**

[Features](#-features) •
[Tech Stack](#-tech-stack) •
[Architecture](#-architecture) •
[Installation](#-installation) •
[API Endpoints](#-api-endpoints) •
[Database](#-database)

</div>

---

> **A modern full-stack messaging application built with React, Express.js, and MariaDB.**

A full-stack messaging platform designed around real-world backend architecture, secure authentication, private conversations, account management, and a responsive modern interface.

**The goal isn't just to make messages move.  
The goal is to build the system behind the messages.**

---

## ✨ Features

### 🔐 Authentication & Account

- 🔑 User registration and login
- 🎟️ JWT-based authentication
- 🔒 Password hashing with bcrypt
- 🛡️ Protected API routes
- 🔄 Password update
- 📧 Email verification
- 👤 Account & profile management
- 🚫 Username and email uniqueness validation

### 💬 Messaging

- 👥 Private conversations
- 📨 Direct messaging
- 🗂️ Conversation management
- 💭 Message history
- ↩️ Reply-to-message support
- 🗑️ Message deletion
- 🔐 Conversation ownership checks

### 👤 Profiles

- 🪪 Full name
- @️⃣ Username
- 📧 Email
- 📱 Phone
- 📝 Bio
- 🖼️ Avatar upload
- ✏️ Controlled profile updates

### 🎨 Frontend

- 📱 Mobile layout
- 📟 Tablet layout
- 🖥️ Desktop layout
- 🌙 Modern dark interface
- ✨ Smooth animations
- ⚡ React Query
- 🔌 Centralized API services
- 🔄 Axios interceptors
- 👥 Account switching
- 🔔 Toast & error feedback

---

## 🛠️ Tech Stack

### ⚛️ Frontend

| Technology | Purpose |
|---|---|
| ⚛️ React | UI |
| 🧭 React Router | Routing |
| 🎨 Tailwind CSS | Styling |
| ✨ Framer Motion | Animations |
| ⚡ React Query | Server state |
| 🔌 Axios | HTTP client |
| 🎯 Lucide React | Icons |

### 🟢 Backend

| Technology | Purpose |
|---|---|
| 🟢 Node.js | Runtime |
| 🚂 Express.js | REST API |
| 🗄️ MariaDB | Database |
| 🔌 mysql2 | Database driver |
| 🔐 JWT | Authentication |
| 🔒 bcrypt | Password hashing |
| 📧 Nodemailer | Email delivery |
| 📤 Multer | File uploads |
| ⚙️ dotenv | Environment configuration |
| 🌐 CORS | Cross-origin requests |

---

## 🏗️ Architecture

The backend follows a layered architecture that keeps responsibilities separated as the application grows.

```text
                         ┌──────────────┐
                         │    Client    │
                         └──────┬───────┘
                                │
                                ▼
                         ┌──────────────┐
                         │    Routes    │
                         └──────┬───────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Controllers   │
                       └────────┬────────┘
                                │
                                ▼
                         ┌──────────────┐
                         │   Services   │
                         └──────┬───────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │  Repositories   │
                       └────────┬────────┘
                                │
                                ▼
                         ┌──────────────┐
                         │    MariaDB   │
                         └──────────────┘
```

### 🎯 Controllers

Handle HTTP responsibilities:

- Request data
- Response formatting
- Status codes
- Calling services

### 🧠 Services

Contain application and business logic.

### 🗄️ Repositories

Handle database operations and SQL queries.

This keeps database logic away from controllers and business logic.

### 🛡️ Middleware

Responsible for cross-cutting concerns such as:

- Authentication
- Authorization
- Validation
- Security
- Error handling

---

## 🔐 Authentication

Authentication is handled through **JWT access tokens**.

```text
👤 Register
     │
     ▼
🔒 Password Hashing
     │
     ▼
🗄️ Database
     │
     ▼
🔑 Login
     │
     ▼
🔍 Password Verification
     │
     ▼
🎟️ JWT
     │
     ▼
🛡️ Protected Routes
```

Protected requests use:

```http
Authorization: Bearer <token>
```

The authenticated user's identity is attached to the request and used by protected services.

---

## 💬 Messaging Architecture

Conversations connect users, while messages belong to a conversation.

```text
👤 User A
    │
    ▼
💬 Conversation
    │
    ├── 📨 Message
    ├── 📨 Message
    ├── ↩️ Reply
    └── 📨 Message
    │
    ▼
👤 User B
```

Protected conversation operations verify ownership before allowing access.

---

## ↩️ Message Replies

Messages can reference another message when creating a reply.

```text
💬 Message #42
       │
       ▼
   ↩️ Reply
       │
       └── replyToMessageId: 42
```

This provides the backend foundation for a referenced-message experience.

---

## 🛡️ Account Security

The project includes a verification system based around short-lived verification codes.

```text
📨 Request Verification
          │
          ▼
       🔢 Generate Code
          │
          ▼
       🔒 Hash Code
          │
          ▼
       🗄️ Store Record
          │
          ▼
       📧 Send Email
          │
          ▼
       👤 User Enters Code
          │
          ▼
       🔍 Compare Hash
          │
          ▼
      ✅ Verify / ❌ Reject
```

Verification records support:

- 👤 User
- 🎯 Target
- 🔒 Code hash
- 🎯 Purpose
- 📡 Channel
- ⏳ Expiration
- 🔢 Attempts
- 🕐 Creation time

Verification codes are never stored as plaintext.

---

## 👤 Profile System

Profile updates use an explicit allowlist instead of accepting arbitrary database fields.

Supported profile fields include:

```text
👤 fullname
@️⃣ username
🖼️ avatar
📝 bio
```

This prevents arbitrary fields from being passed into update queries.

---

## 🗄️ Database

The application uses **MariaDB** with parameterized SQL queries.

```text
              👤 Users
              /      \
             /        \
            ▼          ▼
     💬 Conversations  🔐 Verification
            │
            ▼
        📨 Messages
```

Parameterized queries are used for database operations to avoid directly interpolating user input into SQL statements.

---

## ⚛️ Frontend Architecture

```text
                ⚛️ React UI
                     │
                     ▼
             🧩 Components
                     │
                     ▼
              ⚡ React Query
                     │
                     ▼
              🔌 API Services
                     │
                     ▼
                  Axios
                     │
                     ▼
              🚂 Express API
```

Server state is separated from UI state, allowing conversations and messages to be managed independently from presentation components.

---

## 📱 Responsive Experience

Messenger is designed around three primary layouts:

```text
📱 Mobile
   ↓
📟 Tablet
   ↓
🖥️ Desktop
```

The interface focuses on:

- 🌙 Dark visual language
- 🪟 Glass-inspired surfaces
- ✨ Smooth transitions
- 💬 Clear message hierarchy
- 📐 Responsive layouts
- 🎯 Minimal visual noise

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone git@github.com:mehrshd/messenger.git
cd messenger
```

### 2️⃣ Install backend dependencies

```bash
cd backend
npm install
```

### 3️⃣ Configure environment variables

Create `.env` inside the backend:

```env
PORT=3000

DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=messenger

JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:5173

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```

### 4️⃣ Start the backend

```bash
npm run dev
```

### 5️⃣ Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 6️⃣ Start the frontend

```bash
npm run dev
```

---

## 🛡️ Security Principles

Messenger is built around several security principles:

- 🔒 Passwords are hashed before storage
- 🎟️ JWT authentication protects private endpoints
- 🛡️ Protected resources verify ownership
- 🗄️ SQL queries use parameters
- 🔐 Verification codes are hashed
- ⏳ Verification codes expire
- 🔢 Verification attempts are limited
- 🚧 Profile updates use an explicit allowlist
- 🚫 Sensitive database fields should never be exposed through public responses

> **Security is treated as part of the architecture — not as an afterthought.**

---

## 🗺️ Roadmap

- [ ] 🔐 Complete 2FA login flow
- [ ] 🛡️ Advanced rate limiting
- [ ] 🚨 Centralized global error handling
- [ ] ⚡ WebSocket-based real-time messaging
- [ ] ✏️ Message editing
- [ ] 👁️ Read receipts
- [ ] 🟢 Online / offline presence
- [ ] ⌨️ Typing indicators
- [ ] 🖼️ Improved media handling
- [ ] ☁️ Production deployment
- [ ] 🧪 Automated testing
- [ ] 📚 API documentation

---

## 🧠 Philosophy

Messenger is more than a UI project.

It is an ongoing experiment in designing a real application from the database layer to the interface.

The goal is not simply to make the application **work**.

The goal is to understand **why it works**, where it can break, and how it can evolve.

```text
🗄️ Database
      ↓
📦 Repositories
      ↓
🧠 Services
      ↓
🎯 Controllers
      ↓
🌐 API
      ↓
⚛️ React
      ↓
👤 User
```

> **Build it. Understand it. Break it. Fix it. Make it better.**

---

## 📌 Status

🟢 **Active Development**

Messenger is continuously evolving as new backend architecture, security practices, and communication features are introduced.

---

## 📄 License

This project is currently intended as a personal development and portfolio project.
