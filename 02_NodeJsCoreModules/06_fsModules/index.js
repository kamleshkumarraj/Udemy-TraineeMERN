import fs from 'node:fs/promises'

// creating a file inside public folder and write content..
// working with file
// await fs.writeFile('public/hello.txt', 'Hello World from Node Js')
// console.log('File created');

// now we append content inside the file.
// await fs.appendFile('public/hello.txt', '\nWelcome to Node Js');
// console.log('File updated');

// now we read the file content
// const data = await fs.readFile('public/hello.txt', 'utf-8');
// console.log(data);
// now we rename the file
// await fs.rename('public/hello.txt', 'public/greet.txt');
// console.log('File renamed');

// check status for file.
const stat = await fs.stat('public/greet.txt');
console.log(stat.isDirectory());
console.log(stat.isFile());
console.log(stat.size);
console.log(stat.birthtime);

// output
// false
// true
// 43
// 2025-10-08T08:58:57.613Z

// now we working with directory
// create directory
// await fs.mkdir('assets');
// console.log('Directory created');

// remove directory
// await fs.rmdir('assets');
// console.log('Directory removed');

// create nested directory
// await fs.mkdir('assets/images/icons', { recursive: true });
// console.log('Nested Directory created');

//get all file and folder inside a directory
const dir = await fs.readdir('public');
console.log(dir); // [ 'greet.txt' ]
// output
// [ 'greet.txt' ]