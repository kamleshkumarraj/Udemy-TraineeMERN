// now we explain import export in ejs modules6

// --------------------------------------------------------------------
// for using ejs module wee have to need to add "type":"module" in package.json file

// first we perform default export and import
import VotingSystem from "./defaultexport.js";

const voter = new VotingSystem();
console.log(voter.isEligibleToVote(20));

// output
// true

// --------------------------------------------------------------------
// now we perform named export and import
import {Prime} from './namedexport.js'
const prime = new Prime();
console.log(prime.isPrime(11));
console.log(prime.isPrime(15));

// output
// true
// false
// --------------------------------------------------------------------

// now we perform both default and named export and import with node js built in module.

import fspromises from 'node:fs/promises'
let content;
try {
  content  = await fspromises.readFile('file.txt','utf-8');
} catch (error) {
  console.log(`Error reading file: ${error.message}`);
}

console.log(content);

// output
// Hey every one my name is Kamlesh Kumar.
// --------------------------------------------------------------------