# 🔐 Complete Authentication System (Session-Based + Refresh Token-Based)

Authentication is the backbone of any secure application. It ensures that only verified users can access protected resources. In this guide, we’ll explore **Session-Based Authentication** and **Token-Based Authentication (with Refresh Tokens)** — their workflows, differences, pros, cons, and implementation logic.

---

## 🧩 1. What is Authentication?

Authentication is the process of **verifying the identity** of a user.  
It confirms **“Who are you?”** and **“Are you allowed to access this resource?”**

Common methods:
- Session-based authentication (traditional)
- Token-based authentication (modern)
- OAuth / SSO / API Key-based mechanisms (advanced)

---

## 🧭 2. Session-Based Authentication

### 🧠 Concept:
In a session-based system, after login, the **server creates a session** and stores the user's details (or session ID) in the server memory or a session store like Redis or MongoDB.  
The client receives a **cookie** that identifies the session on subsequent requests.

---

### ⚙️ Workflow:

1. **Login Request:**
   - User sends credentials (`username`, `password`) to `/login`.
2. **Verification:**
   - Server checks credentials against the database.
3. **Session Creation:**
   - Server creates a **session object** (e.g., `{ userId, role, expiryTime }`) and stores it in memory or Redis.
4. **Set Cookie:**
   - Server sends a `Set-Cookie` header with a **session ID** to the browser.
   - The cookie is stored in the client browser.
5. **Subsequent Requests:**
   - Browser automatically sends the cookie with each request.
   - Server validates the session ID from its store.
6. **Logout or Expiration:**
   - Session can be destroyed on logout or automatically expired.

---

### 🧾 Example (Express + express-session):

```js
import express from "express";
import session from "express-session";

const app = express();
app.use(express.json());

app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 15 }, // 15 minutes
  })
);

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    req.session.user = { username };
    res.send("Login successful");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.get("/profile", (req, res) => {
  if (req.session.user) res.json(req.session.user);
  else res.status(401).send("Unauthorized");
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.send("Logged out");
});

app.listen(4000);

