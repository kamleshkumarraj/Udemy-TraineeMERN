// here we will perform some operations on function higher order function and callback.

// higher order function
let arr = [1, 2, 3, 4, 5];

// first we explain about map function
let mappedArr = arr.map(function (num) {
  return num * 2;
});
console.log(mappedArr);

// filter function
let filteredArr = arr.filter(function (num) {
  return num % 2 === 0;
});

console.log(filteredArr);

// reduce function
let reducedArr = arr.reduce(function (acc, num) {
  return acc + num;
}, 0);
console.log(reducedArr);

// find function
let foundNum = arr.find(function (num) {
  return num > 3;
});
console.log(foundNum);

// findIndex function
let foundIndex = arr.findIndex(function (num) {
  return num > 3;
});

console.log(foundIndex);

// function as a callback.
function performOperation(num1, num2, operation) {
  return operation(num1, num2);
}

let result = performOperation(2, 3, function (a, b) {
  return a + b;
})

console.log(result); // 5

// arrow function as a callback
let result2 = performOperation(2, 3, (a, b) => a * b);
console.log(result2); // 6

// function returning function
function outerFunction() {
  return function innerFunction() {
    return "Hello from inner function";
  };
}

let innerFunc = outerFunction();
console.log(innerFunc());

//output.

/***
[ 2, 4, 6, 8, 10 ]
[ 2, 4 ]
15
4
3
5
6
Hello from inner function
*/



// Write a function that takes a number and returns the sum of its digits using a nested helper function.

function sumOfDigits(num) {
  function helper(n) {
    if (n === 0) return 0;
    return (n % 10) + helper(Math.floor(n / 10));
  }
  return helper(num);
}

console.log(sumOfDigits(1234)); // 10

// Create a function that checks whether a string is a palindrome using a nested function.

function isPalindrome(str) {
  function checkPalindrome(s, start, end) {
    if (start >= end) return true;
    if (s[start] !== s[end]) return false;
    return checkPalindrome(s, start + 1, end - 1);
  }
  return checkPalindrome(str, 0, str.length - 1);
}

console.log(isPalindrome("racecar")); // true

// Write a higher-order function that takes two numbers and an operation function (like add, subtract).

function calculator(num1, num2, operation) {
  return operation(num1, num2);
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

console.log(calculator(2, 3, add)); // 5
console.log(calculator(2, 3, subtract)); // -1


// Compute factorial using recursion with nested functions.
function factorial(n) {
  function factHelper(num) {
    if (num === 0 || num === 1) return 1;
    return num * factHelper(num - 1);
  }
  return factHelper(n);
}

console.log(factorial(5)); // 120

// Create a function repeat(fn, times) that executes another function multiple times.

function repeat(fn, times) {
  for (let i = 0; i < times; i++) fn();
}

repeat(() => console.log("Hello World"), 3);


// Use nested functions to count vowels in a string.

function countVowels(str) {
  const vowels = 'aeiou';
  function isVowel(ch) {
    return vowels.includes(ch.toLowerCase());
  }
  return str.split('').filter(isVowel).length;
}

console.log(countVowels('Kamlesh')); // 2


