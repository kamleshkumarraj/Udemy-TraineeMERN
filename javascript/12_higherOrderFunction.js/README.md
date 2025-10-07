# JavaScript Higher-Order Functions and Callbacks (Detailed README)

## 🧠 What Are Higher-Order Functions?

A **Higher-Order Function (HOF)** is a function that either:

1. Takes one or more functions as **arguments**, **or**
2. Returns another function as its **result**.

In JavaScript, functions are **first-class citizens**, meaning they can be assigned to variables, passed as arguments, and returned from other functions.

**Example:**

```js
function greet(name) {
  return `Hello, ${name}`;
}

function processUser(callback) {
  const name = 'Kamlesh';
  return callback(name);
}

console.log(processUser(greet)); // Hello, Kamlesh
```

Here, `processUser` is a **higher-order function** because it accepts another function (`greet`) as an argument.

---

## ⚙️ What Is a Callback Function?

A **Callback Function** is a function that is passed as an argument to another function and executed later.

Callbacks are commonly used for **asynchronous operations** like fetching data, timers, or event handling.

**Example:**

```js
function fetchData(callback) {
  console.log('Fetching data...');
  setTimeout(() => {
    console.log('Data received!');
    callback(); // executing the callback function
  }, 2000);
}

function processData() {
  console.log('Processing data...');
}

fetchData(processData);
```

**Output:**

```
Fetching data...
Data received!
Processing data...
```

### 🧩 Types of Callbacks:

1. **Synchronous Callback** → Executed immediately (e.g., inside `map()`, `filter()`)
2. **Asynchronous Callback** → Executed after some delay (e.g., in `setTimeout`, Promises)

---

## 🔁 Common Higher-Order Functions in JavaScript

JavaScript provides many built-in higher-order functions for working with arrays, such as `map()`, `filter()`, and `reduce()`.

Let’s explore each in depth:

---

### 1. **Array.prototype.map()**

The `map()` method **creates a new array** by applying a callback function to each element of the original array.

**Syntax:**

```js
array.map(callback(currentValue, index, array), thisArg);
```

**Example:**

```js
const numbers = [1, 2, 3, 4];
const squares = numbers.map(num => num * num);
console.log(squares); // [1, 4, 9, 16]
```

✅ Returns a **new array** (does not modify the original)

---

### 2. **Array.prototype.filter()**

The `filter()` method returns a **new array containing elements** that satisfy a given condition (returns `true`).

**Syntax:**

```js
array.filter(callback(currentValue, index, array), thisArg);
```

**Example:**

```js
const ages = [10, 18, 20, 15, 30];
const adults = ages.filter(age => age >= 18);
console.log(adults); // [18, 20, 30]
```

✅ Returns elements that pass the test.
✅ Does **not** change the original array.

---

### 3. **Array.prototype.reduce()**

The `reduce()` method reduces an array to a **single value** by applying a callback function on each element.

**Syntax:**

```js
array.reduce(callback(accumulator, currentValue, index, array), initialValue);
```

**Example:**

```js
const numbers = [1, 2, 3, 4, 5];
const total = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(total); // 15
```

✅ Great for calculating sums, products, averages, or flattening arrays.

**Example: Flattening an array using reduce:**

```js
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, curr) => acc.concat(curr), []);
console.log(flat); // [1, 2, 3, 4, 5, 6]
```

---

## 🧮 Comparison Between `map()`, `filter()`, and `reduce()`

| Method   | Purpose                            | Returns      | Mutates Original? |
| -------- | ---------------------------------- | ------------ | ----------------- |
| map()    | Transform each element             | New Array    | ❌ No              |
| filter() | Select elements based on condition | New Array    | ❌ No              |
| reduce() | Combine elements into single value | Single Value | ❌ No              |

---

## 🔍 Real-Life Example Combining All Three

```js
const users = [
  { name: 'Kamlesh', age: 22, marks: 80 },
  { name: 'Raj', age: 17, marks: 45 },
  { name: 'Amit', age: 19, marks: 90 }
];

const result = users
  .filter(user => user.age >= 18) // keep adults
  .map(user => user.marks) // extract marks
  .reduce((total, marks) => total + marks, 0); // total marks

console.log(result); // 170
```

✅ Used `filter()` → only adults
✅ Used `map()` → extracted marks
✅ Used `reduce()` → summed up marks

---

## 🧩 Why Are Higher-Order Functions Important?

* Promote **reusability** and **modularity**
* Improve **code readability**
* Encourage **functional programming** style
* Reduce the need for explicit loops (`for`, `while`)

---

## 🧠 Summary

| Concept               | Description                         | Example                      |
| --------------------- | ----------------------------------- | ---------------------------- |
| Higher-Order Function | Accepts or returns another function | `map`, `filter`, `reduce`    |
| Callback Function     | Function passed as an argument      | `setTimeout(callback, 1000)` |
| map()                 | Transforms array elements           | `[1,2,3].map(x => x*2)`      |
| filter()              | Filters elements based on condition | `[1,2,3].filter(x => x>1)`   |
| reduce()              | Reduces array to single value       | `[1,2,3].reduce((a,b)=>a+b)` |

---

**Author:** Kamlesh Raj Kushwaha
**Topic:** JavaScript Higher-Order Functions, Callbacks, map(), filter(), reduce()
**For:** README Documentation
