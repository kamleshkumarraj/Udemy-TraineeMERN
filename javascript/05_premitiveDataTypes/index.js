// here we perform all operation with primitive data types and also non-primitive version for primitive data types

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

//non-primitive version for primitive data types with methods and operation
//1. Number
let numObj=new Number(42);
console.log(typeof numObj); //object
console.log(numObj.valueOf()); //42
console.log(numObj.toFixed(2)); //42.00
console.log(numObj.toString()); //42

//2. String
let strObj=new String("hello");
console.log(typeof strObj); //object
console.log(strObj.valueOf()); //hello
console.log(strObj.toUpperCase()); //HELLO
console.log(strObj.toLowerCase()); //hello
console.log(strObj.charAt(0)); //h
console.log(strObj.indexOf("e")); //1
console.log(strObj.substring(1,4)); //ell

//3. Boolean
let boolObj=new Boolean(true);
console.log(typeof boolObj); //object
console.log(boolObj.valueOf()); //true
console.log(boolObj.toString()); //true
console.log(boolObj.toString().toUpperCase()); //TRUE

//dynamic typing
let x=10;
console.log(typeof x); //number
x="hello";
console.log(typeof x); //string
x=true;
console.log(typeof x); //boolean

// output
/***
number
string
boolean
object
undefined
symbol
object
42
42.00
42
object
hello
HELLO
hello
h
1
ell
object
true
true
TRUE
number
string
boolean
*/
