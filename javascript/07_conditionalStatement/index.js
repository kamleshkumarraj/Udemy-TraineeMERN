// first we perform implicit and explicit type conversion.
let a = "5";
let b = 10;
console.log(a + b); // implicit type conversion
console.log(Number(a) + b); // explicit type conversion
console.log(String(b) + a); // explicit type conversion
console.log(a * b); // implicit type conversion
console.log(a / b); // implicit type conversion
console.log(a - b); // implicit type conversion

// conditional statements
// if-else
let age = 18;
if (age >= 18) {
  console.log("You are eligible to vote.");
} else {
  console.log("You are not eligible to vote.");
}

// if-else inside if-else
let num = 0;
if (num > 0) {
  console.log("Positive number");
} else if (num < 0) {
  console.log("Negative number");
} else {
  console.log("Zero");
}



// if-else if ladder
let marksObtained = 85;
if (marksObtained >= 90) {
  console.log("A grade");
} else if (marksObtained >= 80) {
  console.log("B grade");
} else if (marksObtained >= 70) {
  console.log("C grade");
} else {
  console.log("Fail");
}

// switch-case
let day = 3;
switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Invalid day");
}

// ternary operator
let marks = 85;
let result = marks >= 40 ? "Pass" : "Fail";
console.log(result);

// nested ternary operator
let score = 75;
let grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";
console.log(grade);

// switch-case with string
let fruit = "apple";
switch (fruit) {
  case "apple":
    console.log("Red");
    break;
  case "banana":
    console.log("Yellow");
    break;
  default:
    console.log("Unknown fruit");
}


//output

/*
510
15
105
50
0.5
-5
You are eligible to vote.
Zero
B grade
Wednesday
Pass
C
Red
*/