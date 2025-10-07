# JavaScript — Non‑Primitive Data Types (README)


## Table of contents

1. Overview — What is a non‑primitive (reference) type?
2. Creation patterns (general): literal, constructor, factory, `Object.create`, `class`/`new`
3. Plain `Object` (including property descriptors & prototypes)
4. `Array`
5. `Function`
6. `Date`
7. `RegExp`
8. `Map` and `Set`
9. `WeakMap` and `WeakSet`
10. `Promise`
11. Iterators, Generators & the Iterable protocol
12. `ArrayBuffer`, TypedArrays and `DataView`
13. `Error` objects
14. `Proxy` and `Reflect`
15. JSON helper object
16. Cloning, copying, equality — common pitfalls
17. Tips, performance notes and gotchas

---

## 1. Overview — What is a non‑primitive (reference) type?

Non‑primitive values in JavaScript are objects — values stored and passed by *reference* rather than by value. Unlike primitives (string, number, boolean, null, undefined, bigint, symbol), non‑primitives can have properties and methods, are mutable (in most cases), and multiple variables can reference the same underlying object.

Key consequences:

* Assignment copies the *reference*, not the object itself.
* Equality (`===`) compares references (identity) for objects, not deep structure.
* Objects can inherit behavior via prototypes.

---

## 2. Creation patterns (general)

Common ways to create reference values:

* **Literal notation**

  * Object: `{}`
  * Array: `[]`
  * RegExp: `/pattern/flags`

* **Constructor form (`new`)**

  * `new Date()`, `new Map()`, `new Set()`, `new Error('msg')`
  * `new MyConstructor()` for user constructors or `class`es

* **Factory function**

  * A function that returns an object — good for encapsulation and avoiding `new`.

* **`Object.create(proto)`**

  * Creates a new object whose prototype is `proto`.

* **Built‑in static factories**

  * `Array.from(iterable)`, `Array.of(1,2,3)`, `Promise.resolve(x)`

* **Constructors with arguments**

  * `new Uint8Array(length)` or `new RegExp('a','g')`.

Examples of patterns are used across types and explained below per type.

---

## 3. Plain `Object`

**Creation:**

```js
const a = {};                // literal
const b = new Object();      // constructor
const c = Object.create(null); // no prototype (useful for dictionaries)
const d = Object.create(a);  // prototype linked to `a`
```

**Important `Object` methods & properties (static and prototype):**

* `Object.keys(obj)` — array of own enumerable property names
* `Object.values(obj)` — own enumerable values
* `Object.entries(obj)` — pairs `[key, value]`
* `Object.getOwnPropertyNames(obj)` — own property names (including non‑enumerable)
* `Object.getOwnPropertySymbols(obj)` — own symbol keys
* `Object.getOwnPropertyDescriptor(obj, prop)` — descriptor `{ value, writable, enumerable, configurable }` or getter/setter
* `Object.defineProperty(obj, prop, descriptor)` — define/change property attributes
* `Object.defineProperties(obj, descriptors)` — define many
* `Object.freeze(obj)`, `Object.seal(obj)`, `Object.preventExtensions(obj)` — mutate extensibility
* `Object.isFrozen(obj)` etc.
* `Object.assign(target, ...sources)` — shallow copy and merge
* `Object.create(proto[, propertiesObject])` — create object with given prototype
* `Object.setPrototypeOf(obj, proto)`, `Object.getPrototypeOf(obj)`

**Prototype methods (from `Object.prototype`):**

* `obj.hasOwnProperty(prop)` — check own property
* `obj.isPrototypeOf(other)`
* `obj.propertyIsEnumerable(prop)`
* `obj.toString()` and `obj.valueOf()` (customize by overriding)

**Examples:**

```js
const user = { name: 'Kamlesh' };
Object.defineProperty(user, 'id', { value: 42, enumerable: false });
console.log(Object.keys(user)); // ['name'] — id is non‑enumerable
```

**Notes:**

* Use `Object.create(null)` for a pure dictionary free of prototype keys (no `.toString`).
* Property descriptors control `writable`, `configurable`, `enumerable`, or getter/setter behavior.

---

## 4. `Array`

**Creation:**

```js
const a = [];                       // literal
const b = new Array(5);             // holes: length 5
const c = Array.of(1,2,3);
const d = Array.from('abc');        // ['a','b','c']
const e = [...someIterable];        // spread
```

**Key properties & methods:**

