
# 📘 Express.js Library Management Backend (Without Database)

## 🧩 Project Overview

This project is a **core Express.js learning project** that simulates a **Library Management System** backend.  
It is designed **without using any external database** — instead, it uses the **Node.js `fs` (File System) module** to handle persistent data storage for users, books, and issued records.  

The main goal of this project is to **understand the internal working of Express.js, authentication, middleware, routing, JWT, and error handling**.  

This project allows:
- **Admin** to create, read, update, and delete books.
- **Users** to register, log in, view available books, issue and return books.
- **Admin and user** roles are separated with proper authentication and authorization.
- All data (users, books, issued books) are stored in **JSON files** using the `fs` module instead of a database.

---

## 🎯 Learning Objectives

This project is created purely for **learning Express.js core concepts** and **exploring its real-world backend use cases** without relying on frameworks or ORMs.  
Below are the key topics and concepts learned and implemented throughout this project:

---

### 1. **Express.js Fundamentals**
- Understanding how **Express.js** handles HTTP requests and responses.
- Creating and managing **routes** for different endpoints.
- Exploring **request (`req`) and response (`res`) objects**.
- Using `express.json()` and `express.urlencoded()` to parse incoming data.
- Setting up different **route files** for users and admins to maintain modularity.

---

### 2. **Middleware (Built-in, Custom, and Error Handling)**
#### 🧱 Built-in Middleware
- `express.json()` → Parse JSON data in incoming requests.
- `express.urlencoded()` → Parse URL-encoded data (e.g., form submissions).
- `express.static()` → Serve static files if needed (like documentation or public data).

#### 🧩 Custom Middleware
- Created a **custom authentication middleware** that validates JWT tokens and checks user roles.
- Implemented a **logger middleware** to track every request for debugging.
- Created **role-based authorization middleware** (admin vs user).

#### 🚨 Error Handling Middleware
- Implemented a **centralized error-handling system** using Express’s built-in error middleware.
- Created **custom error classes** for different error types (e.g., Unauthorized, BadRequest, NotFound).
- Explored **synchronous and asynchronous error handling** using `next(err)` and `try...catch` blocks.

---

### 3. **Authentication & Authorization**
- Implemented **JWT (JSON Web Token)**-based authentication.
- Used `jsonwebtoken` to generate and verify tokens for user sessions.
- Tokens are sent through headers (`Authorization: Bearer <token>`).
- Implemented **role-based access control** — Admin and User have different privileges.

---

### 4. **Password Hashing and Security**
- Used `bcrypt` to securely **hash user passwords** before saving them to files.
- Implemented password **comparison** using `bcrypt.compare()` during login.
- Explored the **importance of hashing** in real-world applications to protect sensitive data.

---

### 5. **File Handling with `fs` Module**
Since there is no database, all data is stored as **JSON files** in a folder structure like:


#### Operations learned:
- **Read and Write Files** → Using `fs.readFileSync()` and `fs.writeFileSync()`.
- **Update Data Safely** → Read file → Modify JSON → Write back.
- **Handle Errors** → Using try/catch for file I/O.
- Learned the concept of **synchronous and asynchronous file handling**.

This mimics the behavior of a database but helps to deeply understand **how backend systems handle data persistence internally**.

---

### 6. **Admin Functionalities**
Admins can:
- Add a new book.
- View all books.
- Update book details.
- Delete any book.
- View issued book list and return status.

Each admin route is **protected using middleware** that verifies the admin role from JWT payload.

---

### 7. **User Functionalities**
Users can:
- Register and log in securely.
- View available books.
- Issue available books (book status changes to “issued”).
- Return issued books.
- View their own issued book history.

All user routes are **protected routes** requiring valid JWT tokens.

---

### 8. **Error Handling and Async Operations**
- Implemented **asynchronous functions** using `async/await`.
- Centralized all try/catch blocks with a reusable **asyncHandler** wrapper to handle async errors automatically.
- Learned how to manage **custom error messages and HTTP status codes** (400, 401, 404, 500).

---

### 9. **Role-Based Route Management**
- `/api/admin/...` → All routes handled by Admin controllers.
- `/api/user/...` → All routes handled by User controllers.
- Middleware checks the **role inside JWT** to restrict access properly.

---

### 10. **Project Folder Structure**
```project-root/
│
├── data/
│ ├── users.json
│ ├── books.json
│ └── issuedBooks.json
│
├── middleware/
│ ├── authMiddleware.js
│ ├── errorMiddleware.js
│ └── roleMiddleware.js
│
├── routes/
│ ├── adminRoutes.js
│ └── userRoutes.js
│
├── controllers/
│ ├── adminController.js
│ └── userController.js
│
├── utils/
│ ├── jwt.js
│ └── fileHelper.js
│
├── server.js
└── package.json
```


This structure separates concerns properly and reflects **real-world backend design**.

---

## 🧠 Key Concepts Learned from This Project

| Concept | Description |
|----------|--------------|
| Express Routing | Dividing routes logically for better modularity |
| Middleware Flow | How `req`, `res`, and `next()` connect the lifecycle |
| Authentication | Using JWT for login sessions |
| Authorization | Restricting access based on roles |
| Error Handling | Handling async/sync errors with custom middleware |
| Data Persistence | Managing storage using JSON files with fs module |
| Password Security | Hashing and comparing passwords using bcrypt |
| Async/Await | Handling asynchronous tasks effectively |
| RESTful Design | Designing clean, RESTful endpoints |
| Role Management | Separate access for admin and normal user |

---

## ⚙️ Technologies Used
- **Node.js**
- **Express.js**
- **bcryptjs** – For password hashing
- **jsonwebtoken** – For authentication
- **fs (File System)** – For local file-based storage
- **nodemon** – For development auto-restart

---

## 🚀 How It Works
1. User or Admin **registers** → Data stored in `users.json` with hashed password.
2. User/Admin **login** → JWT token generated.
3. Routes are protected → Token verified using middleware.
4. Admin manages books → CRUD operations on `books.json`.
5. User issues/returns books → Data updated in `issuedBooks.json`.
6. Every request passes through **custom middleware** and **error handlers** for validation.

---

## 🧾 Summary

This project acts as a **mini backend learning system** that brings together almost every **core concept of Express.js**:
- Middleware flow
- Authentication with JWT
- Password hashing
- Routing structure
- Role-based control
- Error handling
- File-based persistence (without DB)
- Async programming and modular architecture

By building this project, we not only understand **how Express works internally**, but also get a clear idea of **how real-world backend systems** handle users, authentication, and secure data flow — all while using **pure Node.js + Express** without any external database.

---
