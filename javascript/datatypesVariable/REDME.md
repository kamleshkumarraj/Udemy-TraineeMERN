# JavaScript Fundamentals Deep Dive

## 🧩 Table of Contents

1. [Logging in JavaScript](#1-logging-in-javascript)
2. [Comments in JavaScript](#2-comments-in-javascript)
3. [Variables in JavaScript](#3-variables-in-javascript)
4. [Difference Between var, let, and const](#4-difference-between-var-let-and-const)
5. [Data Types in JavaScript](#5-data-types-in-javascript)
6. [Summary in Hindi (English Script)](#6-summary-in-hindi-english-script)

---

## 1. Logging in JavaScript

Logging means **printing or displaying output** during code execution for debugging or information purposes. JavaScript provides the global `console` object for logging and inspection.

### 🔹 Common Logging Methods:

#### 1. `console.log()`

Used to print general information or variable values.

```js
const name = 'Kamlesh';
console.log('Hello,', name); // Output: Hello, Kamlesh
```

#### 2. `console.error()`

Used to print error messages in red color (in most consoles).

```js
console.error('An unexpected error occurred!');
```

#### 3. `console.warn()`

Displays warnings in yellow (useful for deprecation or caution messages).

```js
console.warn('This method is deprecated!');
```

#### 4. `console.table()`

Displays arrays or objects in a table-like format.

```js
const users = [
  { name: 'Alice', age: 22 },
  { name: 'Bob', age: 25 }
];
console.table(users);
```

#### 5. `console.time()` & `console.timeEnd()`

Used to measure code execution time.

```js
console.time('Timer');
for (let i = 0; i < 1e6; i++) {}
console.timeEnd('Timer'); // Timer: X ms
```

#### Internal concept:

* `console` is an object provided by the browser or Node.js environment.
* It sends output to the **developer console** or **terminal**, not the webpage.

---

## 2. Comments in JavaScript

Comments are **non-executable lines** that help describe or document code. They are ignored by the JavaScript engine during execution.

### 🔹 Types of Comments:

#### 1. **Single-line Comment**

Starts with `//` and continues to the end of the line.

```js
// This is a single-line comment
let x = 10; // Variable declaration
```

#### 2. **Multi-line Comment**

Used for multiple lines or documentation.

```js
/*
 This is a multi-line comment.
 Used to explain logic or disable code temporarily.
*/
```

#### 3. **Documentation Comment (JSDoc)**

Used to describe functions, parameters, or return types.

```js
/**
 * Adds two numbers.
 * @param {number} a - First number.
 * @param {number} b - Second number.
 * @returns {number} Sum of a and b.
 */
function add(a, b) {
  return a + b;
}
```

---

## 3. Variables in JavaScript

A **variable** is a named container used to store data in memory so that it can be reused or modified later.

### 🔹 Declaration and Initialization

```js
let message = 'Hello JS'; // declaration + initialization
let count;                // declaration only
count = 5;                // initialization later
```

### 🔹 Variable Naming Rules:

* Must begin with a letter, `_`, or `$`.
* Cannot start with a number.
* Are case-sensitive (`count` ≠ `Count`).
* Should follow camelCase naming (best practice).

### 🔹 Memory Concept:

When a variable is declared, JS allocates memory in the **heap** (for objects) or **stack** (for primitives) and stores a reference in the variable name.

---

## 4. Difference Between `var`, `let`, and `const`

JavaScript supports three keywords for declaring variables — `var`, `let`, and `const`. They differ in **scope**, **hoisting**, and **mutability**.

| Feature            | var                              | let                                        | const                                      |
| ------------------ | -------------------------------- | ------------------------------------------ | ------------------------------------------ |
| **Scope**          | Function-scoped                  | Block-scoped                               | Block-scoped                               |
| **Hoisting**       | Yes (initialized as `undefined`) | Yes (not initialized — Temporal Dead Zone) | Yes (not initialized — Temporal Dead Zone) |
| **Re-declaration** | Allowed                          | Not allowed                                | Not allowed                                |
| **Re-assignment**  | Allowed                          | Allowed                                    | Not allowed                                |
| **Default value**  | `undefined`                      | `undefined`                                | Must be initialized                        |

### 🔹 Example:

```js
function testScope() {
  if (true) {
    var a = 10;
    let b = 20;
    const c = 30;
  }
  console.log(a); // ✅ Works (function-scoped)
  // console.log(b); ❌ Error (block-scoped)
  // console.log(c); ❌ Error (block-scoped)
}
```

### 🔹 Hoisting Behavior:

```js
console.log(x); // undefined (due to var hoisting)
var x = 5;

// console.log(y); // ReferenceError (TDZ)
let y = 10;
```

---

## 5. Data Types in JavaScript

JavaScript is a **dynamically typed** language, meaning you don’t need to declare the data type explicitly — it’s determined at runtime.

### 🔹 Two Categories:

1. **Primitive Data Types** — immutable, stored directly in stack.
2. **Non-Primitive (Reference) Data Types** — objects stored in heap.

### 🔸 1. Primitive Data Types

| Type          | Description                       | Example                 |
| ------------- | --------------------------------- | ----------------------- |
| **String**    | Sequence of characters in quotes  | `'Hello'`, `"JS"`       |
| **Number**    | Numeric values (integers, floats) | `42`, `3.14`            |
| **Boolean**   | Logical values                    | `true`, `false`         |
| **Undefined** | Declared but not assigned         | `let x;`                |
| **Null**      | Intentional absence of value      | `let y = null;`         |
| **Symbol**    | Unique and immutable identifier   | `Symbol('id')`          |
| **BigInt**    | Large integers beyond 2⁵³-1       | `12345678901234567890n` |

### 🔸 2. Non-Primitive (Reference) Data Types

| Type         | Description                   | Example                    |
| ------------ | ----------------------------- | -------------------------- |
| **Object**   | Collection of key-value pairs | `{name: 'Alice', age: 22}` |
| **Array**    | Ordered collection            | `[1, 2, 3]`                |
| **Function** | Reusable block of code        | `function greet(){}`       |

### 🔹 Type Checking

Use `typeof` operator:

```js
console.log(typeof 42);        // number
console.log(typeof 'Hello');   // string
console.log(typeof true);      // boolean
console.log(typeof undefined); // undefined
console.log(typeof null);      // object (JS quirk)
console.log(typeof {});        // object
console.log(typeof []);        // object
console.log(typeof function(){}); // function
```

### 🔹 Dynamic Typing Example:

```js
let data = 5;       // number
data = 'Hello';     // now string
data = true;        // now boolean
console.log(data);  // true
```

---

## 6. Summary in Hindi (English Script)

**JavaScript logging** ka matlab hai code ke output ya debugging info ko console me print karna using `console.log`, `console.error`, `console.warn`, etc.

**Comments** code ko explain karne ke liye use hote hain aur JS engine unhe ignore karta hai (`//`, `/*...*/`, `/**...*/`).

**Variable** ek container hota hai jo data store karta hai. Iske liye JS me `var`, `let`, aur `const` use karte hain.

* `var` → function-scoped aur re-declarable.
* `let` → block-scoped aur re-assignable.
* `const` → block-scoped aur immutable.

**Data types** do category me hote hain:

* **Primitive** → String, Number, Boolean, Null, Undefined, Symbol, BigInt.
* **Non-Primitive** → Object, Array, Function.

JS dynamically typed hai — variable ka type runtime pe decide hota hai.

---

*End of README.md — JavaScript Fundamentals Deep Dive*
