// we create function with different method.
// 1. function declaration
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5

// 2. function expression
const multiply = function (a, b) {
  return a * b;
};

console.log(multiply(2, 3)); // 6

// 3. arrow function
const subtract = (a, b) => a - b;
console.log(subtract(2, 3)); // -1

// 4. IIFE (Immediately Invoked Function Expression)
(function (a, b) {
  console.log(a / b); // 0.6666666666666666
})(2, 3);

// 5. function with default parameters
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}
console.log(greet()); // Hello, Guest!
console.log(greet("John")); // Hello, John!

// 6. function with rest parameters
function sum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15