* `.length` — the number of elements (mutable)
* Mutating methods: `push`, `pop`, `shift`, `unshift`, `splice`, `fill`, `copyWithin`, `reverse`, `sort` (in‑place)
* Non‑mutating methods: `slice`, `concat`, `map`, `filter`, `reduce`, `reduceRight`, `flat`, `flatMap`, `join`, `indexOf`, `includes`, `find`, `findIndex`, `forEach`, `every`, `some`
* Iteration: `entries()`, `keys()`, `values()`, `@@iterator` (so `for...of` works)
* `Array.isArray(value)` — test

**Examples:**

```js
const nums = [1,2,3];
nums.push(4); // [1,2,3,4]
const doubled = nums.map(n => n*2); // [2,4,6,8]
```

**Notes:**

* Arrays are objects with numeric keys; `length` updates automatically when setting `arr[10]=x`.
* Beware `new Array(3)` creates an array with 3 empty slots (not `undefined` values) which affects some methods.

---

## 5. `Function`

Functions are callable objects.

**Creation:**

```js
function foo(a,b) { return a+b; }        // declaration
const bar = function(a,b) { return a+b; } // expression
const arrow = (a,b) => a+b;               // arrow function
const ctor = new Function('a','b','return a+b;'); // Function constructor (rare)
```

**Important properties & methods:**

* `.length` — number of declared parameters
* `.name` — function name
* `.prototype` — for functions intended as constructors (not present on arrow functions)
* `.call(thisArg, ...args)` — invoke with explicit `this`
* `.apply(thisArg, argsArray)` — invoke with args array
* `.bind(thisArg, ...boundArgs)` — returns new function with `this` bound
* `toString()` — source (not reliable for logic)

**Notes:**

* Arrow functions have lexical `this`, no `arguments` object, and can't be constructors.
* `bind` creates a wrapper function; `.length` and `.name` may be altered.

---

## 6. `Date`

**Creation:**

```js
new Date();
new Date(2020, 0, 1);          // year, monthIndex (0 = Jan), day
new Date('2020-01-01T00:00:00Z');
Date.now();                    // ms since epoch
```

**Important methods:**

* `getTime()`, `valueOf()` — ms since epoch
* `getFullYear(), getMonth(), getDate(), getDay(), getHours(), getMinutes(), getSeconds(), getMilliseconds()`
* `setFullYear(), setMonth(), setDate(), setTime(), ...`
* `toISOString(), toUTCString(), toLocaleString(), toDateString(), toTimeString()`

**Notes:**

* `Date` has many locale and timezone considerations — prefer ISO strings or libraries for complex handling.

---

## 7. `RegExp`

**Creation:**

```js
const r1 = /ab+c/gi;
const r2 = new RegExp('ab+c', 'gi');
```

**Properties & methods:**

* `regex.test(str)` — boolean if matched
* `regex.exec(str)` — returns match array (with capture groups) and sets `lastIndex` for global/sticky matches
* `r.source` — pattern string
* `r.flags` — e.g. `'gim'`
* `r.lastIndex` — position for next search when `g` or `y` flags used
* String methods using regex: `str.match`, `str.replace`, `str.split`, `str.search`

**Notes:**

* With the `g` flag, `exec` will advance `lastIndex` — be careful when reusing the same `RegExp` instance.

---

## 8. `Map` and `Set`

**Map** — key→value mapping (keys can be objects):

```js
const m = new Map([[k1, v1], [k2, v2]]);
m.set(key, value);
m.get(key);
m.has(key);
m.delete(key);
// iteration
for (const [k,v] of m) { }
// properties
m.size;
```

**Set** — collection of unique values:

```js
const s = new Set([1,2,3]);
s.add(1); s.has(2); s.delete(3);
s.size;
for (const x of s) { }
```

**Methods (common):** `forEach`, `entries`, `keys`, `values`, `clear`, spread (`[...m]` or `...s`).

**Notes:**

* `Map` preserves insertion order and allows non‑string/object keys freely.

---

## 9. `WeakMap` and `WeakSet`

* **WeakMap** keys must be objects. Entries are weakly referenced and do not prevent garbage collection. API: `set`, `get`, `has`, `delete`. No `.size`, not iterable.
* **WeakSet** works similarly for values (must be objects). Methods: `add`, `has`, `delete`.

**Use cases:**

* Attach metadata to objects without preventing GC (e.g., caching per object).

**Caveats:**

