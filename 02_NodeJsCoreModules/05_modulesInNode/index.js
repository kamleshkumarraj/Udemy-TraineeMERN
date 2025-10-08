
// first we practice about modules in node js with common js 

// --------------------------------------------------------------------
// this import is for core module in node js
const fs = require("fs");

const fileContent = fs.readFileSync("file.txt", "utf-8");

console.log(fileContent);


// here we import the class Arithmetic from func.js file that is user created file.

const Arithmetic = require("./func");

const opr  = new Arithmetic();
console.log(opr.add(5,3));
console.log(opr.sub(5,3));
console.log(opr.mul(5,3));
console.log(opr.div(5,3));

// output
// Hey every one my name is Kamlesh Kumar.
// 8
// 2
// 15
// 1.6666666666666667

// --------------------------------------------------------------------

// now we explain import export in ejs modules6

// for using ejs module wee have to need to add "type":"module" in package.json file

