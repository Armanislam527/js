console.log("Hello, World!");
console.log("Welcome to Node.js development.");
// console.log(global);
const os = require("os");
/* console.log("Operating System Info:");
console.log("Platform:", os.platform());
console.log("OS Type:", os.type());
console.log("OS Release:", os.release());
console.log("Hostname:", os.hostname());
console.log("OS Version:", os.version());
console.log("OS User Info:", os.userInfo());
console.log("OS Load Average:", os.loadavg());
console.log("CPU Cores:", os.cpus().length);
console.log("CPU Model:", os.cpus()[0].model);
console.log("CPU Speed:", os.cpus()[0].speed);
console.log("CPU Cache Size:", os.cpus()[0].cacheSize);
console.log("CPU Endianness:", os.endianness());
console.log("CPU Architecture:", os.arch());
console.log("Total Memory:", os.totalmem());
console.log("Used Memory:", os.totalmem() - os.freemem());
console.log("Free Memory:", os.freemem());
console.log("Home Directory:", os.homedir());
console.log("Temporary Directory:", os.tmpdir());
console.log("Uptime (seconds):", os.uptime());
console.log("Network Interfaces:", os.networkInterfaces());
console.log("Directory Name:", __dirname);
console.log("File Name:", __filename);
console.log("Node.js Version:", process.version);
console.log("Node.js Platform:", process.platform);
console.log("Node.js Architecture:", process.arch);
console.log("Node.js Current Working Directory:", process.cwd());
console.log("Node.js Process ID:", process.pid);
console.log("Node.js Environment Variables:", process.env);
console.log("Node.js Memory Usage:", process.memoryUsage());
console.log("Node.js CPU Usage:", process.cpuUsage());
console.log("Node.js Uptime (seconds):", process.uptime());
console.log("Node.js Executable Path:", process.execPath);
console.log("Node.js Current Working Directory:", process.cwd());
console.log("Node.js Version:", process.version);
console.log("Node.js Platform:", process.platform);
console.log("Node.js Architecture:", process.arch);
console.log("Node.js Process ID:", process.pid);
console.log("Node.js Environment Variables:", process.env);
console.log("Node.js Memory Usage:", process.memoryUsage());
console.log("Node.js CPU Usage:", process.cpuUsage());
console.log("Node.js Uptime (seconds):", process.uptime());
console.log("Node.js Executable Path:", process.execPath); 

const fs = require("fs");
const path = require("path");

// Define the file path
const filePath = path.join(__dirname, "example.txt");

// Write to a file
fs.writeFile(
	filePath,
	"Hello, this is a sample text file created using Node.js! by Arman Islam Runner",
	(err) => {
		if (err) {
			return console.error("Error writing to file:", err);
		}
		console.log("File written successfully!");
		// Read the file content
		fs.readFile(filePath, "utf8", (err, data) => {
			if (err) {
				return console.error("Error reading file:", err);
			}
			console.log("File content:", data);
		});
	},
);

const { add, sub, mul, div, mod, pow, sqrt, log } = require("./math");
console.log("Addition:", add(5, 3));
console.log("Subtraction:", sub(5, 3));
console.log("Multiplication:", mul(5, 3));
console.log("Division:", div(5, 3));
console.log("Modulus:", mod(5, 3));
console.log("Power:", pow(5, 3));
console.log("Square Root:", sqrt(25));
console.log("Logarithm:", log(10));
const data = fs.readFile(filePath, "utf8", (err, data) => {
	if (err) throw err;
	console.log(data);
});
fs.writeFile(path.join(__dirname, "reply.txt"), "Hello, World!", (err) => {
	if (err) throw err;
	console.log("File saved!");
});
fs.appendFile(
	path.join(__dirname, "test.txt"),
	"here is appending line per execution\n",
	(err) => {
		if (err) throw err;
		console.log("File appended!");
	},
);

process.on("uncaughtException", (err) => {
	console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
	console.error("Unhandled Rejection at:", promise, "reason:", reason);
	process.exit(1);
});
*/
const EventEmitter = require("events");
const logEvents = require("./logEvent");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const http = require("http");
class Emitter extends EventEmitter {}
const myEmmiter = new Emitter();
const PORt = process.env.PORT || 3600;
const server = http.createServer((req, res) => {
	console.log(
		"method: " +
			req.method +
			"\n URL: " +
			req.url +
			"\n Date: " +
			new Date().toISOString() +
			"\n User-Agent: " +
			req.headers["user-agent"] +
			"\n Accept: " +
			req.headers["accept"] +
			"\n Accept-Language: " +
			req.headers["accept-language"] +
			"\n Accept-Encoding: " +
			req.headers["accept-encoding"] +
			"\n Connection: " +
			req.headers["connection"] +
			"\n Host: " +
			req.headers["host"] +
			"\n Referer: " +
			req.headers["referer"] +
			"\n Cookie: " +
			req.headers["cookie"] +
			"\n Authorization: " +
			req.headers["authorization"] +
			"\n Cache-Control: " +
			req.headers["cache-control"] +
			"\n Content-Type: " +
			req.headers["content-type"] +
			"\n Content-Length: " +
			req.headers["content-length"] +
			"\n Remote Address: " +
			req.socket.remoteAddress +
			"\n Remote Port: " +
			req.socket.remotePort +
			"\n Local Address: " +
			req.socket.localAddress +
			"\n Local Port: " +
			req.socket.localPort,
	);
	const extension = path.extname(path.parse(req.url).ext);
	let contenType;
	switch (extension) {
		case ".html":
			contenType = "text/html";
			break;
		case ".css":
			contenType = "text/css";
			break;
		case ".js":
			contenType = "text/javascript";
			break;
		case ".json":
			contenType = "application/json";
			break;
		case ".png":
			contenType = "image/png";
			break;
		case ".jpg":
			contenType = "image/jpeg";
			break;
		case ".txt":
			contenType = "text/plain";
			break;
		case ".ico":
			contenType = "image/x-icon";
			break;
		case ".pdf":
			contenType = "application/pdf";
			break;
		case ".zip":
			contenType = "application/zip";
			break;
		case ".mp4":
			contenType = "video/mp4";
			break;
		case ".mp3":
			contenType = "audio/mpeg";
			break;
		case ".wav":
			contenType = "audio/wav";
			break;
		case ".svg":
			contenType = "image/svg+xml";
			break;
		case ".woff":
			contenType = "font/woff";
			break;
		case ".woff2":
			contenType = "font/woff2";
			break;
		default:
			contenType = "text/html";
	}
	let filepath =
		extension === ".html"
			? path.join(__dirname, "views", req.url)
			: path.join(__dirname, req.url);
	if (!extension && req.url.slice(-1) !== "/") {
		filepath += ".html";
	}

	switch (req.url) {
		case "/":
			res.statusCode = 200;
			res.setHeader("Content-Type", "text/html");
			filepath = path.join(__dirname, "views", "index.htm");
			fs.readFile(filepath, (err, data) => {
				if (err) throw err;
				res.end(data);
			});
			break;
		case "/api/users":
			res.writeHead(200, { "Content-Type": "application/json" });
			res.write(
				JSON.stringify({
					name: "John Doe",
					email: "john@example.com",
				}),
			);
			res.end();
			break;
		case "/robots.txt":
			res.writeHead(200, { "Content-Type": "text/plain" });
			res.write("User-agent: *\nDisallow: /");
			res.end();
			break;
		case "/about":
			res.statusCode = 200;
			res.setHeader("Content-Type", "text/html");
			filepath = path.join(__dirname, "views", "about.html");
			fs.readFile(filepath, (err, data) => {
				if (err) throw err;
				res.end(data);
			});
			break;

		case "/contact":
			res.statusCode = 200;
			res.setHeader("Content-Type", "text/html");
			filepath = path.join(__dirname, "views", "contact.html");
			fs.readFile(filepath, (err, data) => {
				if (err) throw err;
				res.end(data);
			});
			break;
		default:
			res.writeHead(404, { "Content-Type": "text/html" });
			filepath = path.join(__dirname, "views", "page_not_found.htm");
			fs.readFile(filepath, (err, data) => {
				if (err) throw err;
				res.end(data);
			});
	}
});
server.listen(PORt, () => {
	console.log(`Server running on port ${PORt}`);
});
myEmmiter;
