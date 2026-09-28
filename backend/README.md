# 💬 Messenger API V1.2

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

## 🚀 Features

### 🔐 Authentication

- ✅ User registration
- ✅ User login
- ✅ JWT authentication
- ✅ Protected routes
- ✅ Token expiration handling
- ✅ Password hashing with bcrypt
- ✅ Authentication middleware

### 👤 Profile Management

- ✅ Get user profile
- ✅ Update profile
- ✅ Partial profile updates with PATCH
- ✅ Username support
- ✅ Bio support
- ✅ Avatar upload
- ✅ Image validation
- ✅ File size limitation

### 🔑 Account Management

- ✅ Update password
- ✅ Current password verification
- ✅ New password validation
- ✅ Email change flow
- ✅ Email verification
- ✅ Verification code expiration
- ✅ Verification attempt limitation

### ✉️ Verification System

- ✅ Six-digit verification codes
- ✅ Cryptographically secure code generation
- ✅ Verification code hashing
- ✅ Code expiration
- ✅ Attempt limitation
- ✅ Verification cleanup after successful verification
- ✅ Email delivery with Nodemailer
- ✅ Reusable verification service architecture

### 💬 Conversations

- ✅ Create conversations automatically
- ✅ Prevent duplicate conversations
- ✅ Get user's conversations
- ✅ Get conversation participant information
- ✅ Get latest message
- ✅ Delete conversations

### 📨 Messaging

- ✅ Send messages
- ✅ Retrieve conversation messages
- ✅ Sender information
- ✅ Message timestamps
- ✅ Reply to messages
- ✅ Conversation-based message architecture

### 🖼️ File Upload

- ✅ Avatar upload with Multer
- ✅ Image MIME type validation
- ✅ 5 MB file size limit
- ✅ Server-side file storage
- ✅ Static file serving with Express

### 🧱 Architecture

- ✅ Route / Middleware / Controller / Service / Repository architecture
- ✅ Reusable services
- ✅ Repository-based database access
- ✅ Centralized helper functions
- ✅ Async/await
- ✅ Parameterized SQL queries
- ✅ Structured error handling

---

## 🛠️ Tech Stack

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)

![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

### Database

![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=flat&logo=mariadb&logoColor=white)

![mysql2](https://img.shields.io/badge/mysql2-Driver-blue?style=flat)

### Authentication & Security

![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=flat&logo=json-web-tokens&logoColor=white)

![bcrypt](https://img.shields.io/badge/bcrypt-Password%20Hashing-green?style=flat)

![CORS](https://img.shields.io/badge/CORS-Enabled-blue?style=flat)

### Email & File Upload

![Nodemailer](https://img.shields.io/badge/Nodemailer-Email-red?style=flat)

![Multer](https://img.shields.io/badge/Multer-File%20Upload-orange?style=flat)

### Development Tools

![Nodemon](https://img.shields.io/badge/Nodemon-Development-blue?style=flat&logo=nodemon)

![dotenv](https://img.shields.io/badge/dotenv-Environment-green?style=flat)

![Postman](https://img.shields.io/badge/Postman-API%20Testing-orange?style=flat&logo=postman)

---

## 🏗️ Architecture

The backend follows a layered architecture:

```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database