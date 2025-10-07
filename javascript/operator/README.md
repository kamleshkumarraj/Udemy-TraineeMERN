# JavaScript Operators — In‑Depth

> A deep, practical README on JavaScript operators, precedence, associativity, examples, and common pitfalls.

---

# Detailed Explanation

## What is an *operator*?

An *operator* is a symbol or keyword that performs an operation on one or more operands (values, expressions, or references). Examples: `+`, `-`, `*`, `=`, `&&`, `typeof`, `?.`.

## Operator categories (overview)

* **Primary / grouping / call / member**: `()`, `[]`, `.`, `foo()`
* **Postfix unary**: `x++`, `x--`
* **Prefix unary**: `++x`, `--x`, `!x`, `typeof x`, `delete x`
* **Exponentiation**: `**` (right-to-left)
* **Multiplicative**: `*`, `/`, `%`
* **Additive**: `+`, `-` (note: `+` also concatenates strings)
* **Shift**: `<<`, `>>`, `>>>`
* **Relational**: `<`, `<=`, `>`, `>=`, `in`, `instanceof`
* **Equality**: `==`, `!=`, `===`, `!==`
* **Bitwise**: `&`, `^`, `|`
* **Logical**: `&&`, `||` and **nullish** `??`
* **Conditional (ternary)**: `cond ? a : b`
* **Assignment**: `=`, `+=`, `-=`, `**=`, etc. (right-to-left)
* **Comma**: `,` (evaluates left then right; returns the right value)
* **Other**: optional chaining `?.`, spread `...`, arrow `=>`, `await`

## Precedence and associativity — plain English

* **Precedence** decides which operators bind tighter (i.e., which operations happen first) when no parentheses are present.
* **Associativity** decides how to group operators of the *same* precedence: either **left-to-right** (L→R) or **right-to-left** (R→L).
* Use parentheses `()` to force the order you want — this is the clearest and safest option.

## Quick tips / common pitfalls

* `+` with strings: `'5' + 3` → `'53'` (string concatenation). Use `Number()` or unary `+` to force numeric conversion.
* Exponentiation is **right-associative**: `2 ** 3 ** 2` → `2 ** (3 ** 2)`.
* Assignment is **right-associative**: `a = b = 5` → `a = (b = 5)`.
* Unary operators like `typeof` bind tightly: `typeof x + 1` is `(typeof x) + 1`, not `typeof (x + 1)`.
* Short‑circuiting (`&&`, `||`, `??`, `?.`) can prevent evaluation of the right side — useful (and sometimes surprising).

---

## Precedence & Associativity Table (condensed, high→low)

> Note: this table is intentionally condensed to the most commonly used operators. Use parentheses to remove ambiguity.

| Precedence (higher → lower) | Associativity | Operators / Notes                                                                             |   |                                |
| --------------------------: | :-----------: | --------------------------------------------------------------------------------------------- | - | ------------------------------ |
|                          18 |      n/a      | **Grouping**: `( … )`                                                                         |   |                                |
|                          17 |      L→R      | Member access / call / `new` with args: `.`, `[]`, `obj()`, `new Foo()`                       |   |                                |
|                          16 |      n/a      | `new` without args: `new Foo`                                                                 |   |                                |
|                          15 |      n/a      | **Postfix**: `x++`, `x--`                                                                     |   |                                |
|                          14 |      n/a      | **Prefix / unary**: `++x`, `--x`, `!x`, `~x`, `+x`, `-x`, `typeof`, `void`, `delete`, `await` |   |                                |
|                          13 |      R→L      | **Exponentiation**: `**` (important: exponentiation is right-associative)                     |   |                                |
|                          12 |      L→R      | **Multiplicative**: `*`, `/`, `%`                                                             |   |                                |
|                          11 |      L→R      | **Additive**: `+`, `-`                                                                        |   |                                |
|                          10 |      L→R      | **Bitwise shift**: `<<`, `>>`, `>>>`                                                          |   |                                |
|                           9 |      L→R      | **Relational**: `<`, `<=`, `>`, `>=`, `in`, `instanceof`                                      |   |                                |
|                           8 |      L→R      | **Equality**: `==`, `!=`, `===`, `!==`                                                        |   |                                |
|                           7 |      L→R      | **Bitwise AND** `&`                                                                           |   |                                |
|                           6 |      L→R      | **Bitwise XOR** `^`                                                                           |   |                                |
|                           5 |      L→R      | **Bitwise OR** `                                                                              | ` |                                |
|                           4 |      L→R      | **Logical AND** `&&`                                                                          |   |                                |
|                           3 |      L→R      | **Logical OR** `                                                                              |   | `, **Nullish coalescing** `??` |
|                           2 |      R→L      | **Assignment** `=`, `+=`, `-=` … **also** `?:` (ternary) is right-to-left                     |   |                                |
|                           1 |      L→R      | **Comma** `,` (lowest precedence)                                                             |   |                                |

> If you need the full exhaustive official table (including `yield`, `import()`, `?.`, `=>`, and spread), paste the MDN Operator Precedence page into your docs.

---

## Examples (copyable)

### 1) Precedence matters: `*` before `+`

```js
console.log(3 + 4 * 5); // 23   -> 3 + (4 * 5)
```

### 2) Associativity — exponentiation (right-to-left)

```js
console.log(2 ** 3 ** 2); // 2 ** (3 ** 2) = 2 ** 9 = 512
```

### 3) Assignment is right-to-left

```js
let a, b;
a = b = 5; // b = 5 -> returns 5, then a = 5
console.log(a, b); // 5 5
```

### 4) Unary operator binding (typeof)

```js
let x = 2;
console.log(typeof x + 1); // "number1"
// Equivalent to: (typeof x) + 1  → "number" + 1 → "number1"

console.log(typeof (x + 1)); // "number"
```

### 5) Short-circuit (avoid side-effects on right)

```js
function expensive() { console.log('expensive called'); return 42; }
console.log(false && expensive()); // false  (expensive() not called)
console.log(true || expensive());  // true   (expensive() not called)
```

### 6) Optional chaining and nullish coalescing

```js
const obj = null;
console.log(obj?.a); // undefined (no TypeError)
console.log(null ?? 'fallback'); // 'fallback'
```

---

## Practical advice (for README / code style)

* **Favor explicitness**: prefer parentheses for complicated expressions. It helps readers and avoids subtle bugs.
* **Avoid mixing strings and numeric `+`** without checking types. Use template literals or explicit conversion: `` `${num}` `` or `String(num)`.
* **Use `===` and `!==`** unless you intentionally want coercion.
* **When in doubt**, log intermediate values or break an expression into named variables.

---