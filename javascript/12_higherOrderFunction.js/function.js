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