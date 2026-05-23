# Task Management System

A full-stack Task Management System with Role-Based Access Control (RBAC), Activity Logging, Admin Dashboard, and Authentication.

Built using React, Node.js, Express.js, MongoDB, and JWT Authentication.

---

# Live Demo

## Frontend
https://task-management-0526.netlify.app

## Backend
https://task-management-system-94b2.onrender.com

---

# Features

## Authentication
- User Registration
- User Login
- User Logout
- JWT Authentication
- HTTP-only Secure Cookies
- Persistent Login Sessions

---

## Role-Based Access Control (RBAC)

### Admin Permissions
- View all users
- Manage users
- Update user status
- Delete users
- View all tasks
- Delete any task
- View activity logs
- View analytics dashboard

### User Permissions
- Create own tasks
- View own tasks only
- Update own tasks
- Delete own tasks

---

## Activity Logging
Tracks:
- User login activity
- Task creation
- Task updates
- Task deletion

---

## Admin Dashboard
- User Management
- Task Monitoring
- Activity Logs
- Analytics Overview

---

## Analytics
- Total Users
- Total Tasks
- Completed Tasks
- Pending Tasks

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Cookie Parser

---

# Project Structure

```txt
task-management-system/
│
├── backend/
│
├── frontend/
│
└── README.md
```

---

# Backend Structure

```txt
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── validations/
│
├── .env
├── package.json
└── server.js
```

---

# Frontend Structure

```txt
frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── routes/
│   └── utils/
│
├── package.json
└── vite.config.js
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

NODE_ENV=development
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/amehtacc/task-management-system.git
```

---

## Install Backend Dependencies

```bash
cd backend

npm install
```

---

## Install Frontend Dependencies

```bash
cd frontend

npm install
```

---

# Run Backend

```bash
cd backend

npm run dev
```

---

# Run Frontend

```bash
cd frontend

npm run dev
```

---

# Default Admin Credentials

```txt
Email: admin@gmail.com

Password: admin123
```

The backend automatically creates the default admin account on server startup.

---

# Authentication Flow

- JWT token stored in HTTP-only secure cookies
- Protected routes use authentication middleware
- Admin routes use role-based middleware

---

# Security Features

- Password hashing using bcryptjs
- JWT Authentication
- HTTP-only Cookies
- Role-Based Authorization
- Protected Routes
- Ownership Validation
- CORS Protection

---

# Git Workflow Followed

- Initialized Git repository
- Created feature branch
- Implemented features on separate branch
- Raised Pull Request
- Merged feature branch into main

---

# API Endpoints

## Auth Routes

```txt
POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/me
```

---

## Task Routes

```txt
POST /api/tasks

GET /api/tasks/my-tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id
```

---

## Admin Routes

```txt
GET /api/admin/users

PATCH /api/admin/users/:id/status

DELETE /api/admin/users/:id

GET /api/admin/tasks

GET /api/admin/activities

GET /api/admin/analytics
```

---

# Deployment

## Frontend
Deployed on Netlify

## Backend
Deployed on Render

## Database
MongoDB Atlas

---

# Future Improvements

- Pagination
- Search & Filtering
- Task Due Dates
- Email Notifications
- Dark Mode
- Profile Management

---

# Author

Aryan Mehta