* Cannot enumerate; intended for internal bookkeeping only.

---

## 10. `Promise`

**Creation:**

```js
const p = new Promise((resolve, reject) => {
  // async work
  if (ok) resolve(value);
  else reject(err);
});

Promise.resolve(42);
Promise.reject(new Error('no'));
```

**Instance methods:**

* `p.then(onFulfilled, onRejected)` — chain
* `p.catch(onRejected)` — sugar for `.then(null, onRejected)`
* `p.finally(onFinally)` — runs regardless of outcome

**Static helpers:** `Promise.all`, `Promise.race`, `Promise.allSettled`, `Promise.any`, `Promise.resolve`, `Promise.reject`.

**Notes:**

* Promises represent eventual results; states are `pending` → `fulfilled` or `rejected`.
* Use `async/await` for clearer async flows; it’s built on Promises.

---

## 11. Iterators, Generators & Iterable protocol

**Iterable protocol:** an object is iterable if it implements `[Symbol.iterator]()` returning an iterator.
**Iterator protocol:** iterator has `next()` returning `{ value, done }`.

**Generators:**

```js
function* gen() {
  yield 1;
  yield 2;
}
const g = gen();
g.next(); // { value: 1, done: false }
```

Generators implement both iterator and iterable interfaces and provide `return()` and `throw()` for advanced control.

**Use:** `for...of`, spread `[...]`, destructuring with iterables.

---

## 12. `ArrayBuffer`, TypedArrays and `DataView`

Used for binary data and manipulating bytes.

**Creation:**

```js
const buf = new ArrayBuffer(16);          // raw bytes
const u8 = new Uint8Array(buf);           // typed view
const view = new DataView(buf);           // flexible endianness reads/writes
```

**TypedArray methods/properties:** `.length`, `.byteLength`, `.byteOffset`, `.buffer`, `.set()`, `.subarray()`.

**Notes:**

* Useful for Web APIs (WebSockets, WebGL, file I/O), binary protocols.

---

## 13. `Error` objects

**Creation:** `new Error(message)`, or specific errors like `new TypeError`, `new RangeError`.
**Properties:** `.name` (constructor name), `.message`, `.stack` (engine dependent). Use `throw` to raise errors.

---

## 14. `Proxy` and `Reflect`

**Proxy** wraps a target and intercepts operations via traps (handler):

```js
const p = new Proxy(target, {
  get(target, prop, receiver) { /* trap */ }
});
```

Common traps: `get`, `set`, `has`, `ownKeys`, `getOwnPropertyDescriptor`, `defineProperty`, `deleteProperty`, `apply` (call), `construct` (new).

**Reflect** provides methods that mirror internal operations (`Reflect.get`, `Reflect.set`, `Reflect.construct`) and are useful inside traps to forward behavior.

**Use cases:** logging, validation, virtual properties, revocable proxies.

---

## 15. JSON helper object

* `JSON.stringify(value[, replacer, space])` — convert to string
* `JSON.parse(text[, reviver])` — convert to value

**Notes:**

* Only enumerable string keys and primitives are serialized; functions and symbols are ignored.

---

## 16. Cloning, copying, equality — common pitfalls

* **Shallow copy:** `Object.assign({}, obj)` or `{ ...obj }` — copies top level only.
* **Deep copy:** `structuredClone(obj)` (modern), or `JSON.parse(JSON.stringify(obj))` (loses functions, Dates, `undefined`, symbols), or libraries (lodash `cloneDeep`).
* **Array copy:** `arr.slice()`, `[...arr]` for shallow copy.
* **Equality:** `===` compares reference for objects. For deep equality you need recursive comparison.

**Example of reference behavior:**

```js
const o = { x: 1 };
const a = [o];
a[0].x = 2;
console.log(o.x); // 2 — same object referenced
```

---

## 17. Tips, performance notes and gotchas

* Prefer object and array literals for readability and performance.
* Avoid using `new Object()`, `new Array()` without a clear reason.
* For maps keyed by objects, use `Map` rather than object string keys.
* `WeakMap`/`WeakSet` cannot be iterated — they’re for memory‑sensitive caches.
* Prefer `const` for references that won’t be reassigned (mutating the object’s content is still allowed).
* Beware of enumerable prototype properties affecting `for...in` loops — use `Object.prototype.hasOwnProperty` or `Object.keys`.
* Use `structuredClone` (when available) for proper deep cloning of many built‑in types.

---


