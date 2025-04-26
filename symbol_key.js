// Creating a symbol
let uniqueId = Symbol("id");

// Using the symbol as a property key in an object
let user = {
	name: "Alice",
	age: 30,
	[uniqueId]: 1234, // Symbol as a key
};

console.log(user.name); // Output: Alice
console.log(user.age); // Output: 30
// Accessing the symbol key
console.log(user[uniqueId]); // Output: 1234

// Checking if the symbol key exists in the object
console.log(Object.hasOwn(user, uniqueId)); // Output: true

// Using a string as a key
user["id"] = 5678;
console.log(user.id); // Output: 5678

// Accessing the symbol key again

console.log(user[uniqueId]); // Output: 1234

// Normal object iteration won't reveal the symbol property
for (let key in user) {
	console.log(key); // Output: name (it skips the symbol key)
}
