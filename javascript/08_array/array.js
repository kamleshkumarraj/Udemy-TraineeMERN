// 10 challanges for array
// 1. Create an array of fruits and log it to the console.
let fruits = ["apple", "banana", "cherry"];
console.log(fruits);

// 2. Add a new fruit to the end of the array and log the updated array.
fruits.push("date");
console.log(fruits);

// 3. Remove the first fruit from the array and log the updated array.
fruits.shift();
console.log(fruits);

// 4. Find the index of a specific fruit in the array.
let index = fruits.indexOf("banana");
console.log(index);

// 5. Sort the array in alphabetical order.
fruits.sort();
console.log(fruits);

// 6. Reverse the order of the array.
fruits.reverse();
console.log(fruits);

// 7. Create a new array that contains only the fruits that start with the letter 'b'.
let bFruits = fruits.filter((fruit) => fruit.startsWith("b"));
console.log(bFruits);

// 8. Join all the fruits in the array into a single string, separated by commas.
let fruitString = fruits.join(", ");
console.log(fruitString);

// 9. Create a copy of the array and log it to the console.
let fruitsCopy = fruits.slice();
console.log(fruitsCopy);

// 10. Loop through the array and log each fruit to the console.
fruits.forEach((fruit) => console.log(fruit));

// method and properties available in array
console.log(fruits.length); // returns the length of the array
console.log(fruits[0]); // returns the first element of the array
console.log(fruits[fruits.length - 1]); // returns the last element of the array
console.log(fruits.at(1)); // returns the element at index 1
console.log(fruits.includes("cherry")); // returns true if the array contains "cherry"
console.log(fruits.find((fruit) => fruit === "banana")); // returns the first element that matches the condition
console.log(fruits.findIndex((fruit) => fruit === "banana")); // returns the index of the first element that matches the condition
console.log(fruits.slice(1, 3)); // returns a new array containing elements from index 1 to 2
console.log(fruits.splice(1, 1)); // removes 1 element at index 1 and returns the removed element
console.log(fruits.concat(["elderberry", "fig"])); // returns a new array by merging two or more arrays
console.log(fruits.fill("kiwi", 1, 3)); // fills elements from index 1 to 2 with "kiwi"
console.log(fruits.map((fruit) => fruit.toUpperCase())); // returns a new array with the results of calling a function on every element
console.log(fruits.filter((fruit) => fruit.startsWith("b"))); // returns a new array with all elements that pass the test implemented by the provided function  

//outputs

/*
[ 'apple', 'banana', 'cherry' ]
[ 'apple', 'banana', 'cherry', 'date' ]
[ 'banana', 'cherry', 'date' ]
0
[ 'banana', 'cherry', 'date' ]
[ 'date', 'cherry', 'banana' ]
[ 'banana' ]
date, cherry, banana
[ 'date', 'cherry', 'banana' ]
date
cherry
banana
3
date
banana
cherry
true
banana
2
[ 'cherry', 'banana' ]
[ 'cherry' ]
[ 'date', 'banana', 'elderberry', 'fig' ]
[ 'date', 'kiwi' ]
[ 'DATE', 'KIWI' ]
[]
*/