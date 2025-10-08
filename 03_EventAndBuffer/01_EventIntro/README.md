# Node.js EventEmitter and Event System - Complete Guide

## Introduction

Node.js follows an **event-driven architecture**, where many operations are **asynchronous** and execute based on **events**. The **EventEmitter** is a core module in Node.js that allows objects to **emit events** and **register listeners** to respond to those events.

The EventEmitter pattern is essential in Node.js for handling events like **HTTP requests, stream operations, and custom events**.

---

## Importing EventEmitter

### CommonJS

```js
const EventEmitter = require('events');
```

### ES Modules

```js
import { EventEmitter } from 'events';
```

---

## Creating an EventEmitter

```js
const myEmitter = new EventEmitter();
```

---

## Listening to Events

Use `.on()` to register a listener that will be called **every time** the event is emitted.

```js
myEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

myEmitter.emit('greet', 'Kamlesh'); // Output: Hello, Kamlesh!
```

* `.once()` registers a listener that runs **only once**:

```js
myEmitter.once('sayOnce', () => {
  console.log('This will run only once');
});

myEmitter.emit('sayOnce');
myEmitter.emit('sayOnce'); // Will not execute second time
```

---

## Emitting Events

* Use `.emit(eventName, ...args)` to trigger an event.
* Supports passing **any number of arguments**.

```js
myEmitter.emit('greet', 'Alice', 'morning');
```

---

## Removing Event Listeners

* `.removeListener(eventName, listener)` removes a specific listener.
* `.off(eventName, listener)` is an alias for removeListener.
* `.removeAllListeners(eventName)` removes all listeners for a specific event.

```js
function sayHello() {
  console.log('Hello!');
}

myEmitter.on('greet', sayHello);
myEmitter.removeListener('greet', sayHello);
```

---

## EventEmitter Methods

| Method                               | Description                       |
| ------------------------------------ | --------------------------------- |
| on(event, listener)                  | Add listener to event             |
| once(event, listener)                | Add listener that runs once       |
| emit(event, ...args)                 | Emit event with arguments         |
| removeListener(event, listener)      | Remove specific listener          |
| removeAllListeners(event)            | Remove all listeners for event    |
| listenerCount(event)                 | Get number of listeners for event |
| listeners(event)                     | Return array of listeners         |
| prependListener(event, listener)     | Add listener at beginning         |
| prependOnceListener(event, listener) | Add once listener at beginning    |

---

## Events in Node.js Core Modules

* **HTTP Server**: emits `request`, `connection`, `close`.
* **Streams**: emits `data`, `end`, `error`.
* **Process**: emits `exit`, `uncaughtException`.

Example:

```js
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
  res.end('Hello World');
});

server.listen(3000);
```

---

## Edge Cases and Corner Cases

### 1️⃣ Maximum Listeners Warning

* Default max listeners: 10.
* Exceeding triggers **memory leak warning**.

```js
myEmitter.setMaxListeners(20);
```

### 2️⃣ Emitting Events with No Listeners

* `.emit()` returns `false` if no listeners are registered.

```js
console.log(myEmitter.emit('unknown')); // false
```

### 3️⃣ Removing Listeners During Execution

* If a listener removes itself or others, Node.js ensures **current event loop executes safely**.

### 4️⃣ Prepending Listeners

* `.prependListener()` ensures listener executes **before other listeners**.

### 5️⃣ Once Listeners with Multiple Emits

* `.once()` removes listener **after first invocation**, even if multiple emits occur simultaneously.

### 6️⃣ Async/Await in Event Listeners

* Event listeners can be async:

```js
myEmitter.on('asyncEvent', async () => {
  await new Promise(res => setTimeout(res, 1000));
  console.log('Async listener done');
});
myEmitter.emit('asyncEvent');
```

* Async listeners do **not block the event loop**.

### 7️⃣ Error Events

* `error` is a **special event**:

  * If no listener for `error`, Node.js **throws and crashes**.

```js
myEmitter.emit('error', new Error('Something went wrong'));

// Safe way
myEmitter.on('error', (err) => {
  console.log('Caught error:', err.message);
});
```

---

## Best Practices

* Always handle `error` events.
* Remove unused listeners to prevent memory leaks.
* Prefer `.once()` for events that should trigger only once.
* Set maximum listeners for custom EventEmitters if adding many dynamically.

---

## Real-World Example

```js
const EventEmitter = require('events');

class ChatRoom extends EventEmitter {
  sendMessage(user, message) {
    this.emit('message', { user, message });
  }
}

const chat = new ChatRoom();

chat.on('message', (msg) => {
  console.log(`${msg.user}: ${msg.message}`);
});

chat.sendMessage('Alice', 'Hello!');
chat.sendMessage('Bob', 'Hi!');
```

**Output:**

```
Alice: Hello!
Bob: Hi!
```

---

## Conclusion

The **EventEmitter** module is the backbone of Node.js **event-driven architecture**. Understanding its methods, behavior with edge cases, and proper error handling is crucial for building **robust, asynchronous, and real-time Node.js applications**. Events allow decoupling, scalability, and efficient handling of asynchronous operations, which is central to Nod
