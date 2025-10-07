// here we learn abut loops in javascript

// while loop
let num = 0;
while (num <= 10) {
  console.log(num);
  num++;
}
console.log("While loop ended");

// do while loop
let num2 = 0;
do {
  console.log(num2);
  num2++;
} while (num2 <= 10);
console.log("Do while loop ended");

// for loop
for (let i = 0; i <= 10; i++) {
  console.log(i);
}
console.log("For loop ended");

// some program around loop.
// print table of 5
let tableOf = 5;
for (let i = 1; i <= 10; i++) {
  console.log(`${tableOf} * ${i} = ${tableOf * i}`);
}

// check if a number is prime or not
let number = 13;
let isPrime = true;
for (let i = 2; i < number; i++) {
  if (number % i === 0) {
    isPrime = false;
    break;
  }
}
if (isPrime) {
  console.log(`${number} is a prime number`);
} else {
  console.log(`${number} is not a prime number`);
}

// output for this code.
/*
0
1
2
3
4
5
6
7
8
9
10
While loop ended
0
1
2
3
4
5
6
7
8
9
10
Do while loop ended
0
1
2
3
4
5
6
7
8
9
10
For loop ended
5 * 1 = 5
5 * 2 = 10
5 * 3 = 15
5 * 4 = 20
5 * 5 = 25
5 * 6 = 30
5 * 7 = 35
5 * 8 = 40
5 * 9 = 45
5 * 10 = 50
13 is a prime number
*/