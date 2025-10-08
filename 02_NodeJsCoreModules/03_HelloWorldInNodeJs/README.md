# 🔵 How Node.js Code Runs Internally

## 🧠 Introduction

Node.js is a JavaScript runtime environment built on Google Chrome’s V8 JavaScript Engine. It allows JavaScript to run outside the browser, primarily used for server-side applications.
Internally, Node.js combines C++, JavaScript, and libuv (written in C) to create a powerful asynchronous event-driven system.

---

## ⚙️ Node.js Internal Architecture Overview

When you execute a Node.js program using:

```bash
node app.js
```

the following internal steps occur:

```
JavaScript Code → Node.js Runtime → V8 Engine → Libuv → OS → Output
```

Let’s break down each step in detail 👇

---

## 🧩 Step 1: Node.js Initialization

When Node.js starts:

* The Node.js runtime is initialized.
* C++ bindings and core modules (like fs, http, path, os) are loaded.
* The event loop and thread pool (provided by libuv) are initialized.
* Your JavaScript file (e.g., app.js) is loaded and passed to the V8 Engine for execution.

---

## 🚀 Step 2: V8 Engine Compilation

Node.js uses V8 Engine, which converts JavaScript code into machine code.

### Process:

* The Parser in V8 reads your JS code and converts it into an Abstract Syntax Tree (AST).
* The Ignition Interpreter executes the AST and generates bytecode.
* The TurboFan JIT (Just-In-Time) Compiler optimizes frequently used functions and converts them into optimized machine code for faster execution.

Example:

```js
console.log("Hello Node!");
```

The console.log() is parsed → converted to AST → bytecode → optimized native code → executed by CPU.

---

## ⚡ Step 3: Libuv and Event Loop

Libuv is a C library that provides:

* Event loop for asynchronous operations
* Thread pool for non-blocking tasks (e.g., file system, DNS, compression)

### 🌀 Event Loop Phases:

Node.js runs on a single main thread but handles I/O asynchronously using an event-driven model.

The event loop runs in phases:

1. **Timers Phase** – Executes setTimeout() and setInterval().
2. **I/O Callbacks Phase** – Executes callbacks from I/O events.
3. **Idle/Prepare Phase** – Internal use only.
4. **Poll Phase** – Waits for new I/O events and executes them.
5. **Check Phase** – Executes setImmediate() callbacks.
6. **Close Callbacks Phase** – Executes close event callbacks (like socket.on('close')).

---

## 🧥 Step 4: Thread Pool

Although Node.js is single-threaded, it uses a thread pool (by libuv) for handling heavy tasks asynchronously.

These include:

* File system operations (fs.readFile(), fs.writeFile())
* DNS lookups
* Compression (zlib)
* Crypto operations

The default thread pool size is 4 (can be changed via UV_THREADPOOL_SIZE).

---

## 🧮 Step 5: Native APIs and C++ Bindings

When your JavaScript calls built-in modules like fs, http, or os, Node.js internally uses C++ bindings to interact with system-level resources.

Example:

```js
fs.readFile("data.txt", (err, data) => {
  console.log(data.toString());
});
```

Internally:

* JS fs.readFile() → C++ Binding → Libuv thread pool → OS file system.
* Once the file is read → callback is placed in the event loop queue.
* Event loop executes callback → output printed.

---

## 🔁 Step 6: Event Queue and Callback Execution

When asynchronous operations finish (like API calls, timers, or file reads), their callbacks are added to the event queue.

The event loop continuously checks this queue and executes callbacks one by one (non-blocking).

---

## 🥮 Step 7: Garbage Collection

V8 automatically handles memory management and garbage collection.
Unused memory is cleared to prevent memory leaks, using algorithms like mark-and-sweep.

---

## 🧭 Execution Flow Summary

| Step | Component         | Description                                             |
| ---- | ----------------- | ------------------------------------------------------- |
| 1️⃣  | Node.js Loader    | Loads JS file and initializes environment               |
| 2️⃣  | V8 Engine         | Parses and compiles JS to machine code                  |
| 3️⃣  | Libuv             | Handles async operations using event loop & thread pool |
| 4️⃣  | C++ Bindings      | Bridge between JS and system APIs                       |
| 5️⃣  | Event Loop        | Executes queued callbacks asynchronously                |
| 6️⃣  | Garbage Collector | Manages memory automatically                            |

---

## 💡 Example (Async Flow)

```js
const fs = require('fs');

console.log("Start");

fs.readFile('data.txt', 'utf8', (err, data) => {
  console.log("File data:", data);
});

console.log("End");
```

### Output:

```
Start
End
File data: Hello World
```

### Explanation:

1. JS file loaded → executed line by line.
2. fs.readFile() sent to thread pool (non-blocking).
3. Node continues to execute next lines.
4. When file read completes → callback pushed to event queue.
5. Event loop executes callback → prints data.

---

## 🧠 Key Takeaways

* Node.js is single-threaded for JavaScript execution.
* Uses libuv to perform asynchronous I/O operations.
* V8 engine compiles JS directly to machine code for high performance.
* Event loop ensures non-blocking, asynchronous, and efficient execution.
* C++ bindings act as a bridge between JavaScript and system APIs.

---

## 📚 Summary Diagram

```
+-------------------------+
|     JavaScript Code     |
+-----------+-------------+
            ↓
      Node.js Runtime
            ↓
+-----------+-------------+
|   V8 Engine (JS → C++)  |
+-----------+-------------+
            ↓
+-----------+-------------+
| Libuv (Event Loop, I/O) |
+-----------+-------------+
            ↓
+-----------+-------------+
|  OS & Hardware Layer     |
+-------------------------+
```

---

## ✅ In short:

Node.js uses **V8 for code execution**, **libuv for async I/O**, and an **event loop** to handle concurrency — allowing high-speed, non-blocking, and scalable applications.
