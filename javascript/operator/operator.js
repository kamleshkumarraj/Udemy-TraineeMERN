// here we will learn about operator in javascript


// Arithmetic Operators
let a = 10;
let b = 5;
console.log(a + b); // addition
console.log(a - b); // subtraction
console.log(a * b); // multiplication
console.log(a / b); // division
console.log(a % b); // modulus
console.log(a ** b); // exponentiation

console.log(++a); // increment
console.log(--b); // decrement

// Assignment Operators
let c = 10;
c += 5; // c = c + 5
console.log(c);
c -= 5; // c = c - 5
console.log(c);
c *= 2; // c = c * 2
console.log(c);
c /= 2; // c = c / 2
console.log(c);
c %= 3; // c = c % 3
console.log(c);

// Comparison Operators
console.log(a == b); // equal to
console.log(a != b); // not equal to
console.log(a > b); // greater than
console.log(a < b); // less than
console.log(a >= b); // greater than or equal to
console.log(a <= b); // less than or equal to 

// Logical Operators
console.log(a && b); // and
console.log(a || b); // or
console.log(!a); // not
console.log(!b); // not

// String Operators
let name = "John";
let age = 30;
console.log("My name is " + name + " and I am " + age + " years old.");

// Type Operators
console.log(typeof name); // type of
console.log(typeof age); // type of
console.log(name instanceof String);
console.log(age instanceof Number);

// Bitwise Operators
console.log(a & b); // and
console.log(a | b); // or
console.log(a ^ b); // xor
console.log(~a); // not
console.log(a << 1); // left shift
console.log(a >> 1); // right shift
console.log(a >>> 1); // zero fill right shift  

// output

/**
15
5
50
2
0
100000
11
4
15
10
20
10
1
false
true
true
false
true
false
4
11
false
false
My name is John and I am 30 years old.
string
number
false
false
0
15
15
-12
22
5
5
 */