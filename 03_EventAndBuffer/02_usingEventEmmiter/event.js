// first we perform event emitter using EventEmitter class only without extends.
const EventEmitter = require('events');

const event = new EventEmitter();

event.on('greet', (username) => {
  console.log(`hey ${username} welcome to the event emitter tutorial`);
})

event.emit("greet", "Kamlesh");

// now we perform event emitter using extends.
class MyEmitter extends EventEmitter {
  greet(username){
    this.emit('greet', username);
  }
}

const myEmitter = new MyEmitter();

myEmitter.on('greet', (username) => {
  console.log(`hey ${username} welcome to the event emitter tutorial using extends`);
})

myEmitter.greet("Rohan");
