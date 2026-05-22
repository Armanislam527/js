const logEvents = require("./logEvent");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmmiter = new MyEmitter();
myEmmiter.on("log", (msg) => logEvents(msg));
setTimeout(() => {
	myEmmiter.emit("log", "Log event emitted!");
}, 2000);
