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

// now we will see more case about this context.
const obj = {
  value: 42,
  getValue: function () {
    return this.value;
  },
};
console.log(obj.getValue()); // 42

const obj2 = {
  value: 42,
  getValue: () => {
    return this.value;
  },
};
console.log(obj2.getValue()); // undefined

// function constructor
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person = new Person("John", 30);
console.log(person.name); // John

// this context when function present in array in object.
const obj3 = {
  values: [1, 2, 3],
  getValues: function () {
    return this.values.map((value) => value * 2);
  },
};
console.log(obj3.getValues()); // [2, 4, 6]

//output

/**
5
6
-1
0.6666666666666666
Hello, Guest!
Hello, John!
15
42
undefined
John
[ 2, 4, 6 ]
*/