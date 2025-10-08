# 🌐 Node.js HTTP Server — Complete In-Depth Guide

This document provides a full, interview-ready understanding of how to create and handle an HTTP server in Node.js using the built-in `http` module. It covers server setup, request (`req`) and response (`res`) handling, parsing request bodies, managing headers, and key edge cases.

---

## 🏁 1. Creating a Basic HTTP Server

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200; // default success
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, Node.js HTTP Server!");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
```

* `http.createServer()` creates an HTTP server instance.
* The callback `(req, res)` runs on every request.
* `res.end()` finalizes the response — must be called, otherwise the client waits indefinitely.

---

## 📬 2. The `req` Object (IncomingMessage)

The `req` object represents the incoming request and is an instance of `http.IncomingMessage`.

### ✅ Common Properties

| Property        | Type       | Description                   | Example                                                   |
| --------------- | ---------- | ----------------------------- | --------------------------------------------------------- |
| req.url         | string     | Request path and query string | /api/users?name=kamlesh                                   |
| req.method      | string     | HTTP method (verb)            | GET, POST, PUT, DELETE                                    |
| req.headers     | object     | All request headers           | { "content-type": "application/json" }                    |
| req.httpVersion | string     | HTTP version                  | 1.1                                                       |
| req.socket      | net.Socket | TCP connection info           | req.socket.remoteAddress gives IP                         |
| req.rawHeaders  | array      | Raw headers in array format   | [ 'Host', 'localhost:3000', 'User-Agent', 'curl/7.68.0' ] |

### 📦 Reading the Request Body (Parsing Data)

`req` is a **Readable Stream**, so data comes in chunks. Handle it asynchronously.

```js
let body = "";
req.on("data", chunk => {
  body += chunk.toString();
});

req.on("end", () => {
  try {
    const parsedBody = JSON.parse(body);
    console.log(parsedBody);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", data: parsedBody }));
  } catch (err) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Invalid JSON" }));
  }
});
```

### ⚠️ Edge Cases for Parsing

* Empty Body: Check if body is empty before parsing.
* Large Payloads: Node doesn’t limit body size by default; handle manually.
* Content-Type Mismatch: Verify `req.headers["content-type"]` before parsing.

---

## 📤 3. The `res` Object (ServerResponse)

`res` is an instance of `http.ServerResponse`. Controls what gets sent to the client.

### 🎛️ Common Properties

| Property          | Type    | Description                        | Example                         |
| ----------------- | ------- | ---------------------------------- | ------------------------------- |
| res.statusCode    | number  | Sets the HTTP response status code | res.statusCode = 404            |
| res.statusMessage | string  | Custom status text                 | res.statusMessage = "Not Found" |
| res.headersSent   | boolean | Indicates if headers were sent     | true / false                    |

### 🧩 Common Methods

#### 1️⃣ res.setHeader(name, value)

```js
res.setHeader("Content-Type", "application/json");
res.setHeader("X-Powered-By", "Node.js");
```

* Must call before `res.write()` or `res.end()`.

#### 2️⃣ res.getHeader(name)

```js
console.log(res.getHeader("Content-Type"));
```

#### 3️⃣ res.removeHeader(name)

```js
res.removeHeader("X-Powered-By");
```

#### 4️⃣ res.write(chunk[, encoding][, callback])

```js
res.write("Partial response ");
res.write("continues...");
res.end();
```

* After `res.end()`, cannot call `res.write()`.

#### 5️⃣ res.end([data][, encoding][, callback])

```js
res.end("Goodbye!");
```

* Always call `res.end()` to avoid open connections.

#### 6️⃣ res.writeHead(statusCode[, statusMessage][, headers])

```js
res.writeHead(200, {
  "Content-Type": "text/html",
  "X-Server": "Node.js"
});
res.end("<h1>Hello!</h1>");
```

* Shortcut to set status and headers together.

---

## 🧠 4. Full Example — Handling Different Routes and Methods

```js
const http = require("http");

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Home Page</h1>");
  } else if (method === "POST" && url === "/api/data") {
    let body = "";
    req.on("data", chunk => body += chunk.toString());
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Data received", data }));
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () => console.log("Server running on port 3000"));
```

---

## 🧩 5. Common Edge Cases and Pitfalls

| Case                  | Description                           | How to Handle                     |
| --------------------- | ------------------------------------- | --------------------------------- |
| Headers already sent  | Calling setHeader() after res.write() | Always set headers first          |
| No res.end()          | Client waits indefinitely             | Always call res.end()             |
| Invalid JSON body     | Crashes JSON parser                   | Wrap in try...catch               |
| Multiple responses    | Calling res.end() twice               | Guard with res.writableEnded      |
| Large payloads        | May exhaust memory                    | Implement streaming or limit size |
| Content-Type mismatch | Parsing fails                         | Check req.headers["content-type"] |

---

## 🔧 6. Useful HTTP Status Codes (Quick Reference)

| Code | Meaning               | Typical Use               |
| ---- | --------------------- | ------------------------- |
| 200  | OK                    | Successful request        |
| 201  | Created               | Resource created          |
| 204  | No Content            | Empty successful response |
| 301  | Moved Permanently     | URL redirection           |
| 400  | Bad Request           | Invalid input             |
| 401  | Unauthorized          | Authentication required   |
| 403  | Forbidden             | Access denied             |
| 404  | Not Found             | Resource missing          |
| 500  | Internal Server Error | Server-side issue         |

---

## 📊 7. Advanced Tips

* Use `req.on("error", handler)` to catch stream errors.
* Use `res.flushHeaders()` to send headers early for streaming.
* For JSON APIs, always set proper Content-Type.
* Use `const { method, url } = req;` for cleaner route handling.
* Implement body size limits manually or use frameworks like Express.

---

## 🧾 8. Summary Cheat Sheet

| Concept        | Node.js Object                | Key Methods                      | Notes                                |
| -------------- | ----------------------------- | -------------------------------- | ------------------------------------ |
| Request        | http.IncomingMessage          | on('data'), on('end')            | Readable stream, parse body manually |
| Response       | http.ServerResponse           | setHeader, write, end, writeHead | Must end every response              |
| Headers        | req.headers / res.setHeader() | Case-insensitive keys            | Sent before body                     |
| Status         | res.statusCode                | 200–599                          | Defaults to 200                      |
| Error Handling | Try/catch + status codes      | —                                | Don’t leak stack traces              |

---

