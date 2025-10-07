//here we learn about non-primitive datatypes in javascript

// objects.
// all method for creating an object.
// 1. object literal syntax
let obj1 = {
  name: "Kamlesh",
  age: 22,
  hobbies: ["coding", "gaming", "reading"],
};

// 2. using object constructor
let obj2 = new Object();
obj2.name = "Kamlesh";
obj2.age = 22;
obj2.hobbies = ["coding", "gaming", "reading"];

// 3. using Object.create() method
let obj3 = Object.create(null);
obj3.name = "Kamlesh";
obj3.age = 22;
obj3.hobbies = ["coding", "gaming", "reading"];

console.log(obj1);
console.log(obj2);
console.log(obj3);

// all way for accessing object properties.
console.log(obj1.name);
console.log(obj2["name"]);
console.log(obj3.name);

// all way for adding new properties to an object.
obj1.gender = "male";
obj2["gender"] = "male";
obj3.gender = "male";

console.log(obj1);
console.log(obj2);
console.log(obj3);

// all way for deleting properties from an object.
delete obj1.age;
delete obj2["age"];
delete obj3.age;

console.log(obj1);
console.log(obj2);
console.log(obj3);

// all way for looping through an object.
for (let key in obj1) {
  console.log(key, obj1[key]);
}

// all method avaible in object.
console.log(Object.keys(obj1));
console.log(Object.values(obj1));
console.log(Object.entries(obj1));
console.log(Object.freeze(obj1)); // it will freeze the object and we can't add, delete or modify any property of the object.
console.log(Object.seal(obj2)); // it will seal the object and we can't add or delete any property of the object but we can modify the existing properties.
console.log(Object.assign(obj3, { country: "India" })); // it will add new properties to the object.
console.log(Object.hasOwn(obj1, "name")); // it will check if the object has the specified property or not.
console.log(Object.getOwnPropertyNames(obj1)); // it will return an array of all properties (enumerable or not) found directly upon a given object.



// arrays.
let arr = ["apple", "banana", "cherry", "date"];

// all way for accessing array elements.
console.log(arr[0]);
console.log(arr.at(1));
console.log(arr.slice(2, 3)[0]);
console.log(arr.find((item) => item === "banana"));
console.log(arr.findIndex((item) => item === "banana"));
console.log(arr.includes("cherry"));

// all way for adding new elements to an array.
arr.push("elderberry"); // add at the end
arr.unshift("fig"); // add at the beginning
arr.splice(2, 0, "grape"); // add at specific index
arr.splice(arr.length - 1, 0, "kiwi"); // add at the end

// all way for deleting elements from an array.
arr.pop(); // remove last element
arr.shift(); // remove first element
arr.splice(2, 1); // remove element at specific index
arr.splice(arr.length - 1, 1); // remove last element

// all way for looping through an array.
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

for (let item of arr) {
  console.log(item);
}

arr.forEach((item) => console.log(item));

// all method avaible in array.
console.log(arr.indexOf("banana"));
console.log(arr.lastIndexOf("banana"));
console.log(arr.slice(1, 3));
console.log(arr.splice(1, 2));
console.log(arr.join(","));
console.log(arr.reverse());
console.log(arr.sort());
console.log(arr.concat(["fig", "grape"]));
console.log(arr.fill("kiwi", 1, 3));
console.log(arr.map((item) => item.toUpperCase()));
console.log(arr.filter((item) => item.startsWith("b")));

// Dates
let date = new Date();
console.log(date);
console.log(date.getFullYear());
console.log(date.getMonth());
console.log(date.getDate());
console.log(date.getHours());
console.log(date.getMinutes());
console.log(date.getSeconds());
console.log(date.getMilliseconds());
console.log(date.getTime());
console.log(date.toDateString());
console.log(date.toTimeString());
console.log(date.toISOString());


//output
/**
{
  name: 'Kamlesh',
  age: 22,
  hobbies: [ 'coding', 'gaming', 'reading' ]
}
{
  name: 'Kamlesh',
  age: 22,
  hobbies: [ 'coding', 'gaming', 'reading' ]
}
[Object: null prototype] {
  name: 'Kamlesh',
  age: 22,
  hobbies: [ 'coding', 'gaming', 'reading' ]
}
Kamlesh
Kamlesh
Kamlesh
{
  name: 'Kamlesh',
  age: 22,
  hobbies: [ 'coding', 'gaming', 'reading' ],
  gender: 'male'
}
{
  name: 'Kamlesh',
  age: 22,
  hobbies: [ 'coding', 'gaming', 'reading' ],
  gender: 'male'
}
[Object: null prototype] {
  name: 'Kamlesh',
  age: 22,
  hobbies: [ 'coding', 'gaming', 'reading' ],
  gender: 'male'
}
{
  name: 'Kamlesh',
  hobbies: [ 'coding', 'gaming', 'reading' ],
  gender: 'male'
}
{
  name: 'Kamlesh',
  hobbies: [ 'coding', 'gaming', 'reading' ],
  gender: 'male'
}
[Object: null prototype] {
  name: 'Kamlesh',
  hobbies: [ 'coding', 'gaming', 'reading' ],
  gender: 'male'
}
name Kamlesh
hobbies [ 'coding', 'gaming', 'reading' ]
gender male
[ 'name', 'hobbies', 'gender' ]
[ 'Kamlesh', [ 'coding', 'gaming', 'reading' ], 'male' ]
[
  [ 'name', 'Kamlesh' ],
  [ 'hobbies', [ 'coding', 'gaming', 'reading' ] ],
  [ 'gender', 'male' ]
]
{
  name: 'Kamlesh',
  hobbies: [ 'coding', 'gaming', 'reading' ],
  gender: 'male'
}
{
  name: 'Kamlesh',
  hobbies: [ 'coding', 'gaming', 'reading' ],
  gender: 'male'
}
[Object: null prototype] {
  name: 'Kamlesh',
  hobbies: [ 'coding', 'gaming', 'reading' ],
  gender: 'male',
  country: 'India'
}
true
[ 'name', 'hobbies', 'gender' ]
apple
banana
cherry
banana
1
true
apple
grape
cherry
date
apple
grape
cherry
date
apple
grape
cherry
date
-1
-1
[ 'grape', 'cherry' ]
[ 'grape', 'cherry' ]
apple,date
[ 'date', 'apple' ]
[ 'apple', 'date' ]
[ 'apple', 'date', 'fig', 'grape' ]
[ 'apple', 'kiwi' ]
[ 'APPLE', 'KIWI' ]
[]
2025-10-07T01:32:56.832Z
2025
9
7
7
2
56
832
1759800776832
Tue Oct 07 2025
07:02:56 GMT+0530 (India Standard Time)
2025-10-07T01:32:56.832Z
*/