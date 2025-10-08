const fs  = require('fs');


// blocking code with synchronous manner.
console.log("File reading started...");
const fileContent = fs.readFileSync("./hello.txt", 'utf-8');
console.log(fileContent.substring(0,100));

console.log("File reading completed...");

// non-blocking code with asynchronous manner.
console.log("File reading started...");
fs.readFile('./hello.txt', 'utf-8', (err, data) => {
    if(err){
        console.log(err);
    }else{
        console.log(data.substring(0,100));
    }
});
console.log("File reading completed...");