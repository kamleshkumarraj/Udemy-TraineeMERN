# JavaScript — Type Conversion & Conditional Statements (README)

> Deep guide for README files explaining implicit and explicit type conversions (coercion) in JavaScript — including numbers, strings, arrays, and objects — plus detailed coverage of conditional statements with examples and rules.

---

## Table of contents

1. Type Conversion Overview
2. Implicit Type Conversion (Type Coercion)

   * Conversion to String
   * Conversion to Number
   * Conversion to Boolean
   * Special cases with Arrays & Objects
3. Explicit Type Conversion

   * Using `Number()`, `String()`, `Boolean()`
   * Using `parseInt`, `parseFloat`, `toString`, `valueOf`
   * Conversion Rules and Edge Cases
4. Conditional Statements in JavaScript

   * `if`, `else if`, `else`
   * Nested Conditionals
   * `switch` Statement
   * Ternary (`?:`) Operator
   * Truthy/Falsy Rules in Conditions
5. Examples and Best Practices

---

## 1. Type Conversion Overview

JavaScript is a **dynamically typed** language. That means a variable’s type can change automatically based on how it’s used. Conversion between data types happens in two ways:

* **Implicit (Type Coercion):** JavaScript automatically converts one data type to another when required.
* **Explicit (Type Casting):** You manually convert a value using built‑in functions or methods.

---

## 2. Implicit Type Conversion (Type Coercion)

This occurs when JavaScript automatically converts one type to another to complete an operation.

### Conversion to String

If one operand is a **string** in a `+` operation, JavaScript converts the other operand to a string.

```js
console.log('5' + 2);     // '52'
console.log('Hello' + true); // 'Hellotrue'
console.log('Value: ' + null); // 'Value: null'
```

* Here, `+` acts as **string concatenation** when one operand is a string.

### Conversion to Number

When using arithmetic (`-`, `*`, `/`, `%`, `**`) operators, or comparison (`<`, `>`, `<=`, `>=`) operators, operands are converted to **numbers**.

```js
console.log('10' - '5'); // 5  (both converted to numbers)
console.log('10' * '2'); // 20
console.log('10' / 2);   // 5
console.log('10' - true); // 9  (true -> 1)
```

**Special cases:**

```js
console.log('10a' - 2); // NaN
console.log(null + 5);  // 5 (null -> 0)
console.log(undefined + 5); // NaN (undefined -> NaN)
```

### Conversion to Boolean

Used in conditional statements (`if`, loops) and logical operators.
**Falsy values:** `false`, `0`, `-0`, `0n`, `''`, `null`, `undefined`, `NaN`
Everything else is truthy.

```js
if ('') console.log('True'); // no output
if ('abc') console.log('True'); // 'True'
```

### Arrays & Objects in Conversion

When non‑primitives are used in expressions, they are converted using `ToPrimitive` rules:

1. Call `.valueOf()`; if primitive, use it.
2. Otherwise, call `.toString()`.

**Examples:**

```js
console.log([] + []);      // '' (both -> '')
console.log([] + {});      // '[object Object]'
console.log([1] + [2]);    // '12'
console.log({} + []);      // 0 (rare, depends on context)
```

**Detailed Rule:**

* Array → string using `join(',')`.
* Object → string `'[object Object]'` unless custom `toString` defined.

---

## 3. Explicit Type Conversion

Manual conversion is safer and clearer.

### Convert to Number

* `Number(value)` — converts a value to a number.
* `parseInt(value)` — converts a string to integer.
* `parseFloat(value)` — converts string to floating point.

```js
Number('10');    // 10
Number('10abc'); // NaN
parseInt('10abc'); // 10
parseFloat('3.14xyz'); // 3.14
Number(true); // 1
Number(false); // 0
Number(null); // 0
Number(undefined); // NaN
```

### Convert to String

* `String(value)` or `value.toString()`

```js
String(123); // '123'
String(true); // 'true'
(123).toString(); // '123'
null + ''; // 'null' (implicit but works)
```

### Convert to Boolean

* `Boolean(value)` or double NOT `!!value`

```js
Boolean(0); // false
Boolean(''); // false
Boolean('Hello'); // true
!!123; // true
!!null; // false
```

### Conversion Rules Summary Table

| Value       | To Number | To String         | To Boolean |
| ----------- | --------- | ----------------- | ---------- |
| `false`     | 0         | 'false'           | false      |
| `true`      | 1         | 'true'            | true       |
| `''`        | 0         | ''                | false      |
| `'123'`     | 123       | '123'             | true       |
| `null`      | 0         | 'null'            | false      |
| `undefined` | NaN       | 'undefined'       | false      |
| `[]`        | 0         | ''                | true       |
| `[1,2]`     | NaN       | '1,2'             | true       |
| `{}`        | NaN       | '[object Object]' | true       |

---

## 4. Conditional Statements in JavaScript

Conditional statements control the flow of a program based on conditions.

### `if` Statement

Executes a block of code if a condition is true.

```js
let age = 20;
if (age >= 18) {
  console.log('Adult');
}
```

### `if...else`

Executes one block if true, another if false.

```js
if (age >= 18) {
  console.log('Adult');
} else {
  console.log('Minor');
}
```

### `if...else if...else`

Checks multiple conditions.

```js
if (marks >= 90) {
  grade = 'A';
} else if (marks >= 75) {
  grade = 'B';
} else {
  grade = 'C';
}
```

### Nested Conditionals

You can nest `if` blocks for multiple levels of decisions.

```js
if (user) {
  if (user.isAdmin) {
    console.log('Welcome Admin');
  } else {
    console.log('Welcome User');
  }
}
```

### `switch` Statement

Used when multiple conditions depend on one value.

```js
let fruit = 'apple';
switch (fruit) {
  case 'apple':
    console.log('Red fruit');
    break;
  case 'banana':
    console.log('Yellow fruit');
    break;
  default:
    console.log('Unknown fruit');
}
```

* `break` stops execution after a match.
* `default` executes if no match.

### Ternary Operator (`?:`)

Shorthand for `if...else`.

```js
let result = (age >= 18) ? 'Adult' : 'Minor';
```

### Truthy/Falsy in Conditionals

When a non‑boolean value is used in an `if` statement, JavaScript converts it to boolean implicitly.

```js
if (0) console.log('Will not run');
if ('Hello') console.log('Will run');
```

---

## 5. Examples and Best Practices

* Always use **explicit conversion** for clarity.
* Avoid confusing coercions like `'5' + 1` → `'51'`.
* Use `===` for comparison to avoid implicit type coercion.
* Use `!!value` to quickly check truthiness.

**Example:**

```js
let input = '10';
if (Number(input) > 5) console.log('Greater than 5'); // safer explicit conversion
```

**Example with Object & Array coercion:**

```js
console.log([] == false); // true ('' -> 0 -> false)
console.log([0] == false); // true (0 -> false)
console.log({} == false); // false ('[object Object]' -> NaN)
```

---

### Summary

* Implicit conversion (coercion) happens automatically and can lead to unexpected results.
* Explicit conversion is clear and predictable.
* Conditional statements evaluate truthy/falsy values; understanding conversion rules ensures correct logic.

This README provides a complete reference to **JavaScript Type Conversion** and **Conditional Statements** suitable for inclusion in documentation or learning materials.
