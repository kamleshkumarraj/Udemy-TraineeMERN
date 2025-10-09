# 📘 Express.js Middleware — Complete In-Depth Guide

## 🌐 What is Middleware in Express.js?

Middleware in Express.js refers to functions that have access to the request (`req`) and response (`res`) objects, and the `next()` function in the application's request-response cycle. Middleware can execute code, modify request/response objects, end the request-response cycle, or call the next middleware in line.

Think of middleware as layers that process incoming requests before reaching the final route handler, or modify responses before sending them to the client.

## 🧩 Core Concept

A middleware function has the following signature:

```js
function middleware(req, res, next) {
  // your code
  next(); // call next middleware or route handler
}
```

* `req` → The request object.
* `res` → The response object.
* `next` → Function to pass control to the next middleware.

Middleware must call `next()` unless it ends the response using `res.send()`, `res.json()`, `res.end()`, etc.

## ⚙️ Types of Middleware in Express.js

### 1. Application-Level Middleware

Applied globally to all routes or specific routes using `app.use()` or `app.METHOD()`.

```js
const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => res.send("Home Page"));
app.listen(3000);
```

### 2. Router-Level Middleware

Applied to specific routers using `express.Router()`.

```js
const router = express.Router();

router.use((req, res, next) => {
  console.log("Router Middleware Executed");
  next();
});

router.get("/profile", (req, res) => res.send("User Profile"));
app.use("/user", router);
```

### 3. Built-in Middleware

Express comes with built-in middleware like `express.json()`, `express.urlencoded()`, and `express.static()`.

```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
```

### 4. Third-Party Middleware

Middleware provided by npm packages, e.g., `cors`, `morgan`, `helmet`.

```js
const cors = require("cors");
const morgan = require("morgan");
app.use(cors());
app.use(morgan("dev"));
```

## 🧠 Advanced Concepts in Middleware

### 1. Error-Handling Middleware

Special middleware that takes four arguments: `(err, req, res, next)`.

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});
```

### 2. Conditional Middleware

Execute middleware only on certain conditions.

```js
app.use((req, res, next) => {
  if (req.path.startsWith("/admin")) {
    console.log("Admin route accessed");
  }
  next();
});
```

### 3. Middleware Chaining

Multiple middleware functions can be chained for a single route.

```js
app.get(
  "/dashboard",
  (req, res, next) => { console.log("Step 1"); next(); },
  (req, res, next) => { console.log("Step 2"); next(); },
  (req, res) => res.send("Dashboard loaded")
);
```

### 4. Asynchronous Middleware

Middleware can be asynchronous using async/await.

```js
app.use(async (req, res, next) => {
  try {
    const data = await fetchDataFromDB();
    req.data = data;
    next();
  } catch (err) {
    next(err);
  }
});
```

### 5. Third-Party Middleware for Advanced Uses

* `express-rate-limit` → Limit requests
* `compression` → Gzip responses
* `express-session` → Manage sessions

## ⚠️ Edge Cases & Corner Cases

1. Not Calling `next()` → Middleware blocks further processing.
2. Multiple Responses → Sending multiple responses causes "Can't set headers after they are sent" error.
3. Error Propagation → Errors in async code must be passed to `next(err)`.
4. Middleware Order Matters → Middleware executes in the order defined.
5. Route vs Global Middleware Conflicts → Specific route middleware can override global middleware.

## 💻 Example: Complete Middleware Usage

```js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const router = express.Router();
router.use((req, res, next) => {
  console.log("Router middleware executed");
  next();
});
router.get("/profile", (req, res) => res.json({ user: "John Doe" }));
app.use("/user", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

## 🧾 Summary

| Concept          | Explanation                                                        |
| ---------------- | ------------------------------------------------------------------ |
| Middleware       | Functions that process req/res before route handlers               |
| Types            | Application, Router, Built-in, Third-party                         |
| Error Middleware | `(err, req, res, next)` for centralized error handling             |
| Async Middleware | Use async/await with try/catch & next(err)                         |
| Key Rules        | Always call next(), handle errors, mind execution order            |
| Edge Cases       | Missing next(), multiple responses, async errors, middleware order |

## 🚀 Conclusion

Middleware in Express.js is a powerful mechanism to control the request-response cycle, handle authentication, logging, error handling, and more. Understanding advanced concepts like error handling, async middleware, and conditional execution is critical for building scalable, maintainable, and secure Node.js applications.
