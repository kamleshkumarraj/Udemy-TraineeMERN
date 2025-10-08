const ChatApp = require("./event");

const chatApp = new ChatApp();

chatApp.on("login", (username) => {
  console.log(`${username} has logged in`);
})

chatApp.on("logout", (username) => {
  console.log(`${username} has logged out`);
})

chatApp.on("sendMessage", (receiverName, username, message) => {
  console.log(`${receiverName} send message to ${username}: ${message}`);
})

chatApp.login("Kamlesh");
chatApp.login("Shyam");

chatApp.sendMessage("kamlesh","Shyam", "Hello Shyam, How are you?");
chatApp.sendMessage("shyam","Kamlesh", "Hello Kamlesh, How are you?");