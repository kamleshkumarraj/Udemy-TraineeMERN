// practical based on buffer.

const buffer = new Uint8Array(16);
let name = "Kamlesh Kumar Kushwaha"
for (let i = 0; i < buffer.length; i++) {
  buffer[i] = name.charCodeAt(i);
}
console.log(buffer);

// now we decode the buffer data to string.
const decodedName = new TextDecoder().decode(buffer);
console.log(decodedName);

// now we create buffer from string.
const buff = Buffer.from(name);
console.log(buff);
console.log(buff.toString());

// now we create buffer of specific size.
const buff1 = Buffer.alloc(10);
console.log(buff1);

// now we create buffer from existing buffer.
const buff2 = Buffer.from(buff1);
console.log(buff2);

// now we create buffer from string and specific encoding.
const buff3 = Buffer.from(name, "utf-8");
console.log(buff3);