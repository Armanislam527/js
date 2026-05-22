const add = (a, b) => {
	return a + b;
};
const sub = (a, b) => {
	return a - b;
};
const mul = (a, b) => {
	return a * b;
};
const div = (a, b) => {
	if (b == 0) {
		return "Cannot divide by zero";
	}
	return a / b;
};
const mod = (a, b) => {
	if (b == 0) {
		return "Cannot divide by zero";
	}
	return a % b;
};
const pow = (a, b) => {
	return Math.pow(a, b);
};
const sqrt = (a) => {
	if (a < 0) {
		return "Cannot calculate square root of a negative number";
	}
	return Math.sqrt(a);
};
const log = (a) => {
	if (a <= 0) {
		return "Cannot calculate logarithm of non-positive numbers";
	}
	return Math.log(a);
};
module.exports = { add, sub, mul, div, mod, pow, sqrt, log };
/* Work in the same way as
 exports module
 exports.add = (a, b) => {
	return a + b;
};
exports.sub = (a, b) => {
	return a - b;
};
exports.mul = (a, b) => {
	return a * b;
};
exports.div = (a, b) => {
	if (b == 0) {
		return "Cannot divide by zero";
	}
	return a / b;
};
exports.mod = (a, b) => {
	if (b == 0) {
		return "Cannot divide by zero";
	}
	return a % b;
};
exports.pow = (a, b) => {
	return Math.pow(a, b);
};
exports.sqrt = (a) => {
	if (a < 0) {
		return "Cannot calculate square root of a negative number";
	}
	return Math.sqrt(a);
};
exports.log = (a) => {
	if (a <= 0) {
		return "Cannot calculate logarithm of non-positive numbers";
	}
	return Math.log(a);
};
// module.exports = { add, sub, mul, div, mod, pow, sqrt, log };
 */
