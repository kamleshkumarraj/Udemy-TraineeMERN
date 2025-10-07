# Loops in JavaScript

In JavaScript, **loops** are used to execute a block of code repeatedly based on a condition. Loops are essential for automating repetitive tasks, iterating over arrays or objects, and performing operations multiple times without writing duplicate code.

## 1. `for` Loop

The `for` loop is used when the number of iterations is known. It consists of **initialization**, **condition**, and **increment/decrement**.

**Syntax:**

```javascript
for(initialization; condition; increment/decrement){
    // code to execute
}
```

**Example:**

```javascript
for(let i = 0; i < 5; i++){
    console.log("Iteration number: " + i);
}
```

**Output:**

```
Iteration number: 0
Iteration number: 1
Iteration number: 2
Iteration number: 3
Iteration number: 4
```

**Notes:**

* `i` is the loop counter.
* The loop stops when the condition becomes false.
* Use `let` or `const` for block-scoped counters.

## 2. `while` Loop

The `while` loop executes a block of code **as long as a condition is true**. It is used when the number of iterations is not known beforehand.

**Syntax:**

```javascript
while(condition){
    // code to execute
}
```

**Example:**

```javascript
let i = 0;
while(i < 5){
    console.log("Iteration number: " + i);
    i++;
}
```

**Output:**

```
Iteration number: 0
Iteration number: 1
Iteration number: 2
Iteration number: 3
Iteration number: 4
```

**Notes:**

* Initialize the counter outside the loop.
* Increment inside the loop to avoid infinite loops.

## 3. `do...while` Loop

The `do...while` loop executes the block **at least once**, and then continues while the condition is true.

**Syntax:**

```javascript
do {
    // code to execute
} while(condition);
```

**Example:**

```javascript
let i = 0;
do {
    console.log("Iteration number: " + i);
    i++;
} while(i < 5);
```

**Output:**

```
Iteration number: 0
Iteration number: 1
Iteration number: 2
Iteration number: 3
Iteration number: 4
```

**Notes:**

* Code block runs at least once, even if the condition is false initially.

## 4. `for...in` Loop

The `for...in` loop is used to iterate over **object properties**.

**Syntax:**

```javascript
for(let key in object){
    // code to execute
}
```

**Example:**

```javascript
const person = {name: "Kamlesh", age: 25, city: "Gwalior"};
for(let key in person){
    console.log(key + ": " + person[key]);
}
```

**Output:**

```
name: Kamlesh
age: 25
city: Gwalior
```

## 5. `for...of` Loop

The `for...of` loop is used to iterate over **iterable objects** like arrays, strings, or maps.

**Syntax:**

```javascript
for(let value of iterable){
    // code to execute
}
```

**Example:**

```javascript
const numbers = [10, 20, 30, 40];
for(let num of numbers){
    console.log(num);
}
```

**Output:**

```
10
20
30
40
```

## 6. Loop Control Statements

* `break`: Exits the loop immediately.
* `continue`: Skips the current iteration and continues with the next iteration.

**Example:**

```javascript
for(let i = 0; i < 5; i++){
    if(i === 3) break;      // exits loop when i = 3
    if(i === 1) continue;   // skips iteration when i = 1
    console.log(i);
}
```

**Output:**

```
0
2
```

## Summary

Loops are powerful constructs in JavaScript that allow repeated execution of code. Choosing the correct loop depends on whether the number of iterations is known (`for`) or unknown (`while`, `do...while`), or whether you need to iterate over arrays or objects (`for...of`, `for...in`).
