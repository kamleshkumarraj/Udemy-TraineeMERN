# JavaScript — Arrays (README)

> Detailed guide for README: covers Array definition, properties, methods, creation, iteration, and examples in JavaScript.

---

## Table of contents

1. Definition of Array
2. How to Create an Array
3. Array Properties
4. Array Methods

   * Adding/Removing Elements
   * Accessing and Searching Elements
   * Transforming Arrays
   * String and Array Conversions
   * Merging and Slicing Arrays
   * Sorting and Reversing
   * Flattening and Filling
   * Finding Elements
   * Other Useful Methods
5. Array Iteration
6. Key Points and Notes

---

## 1. Definition of Array

An **Array** in JavaScript is a **non-primitive data type** that stores **multiple values** in a single variable. Elements can be of **any data type**: numbers, strings, objects, or even other arrays.

```js
let fruits = ["apple", "banana", "mango"];
let mixed = [1, "hello", true, {name: "John"}, [10, 20]];
```

---

## 2. How to Create an Array

1. **Array Literal** (Most common)

```js
let arr = [10, 20, 30];
```

2. **Array Constructor**

```js
let arr = new Array(10, 20, 30);
let emptyArr = new Array();
```

3. **Array.of() and Array.from()**

```js
let arr1 = Array.of(1, 2, 3); // [1,2,3]
let arr2 = Array.from("Hello"); // ['H','e','l','l','o']
```

---

## 3. Array Properties

| Property          | Description                                | Example                                    |
| ----------------- | ------------------------------------------ | ------------------------------------------ |
| `length`          | Number of elements in array                | `arr.length`                               |
| `constructor`     | Function that created the array            | `arr.constructor`                          |
| `prototype`       | Used to add methods to all array instances | `Array.prototype.newMethod = function(){}` |
| `Array.isArray()` | Checks if a variable is an array           | `Array.isArray([1,2,3]) // true`           |

---

## 4. Array Methods

### 4.1 Adding / Removing Elements

| Method      | Description                   | Example          |
| ----------- | ----------------------------- | ---------------- |
| `push()`    | Add element at end            | `arr.push(4)`    |
| `pop()`     | Remove element from end       | `arr.pop()`      |
| `unshift()` | Add element at beginning      | `arr.unshift(0)` |
| `shift()`   | Remove element from beginning | `arr.shift()`    |

```js
let numbers = [1,2,3];
numbers.push(4); // [1,2,3,4]
numbers.pop();   // [1,2,3]
numbers.unshift(0); // [0,1,2,3]
numbers.shift(); // [1,2,3]
```

### 4.2 Accessing and Searching Elements

| Method          | Description                   | Example               |
| --------------- | ----------------------------- | --------------------- |
| `indexOf()`     | Returns index of element      | `arr.indexOf(20)`     |
| `lastIndexOf()` | Returns last index of element | `arr.lastIndexOf(20)` |
| `includes()`    | Checks if value exists        | `arr.includes(30)`    |

```js
let arr = [10,20,30,20];
console.log(arr.indexOf(20)); // 1
console.log(arr.lastIndexOf(20)); // 3
console.log(arr.includes(10)); // true
```

### 4.3 Transforming Arrays

| Method      | Description                             | Example                            |
| ----------- | --------------------------------------- | ---------------------------------- |
| `map()`     | Creates new array by applying function  | `arr.map(x => x*2)`                |
| `filter()`  | Returns elements that satisfy condition | `arr.filter(x => x>10)`            |
| `reduce()`  | Reduces array to single value           | `arr.reduce((a,b)=>a+b)`           |
| `forEach()` | Executes function on each element       | `arr.forEach(x => console.log(x))` |

```js
let num = [1,2,3,4,5];
let doubled = num.map(x => x*2); // [2,4,6,8,10]
let even = num.filter(x => x%2==0); // [2,4]
let sum = num.reduce((a,b)=>a+b,0); // 15
```

### 4.4 String and Array Conversions

```js
let fruits = ["apple","banana","mango"];
console.log(fruits.join(" | ")); // "apple | banana | mango"
console.log(fruits.toString()); // "apple,banana,mango"
```

### 4.5 Merging and Slicing Arrays

```js
let arr = [10,20,30,40];
let newArr = arr.slice(1,3); // [20,30]
arr.splice(2,1,"Hello"); // [10,20,"Hello",40]
[1,2].concat([3,4]); // [1,2,3,4]
```

### 4.6 Sorting and Reversing

```js
let arr = [30,10,20];
arr.sort(); // [10,20,30]
arr.reverse(); // [30,20,10]
```

### 4.7 Flattening and Filling

```js
let arr = [1,[2,[3,[4]]]];
console.log(arr.flat(3)); // [1,2,3,4]

let nums = [1,2,3,4];
nums.fill(9,1,3); // [1,9,9,4]
```

### 4.8 Finding Elements

| Method        | Description                                         | Example                  |
| ------------- | --------------------------------------------------- | ------------------------ |
| `find()`      | Returns first element satisfying condition          | `arr.find(x=>x>10)`      |
| `findIndex()` | Returns index of first element satisfying condition | `arr.findIndex(x=>x>10)` |
| `some()`      | Returns true if any element matches                 | `arr.some(x=>x>10)`      |
| `every()`     | Returns true if all elements match                  | `arr.every(x=>x>0)`      |

### 4.9 Other Useful Methods

| Method            | Description                   | Example                     |
| ----------------- | ----------------------------- | --------------------------- |
| `Array.isArray()` | Checks if variable is array   | `Array.isArray([])`         |
| `Array.from()`    | Converts iterable to array    | `Array.from("ABC")`         |
| `Array.of()`      | Creates array from values     | `Array.of(1,2,3)`           |
| `flatMap()`       | Maps and flattens in one step | `arr.flatMap(x => [x,x*2])` |

---

## 5. Array Iteration

```js
let arr = [10,20,30];
for(let i=0; i<arr.length; i++){ console.log(arr[i]); }
arr.forEach(x => console.log(x));
for(let val of arr){ console.log(val); }
```

---

## 6. Key Points

* Arrays are **objects** in JS (`typeof [] === 'object'`).
* Indexing starts from 0.
* Can hold **heterogeneous elements**.
* Arrays are **dynamic**: can grow/shrink.
* Use `Array.isArray()` to safely check arrays.
* Iteration can be done via `for`, `forEach`, or `for...of`.

---

This README section provides a **comprehensive reference** for JavaScript Arrays, covering creation, properties, methods, iteration, and practical examples for documentation or learning purposes.
