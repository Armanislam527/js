let iterableObj = {
	[Symbol.iterator]: function () {
		let step = 0;
		return {
			next: function () {
				step++;
				if (step <= 100) {
					return { value: step, done: false };
				} else {
					return { done: true };
				}
			},
		};
	},
};

for (let value of iterableObj) {
	console.log(value); // Output: 1, 2, 3
}
