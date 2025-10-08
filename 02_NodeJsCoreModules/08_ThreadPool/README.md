# Node.js Internal Architecture - Complete Guide

## Introduction

Node.js is a **JavaScript runtime environment** built on **Google Chrome's V8 engine**. It allows developers to run JavaScript on the server-side. Node.js is designed for building **highly scalable, non-blocking, asynchronous applications**.

Unlike traditional server-side platforms that use multi-threaded blocking architectures, Node.js uses a **single-threaded event-driven architecture** combined with **asynchronous I/O operations**. This architecture is efficient, fast, and suitable for I/O-heavy applications.

---

## Core Components of Node.js Architecture

### 1️⃣ V8 JavaScript Engine

* V8 is Google Chrome’s JavaScript engine written in C++.
* Node.js uses V8 to compile JavaScript code into **machine code**.
* Provides high-performance execution of JS on the server.

### 2️⃣ Event Loop

* The **event loop** is the heart of Node.js.
* It allows Node.js to perform **non-blocking I/O operations**.
* Node.js runs on a **single thread**, but the event loop handles multiple operations concurrently.

#### Working Mechanism:

* When Node.js receives a request, it **registers callbacks** for asynchronous operations.
* The event loop continuously checks the **callback queue** and executes them when the main thread is free.

### 3️⃣ Thread Pool (libuv)

* Node.js uses **libuv**, a C library, to handle **asynchronous operations** like file I/O, DNS lookups, and networking.
* Although Node.js is single-threaded for JS execution, libuv maintains a **thread pool** (default 4 threads) for heavy tasks.

#### How Thread Pool Works:

1. A CPU-intensive task or file operation is offloaded to the thread pool.
2. Thread pool executes the task in the background.
3. Once done, a callback is pushed to the **event queue**.
4. Event loop executes the callback on the main thread.

### 4️⃣ Event Pool (Event Queue / Callback Queue)

* Event pool stores callbacks of completed asynchronous operations.
* The **event loop** continuously monitors this queue.
* When the main thread is free, it picks callbacks from the event queue and executes them.

### 5️⃣ Non-blocking I/O

* Node.js uses **asynchronous, non-blocking I/O** for scalability.
* I/O operations do not block the main thread.

Example:

```js
const fs = require('fs');

// Asynchronous Read
fs.readFile('file.txt', 'utf8', (err, data) => {
  if(err) throw err;
  console.log(data);
});

console.log('Reading file...');
```

**Output:**

```
Reading file...
<file content>
```

* The `console.log` executes before file reading finishes, demonstrating **non-blocking behavior**.

### 6️⃣ Synchronous vs Asynchronous Code

#### Synchronous (Blocking)

* JS execution **stops** until the operation completes.
* Main thread is blocked.

Example:

```js
const fs = require('fs');

console.log('Start');
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);
console.log('End');
```

* Here, the code waits for `readFileSync` to finish before moving forward.

#### Asynchronous (Non-blocking)

* JS execution **continues** while operation runs in the background.
* Uses **callbacks, promises, or async/await**.

Example:

```js
const fs = require('fs');

console.log('Start');
fs.readFile('file.txt', 'utf8', (err, data) => {
  if(err) throw err;
  console.log(data);
});
console.log('End');
```

* `End` is printed before file content because reading is asynchronous.

### 7️⃣ Complete Flow of Node.js Architecture

1. Node.js initializes the V8 engine.
2. Application code runs on the **single JS thread**.
3. Asynchronous tasks (I/O, DB calls) are offloaded to **libuv thread pool**.
4. Once tasks complete, callbacks are pushed to the **event queue**.
5. **Event loop** continuously checks queue and executes callbacks.
6. Synchronous tasks block the main thread; asynchronous tasks do not.

### 8️⃣ Thread Pool Tuning

* Default size: 4 threads (`UV_THREADPOOL_SIZE = 4`).
* Can be changed via environment variable for CPU-intensive tasks.

```bash
UV_THREADPOOL_SIZE=8 node app.js
```

### 9️⃣ Advantages of Node.js Architecture

* High scalability due to **non-blocking I/O**.
* Handles thousands of concurrent connections efficiently.
* Ideal for **real-time applications** (chat apps, streaming, APIs).

### 1️⃣0️⃣ Limitations

* CPU-intensive tasks can block the main thread.
* Single-threaded nature requires careful design for heavy computation.

## Conclusion

Node.js architecture is built around:

* **V8 engine** for executing JS.
* **Event loop** for non-blocking operations.
* **Thread pool** for CPU-heavy or I/O tasks.
* **Event queue** for callback management.

It provides an **asynchronous, non-blocking, single-threaded environment** ideal for high-performance server-side applications. Understanding synchronous vs asynchronous behavior and the event loop is essential for efficient Node.js development.
