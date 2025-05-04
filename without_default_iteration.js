const regularObj = {
    a: 1,
    b: 2
};

for (const value in regularObj) {
    console.log(value); // TypeError: regularObj is not iterable
}
