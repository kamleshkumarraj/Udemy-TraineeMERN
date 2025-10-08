# Node.js FS (File System) Module - Complete Guide

## Introduction

The **File System (`fs`) module** in Node.js allows developers to interact with the operating system's file system. It provides functionalities to **read, write, update, delete, rename, and manage files and directories**.

The module supports both **synchronous (blocking)** and **asynchronous (non-blocking)** operations, making it flexible for different application needs.

## Importing the FS Module

### CommonJS

```js
const fs = require('fs');
const path = require('path');
```

### ES Modules

```js
import fs from 'fs';
import path from 'path';
```

## Path Management

Using the `path` module ensures cross-platform compatibility.

```js
const filePath = path.join(__dirname, 'data', 'example.txt');
console.log(filePath);
```

| Method          | Description                   |
| --------------- | ----------------------------- |
| path.join()     | Joins path segments correctly |
| path.resolve()  | Returns absolute path         |
| path.basename() | Returns the filename          |
| path.extname()  | Returns file extension        |
| path.dirname()  | Returns directory name        |

## Reading Files

### Asynchronous

```js
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### Synchronous

```js
const data = fs.readFileSync(filePath, 'utf8');
console.log(data);
```

## Writing Files

### Asynchronous

```js
fs.writeFile(filePath, 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('File written successfully');
});
```

### Synchronous

```js
fs.writeFileSync(filePath, 'Hello Node.js Sync');
```

### Append Data

```js
fs.appendFile(filePath, '\nAppended line', (err) => {
  if (err) throw err;
  console.log('Data appended');
});
```

## Updating Files

```js
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err;
  const updated = data.replace('old', 'new');
  fs.writeFile(filePath, updated, (err) => {
    if (err) throw err;
    console.log('File updated');
  });
});
```

## Deleting Files

### Asynchronous

```js
fs.unlink(filePath, (err) => {
  if (err) throw err;
  console.log('File deleted');
});
```

### Synchronous

```js
fs.unlinkSync(filePath);
```

## Renaming Files

```js
fs.rename('oldName.txt', 'newName.txt', (err) => {
  if (err) throw err;
  console.log('File renamed');
});
```

## File Status

```js
fs.stat(filePath, (err, stats) => {
  if (err) throw err;
  console.log(stats);
  console.log(`Is file? ${stats.isFile()}`);
  console.log(`Is directory? ${stats.isDirectory()}`);
});
```

## Directory Operations

### Create Directory

```js
fs.mkdir('myFolder', (err) => {
  if (err) throw err;
  console.log('Directory created');
});
```

### Create Nested Directories

```js
fs.mkdir('parent/child', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('Nested directories created');
});
```

### Read Directory

```js
fs.readdir('.', (err, files) => {
  if (err) throw err;
  console.log('Files:', files);
});
```

### Remove Directory

```js
fs.rmdir('myFolder', (err) => {
  if (err) throw err;
  console.log('Directory removed');
});
```

### Remove Directory Recursively

```js
fs.rm('parent', { recursive: true, force: true }, (err) => {
  if (err) throw err;
  console.log('Recursive directory removed');
});
```

## File Streams

### Read Stream

```js
const readStream = fs.createReadStream(filePath, 'utf8');
readStream.on('data', (chunk) => {
  console.log('Chunk:', chunk);
});
```

### Write Stream

```js
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Streaming data');
writeStream.end();
```

### Pipe Stream

```js
const rs = fs.createReadStream('input.txt');
const ws = fs.createWriteStream('output.txt');
rs.pipe(ws);
```

## Watching File Changes

```js
fs.watch('example.txt', (eventType, filename) => {
  console.log(`File changed: ${filename} (${eventType})`);
});
```

## Using FS with EJS

```js
import express from 'express';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const app = express();
const filePath = path.join(__dirname, 'views', 'home.ejs');

app.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    const html = ejs.render(data, { name: 'Kamlesh' });
    res.send(html);
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

**home.ejs:**

```ejs
<!DOCTYPE html>
<html>
  <head><title>Welcome</title></head>
  <body>
    <h1>Hello <%= name %>!</h1>
  </body>
</html>
```

## Summary Table

| Operation  | Method                              |
| ---------- | ----------------------------------- |
| Read file  | readFile, readFileSync              |
| Write file | writeFile, writeFileSync            |
| Append     | appendFile, appendFileSync          |
| Delete     | unlink, unlinkSync                  |
| Rename     | rename, renameSync                  |
| Directory  | mkdir, readdir, rmdir, rm           |
| Streams    | createReadStream, createWriteStream |
| Stats      | stat                                |
| Watch      | watch                               |

## Conclusion

The `fs` module is essential for Node.js applications that need file system access. Combining it with the `path` module and EJS templates allows for robust file and template management.

Always prefer asynchronous methods for better performance in production environments.
