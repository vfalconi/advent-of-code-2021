const { input, example, solutions } = require('./puzzle-input');
const Puzzle = require('../Puzzle');

solutions.a = (scans) => {
	let q = 0;

	scans.forEach((scan, i) => {
		if (i > 0) {
			if (scan > scans[(i - 1)]) q++;
		}
	});

	return q;
};

solutions.b = (scans) => {
	let q = 0;
	let prevSum = 0;

	for(let i=0; scans[i+2] !== undefined; i++) {
		const windowSum = scans[i] + scans[i+1] + scans[i+2];
		if (prevSum > 0) {
			if (windowSum > prevSum) q++;
		}
		prevSum = windowSum;
	}

	return q;
};

module.exports = { ...new Puzzle(input, example, solutions) };
