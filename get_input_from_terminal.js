process.stdin.setEncoding('utf8');

console.log("Enter your name:");

// Listen for user input
process.stdin.on('data', function (input) {
  const name = input.trim();  // remove newline
  console.log(`Hello, ${name}!`);
  process.exit(); // End the process
});

