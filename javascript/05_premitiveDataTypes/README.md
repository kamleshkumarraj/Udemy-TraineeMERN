# JavaScript Data Types — In‑Depth

> A deep, practical README section for understanding all JavaScript primitive data types, their non‑primitive counterparts (wrapper objects), operations, and the detailed difference between `null` and `undefined`.

---

## 1. What are Data Types in JavaScript?

Data types define the kind of values that can be stored and manipulated in a program. JavaScript is a **dynamically typed language**, meaning variables are not bound to a specific data type — the type is determined at runtime.

JavaScript data types are broadly classified into:

* **Primitive types** (immutable, single value)
* **Non‑primitive types** (objects, mutable, collections)

This section focuses on **primitive types** and their **non‑primitive versions** (wrapper objects).

---

## 2. Primitive Data Types (Immutable)

There are **7 primitive data types** in JavaScript:

### 1. `String`

Represents textual data enclosed in single (`'`), double (`"`), or backticks (`` ` ``) for template literals.

```js
let name = 'Kamlesh';
let greeting = `Hello, ${name}!`;
```

**Key Points:**

* Immutable (cannot modify characters directly).
* Length can be accessed using `.length`.
* Common operations: concatenation (`+`), slicing, case conversion, searching, etc.

**Examples:**

```js
console.log('abc'.toUpperCase()); // 'ABC'
console.log('Hello'.length); // 5
console.log('Hi' + ' there'); // 'Hi there'
```

**Non‑primitive version:** `new String('text')` creates a wrapper object.

```js
let strObj = new String('hello');
console.log(typeof strObj); // 'object'
```

---

### 2. `Number`

Represents integers and floating‑point numbers.

```js
let x = 42;
let y = 3.14;
```

**Key Points:**

* All numbers in JS are **64‑bit floating‑point**.
* Special numeric values: `Infinity`, `-Infinity`, `NaN` (Not a Number).

**Examples:**

```js
console.log(1 / 0); // Infinity
console.log('abc' * 2); // NaN
```

**Non‑primitive version:** `new Number(42)` creates a wrapper.

```js
let numObj = new Number(10);
console.log(typeof numObj); // 'object'
```

---

### 3. `Boolean`

Represents logical true/false.

```js
let isLoggedIn = true;
let isAdmin = false;
```

**Conversions:**

```js
Boolean(1); // true
Boolean(0); // false
Boolean(''); // false
Boolean('hello'); // true
```

**Non‑primitive version:**

```js
let boolObj = new Boolean(false);
console.log(typeof boolObj); // 'object'
```

**Caution:**

```js
if (new Boolean(false)) console.log('runs'); // runs! (objects are truthy)
```

---

### 4. `BigInt`

Introduced in ES2020 to handle large integers beyond `Number.MAX_SAFE_INTEGER (2^53 - 1)`.

```js
let big = 123456789012345678901234567890n;
console.log(typeof big); // 'bigint'
```

**Operations:**

```js
let a = 10n, b = 2n;
console.log(a + b); // 12n
console.log(a * b); // 20n
```

**Caution:** Cannot mix with regular numbers directly:

```js
console.log(10n + 1); // TypeError
```

---

### 5. `Symbol`

Introduced in ES6 for creating **unique identifiers** (often used as object keys).

```js
let id = Symbol('userId');
let id2 = Symbol('userId');
console.log(id === id2); // false
```

**Usage:**

```js
const obj = { [id]: 123 };
console.log(obj[id]); // 123
```

Symbols are not enumerable by `for...in` or `Object.keys()`.

**Non‑primitive version:**

```js
let symObj = Object(Symbol('x'));
console.log(typeof symObj); // 'object'
```

---

### 6. `Undefined`

Means a variable has been **declared but not assigned** any value.

```js
let a;
console.log(a); // undefined
```

**Also returned** when accessing non‑existent object properties:

```js
const user = {};
console.log(user.age); // undefined
```

---

### 7. `Null`

Represents the **intentional absence of any value**.

```js
let data = null; // explicitly means 'no value'
```

---

## 3. Difference Between `null` and `undefined`

| Feature                 | `null`                         | `undefined`                           |
| :---------------------- | :----------------------------- | :------------------------------------ |
| Meaning                 | Explicitly no value            | Variable declared but not initialized |
| Type                    | Object (legacy JS bug)         | Undefined                             |
| Set by                  | Developer                      | JavaScript engine                     |
| Example                 | `let a = null;`                | `let b;`                              |
| Boolean conversion      | `false`                        | `false`                               |
| Equality (`==`)         | `null == undefined` → `true`   |                                       |
| Strict equality (`===`) | `null === undefined` → `false` |                                       |

**Examples:**

```js
let x;
console.log(x); // undefined
let y = null;
console.log(y); // null

console.log(x == y); // true (loose equality)
console.log(x === y); // false (strict equality)
```

**Important notes:**

* `typeof null` returns `'object'` (a long‑standing JS bug kept for backward compatibility).
* Use `null` when you intentionally clear a variable.
* `undefined` means JS didn’t assign a value.

---

## 4. Summary Table — Primitive vs Wrapper Object

| Primitive | Wrapper Object (Non‑primitive) | Example Conversion     |
| :-------- | :----------------------------- | :--------------------- |
| String    | String object                  | `new String('abc')`    |
| Number    | Number object                  | `new Number(10)`       |
| Boolean   | Boolean object                 | `new Boolean(true)`    |
| Symbol    | Symbol object                  | `Object(Symbol('id'))` |
| BigInt    | BigInt object                  | `Object(10n)`          |

**Note:** Wrapper objects provide access to built‑in methods (like `.toUpperCase()`), but JavaScript automatically creates temporary wrappers when calling methods on primitives.

---

## 5. Auto‑Boxing Concept

When you call a method on a primitive, JavaScript temporarily wraps it into its object form.

```js
let s = 'hello';
console.log(s.toUpperCase()); // works
// Internally: new String(s).toUpperCase(); wrapper destroyed immediately
```

---

## 6. Key Takeaways

* JavaScript has **7 primitive types**: String, Number, Boolean, BigInt, Symbol, Undefined, Null.
* Primitives are **immutable** and **copied by value**.
* Wrapper objects are **mutable** and **copied by reference**.
* `null` → intentional absence; `undefined` → uninitialized variable.
* Avoid using `new String()`, `new Number()`, or `new Boolean()` unless you specifically need object behavior.

---

*End of README — Primitive and Non‑Primitive Data Types Section.*
