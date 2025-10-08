const EventEmitter  = require("events");

class ChatApp extends EventEmitter{
  constructor(){
    super();
    this.users = new Map();
  }
  login(username){
    if( this.users.has(username) ){
      console.log(`${username} is already logged in`);
      return;
    }
    this.users.set(username, true);
    this.currentUser = username;
    this.emit("login", username);
  }

  logout(username){
    if( !this.users.has(username) ){
      console.log(`${username} is not logged in`);
      return;
    }
    this.users.delete(username);
    this.emit("logout", username);
  }

  sendMessage(username, message){
    if( !this.users.has(username) ){
      console.log(`${username} is not logged in. Please login to send messages.`);
      return;
    }
    this.emit("message", username, message);
  }
}

module.exports = ChatApp;