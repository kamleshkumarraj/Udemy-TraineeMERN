//different way for logging in console
console.log("Hello World !");
console.info("Hello World !");
console.warn("Hello World !");
console.error("Hello World !");
console.debug("Hello World !");
console.table({name:"hello",age:23});
console.assert(4===5,"this is not true");
//single line comment
/*
multi line comment
*/

//variable declaration
var a=10;
let b=20;
const c=30;
console.log(a,b,c);

//data types in javascript
//primitive data types
//1. number
let num=42;
console.log(typeof num); //number
//2. string
let str="hello";
console.log(typeof str); //string
//3. boolean
let bool=true;
console.log(typeof bool); //boolean
//4. null
let n=null;
console.log(typeof n); //object
//5. undefined
let u;
console.log(typeof u); //undefined

//6. symbol
let sym=Symbol("id");
console.log(typeof sym); //symbol

//non-primitive data type
//1. object
let obj={name:"hello",age:23};
console.log(typeof obj); //object
//2. function
let func=function(){};
console.log(typeof func); //function

//3. array
let arr=[1,2,3,4,5];
console.log(typeof arr); //object
console.log(Array.isArray(arr)); //true

//dynamic typing
let x=10;
console.log(typeof x); //number
x="hello";
console.log(typeof x); //string
x=true;
console.log(typeof x); //boolean  
