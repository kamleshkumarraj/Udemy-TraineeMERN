// Print Numbers from 1 to N
let N = 10;
for (let i = 1; i <= N; i++) {
  console.log(i);
}

// Sum of N Natural Numbers
let N1 = 10;
let sum = 0;
for (let i = 1; i <= N1; i++) {
  sum += i;
}
console.log(sum);

// Print Multiplication Table of a Given Number
let num = 7;
for (let i = 1; i <= 10; i++) {
  console.log(`${num} * ${i} = ${num * i}`);
}

// factorial of a number
let number = 5;
let factorial = 1;
for (let i = 1; i <= number; i++) {
  factorial *= i;
}
console.log(factorial);

// Fibonacci Series up to N terms
let terms = 10;
let a = 0, b = 1;
console.log(a);
console.log(b);
for (let i = 2; i < terms; i++) {
  let c = a + b;
  console.log(c);
  a = b;
  b = c;
}

// Check if a Number is Prime
let num1 = 29;
let isPrime = true;
for (let i = 2; i < num1; i++) {
  if (num1 % i === 0) {
    isPrime = false;
    break;
  }
}
if (isPrime) {
  console.log(`${num1} is a prime number`);
} else {
  console.log(`${num1} is not a prime number`);
}

// Reverse a Number
let numberToReverse = 12345;
let reversedNumber = 0;
while (numberToReverse > 0) {
  let remainder = numberToReverse % 10;
  reversedNumber = reversedNumber * 10 + remainder;
  numberToReverse = Math.floor(numberToReverse / 10);
}
console.log(reversedNumber);

// Find the GCD of Two Numbers
let a1 = 56, b1 = 98;
let gcd = 1;
for (let i = 1; i <= Math.min(a1, b1); i++) {
  if (a1 % i === 0 && b1 % i === 0) {
    gcd = i;
  }
}
console.log(gcd);

// Find the LCM of Two Numbers
let a2 = 4, b2 = 5;
let lcm = (a2 * b2) / gcd;
console.log(lcm);

// Check if a Number is Armstrong
let num2 = 153;
let sumOfCubes = 0;
let temp = num2;
while (temp > 0) {
  let remainder = temp % 10;
  sumOfCubes += remainder * remainder * remainder;
  temp = Math.floor(temp / 10);
}
if (sumOfCubes === num2) {
  console.log(`${num2} is an Armstrong number`);
} else {
  console.log(`${num2} is not an Armstrong number`);
}

// Print the Digits of a Number in Reverse Order
let numberToReverse1 = 12345;
let reversedNumber1 = 0;
while (numberToReverse1 > 0) {
  let remainder = numberToReverse1 % 10;
  reversedNumber1 = reversedNumber1 * 10 + remainder;
  numberToReverse1 = Math.floor(numberToReverse1 / 10);
}
console.log(reversedNumber1);

// Palindrome Number
let numberToCheck = 121;
let temp1 = numberToCheck;
let reversedNumber2 = 0;
while (temp1 > 0) {
  let remainder = temp1 % 10;
  reversedNumber2 = reversedNumber2 * 10 + remainder;
  temp1 = Math.floor(temp1 / 10);
}
if (reversedNumber2 === numberToCheck) {
  console.log(`${numberToCheck} is a palindrome number`);
} else {
  console.log(`${numberToCheck} is not a palindrome number`);
}

// Count the Number of Digits in a Number
let numberToCount = 12345;
let count = 0;
while (numberToCount > 0) {
  numberToCount = Math.floor(numberToCount / 10);
  count++;
}
console.log(count);

// Sum of the Digits of a Number
let numberToSum = 12345;
let sumOfDigits = 0;
while (numberToSum > 0) {
  let remainder = numberToSum % 10;
  sumOfDigits += remainder;
  numberToSum = Math.floor(numberToSum / 10);
}
console.log(sumOfDigits);

// Find the Largest Digit in a Number
let numberToFindLargest = 54321;
let largestDigit = 0;
while (numberToFindLargest > 0) {
  let remainder = numberToFindLargest % 10;
  if (remainder > largestDigit) {
    largestDigit = remainder;
  }
  numberToFindLargest = Math.floor(numberToFindLargest / 10);
}
console.log(largestDigit);

// Find the Smallest Digit in a Number
let numberToFindSmallest = 54321;
let smallestDigit = 9;
while (numberToFindSmallest > 0) {
  let remainder = numberToFindSmallest % 10;
  if (remainder < smallestDigit) {
    smallestDigit = remainder;
  }
  numberToFindSmallest = Math.floor(numberToFindSmallest / 10);
}
console.log(smallestDigit);

// Print the Factors of a Number
let numberToFactor = 28;
console.log(`Factors of ${numberToFactor} are:`);
for (let i = 1; i <= numberToFactor; i++) {
  if (numberToFactor % i === 0) {
    console.log(i);
  }
}

// Product of Digits of a Number
let numberToMultiply = 1234;
let productOfDigits = 1;
while (numberToMultiply > 0) {
  let remainder = numberToMultiply % 10;
  productOfDigits *= remainder;
  numberToMultiply = Math.floor(numberToMultiply / 10);
}
console.log(productOfDigits);

// Print the ASCII Values of Characters from 'A' to 'Z'
for (let i = 65; i <= 90; i++) {
  console.log(`ASCII value of ${String.fromCharCode(i)} is ${i}`);
}

// Print the Sum of Even and Odd Numbers from 1 to N
let N2 = 10;
let sumEven = 0, sumOdd = 0;  
for (let i = 1; i <= N2; i++) {
  if (i % 2 === 0) {
    sumEven += i;
  } else {
    sumOdd += i;
  }
}
console.log(`Sum of even numbers from 1 to ${N2} is ${sumEven}`);
console.log(`Sum of odd numbers from 1 to ${N2} is ${sumOdd}`);


// Find Power without Math.pow()
let base = 2;
let exponent = 5;
let result = 1;
for (let i = 0; i < exponent; i++) {
  result *= base;
}
console.log(result);  