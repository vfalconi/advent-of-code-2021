const { input, example, solutions } = require('./puzzle-input');
const Puzzle = require('../Puzzle');

solutions.a = (notes) => {
	//const digitTemplates = [ 6,2,5,5,4,5,6,3,7,6 ];
	const digitCounts = {};
	const measurements = notes.map(note => {
		const [ signal, output ] = note.split(' | ').map(e => e.split(' '));
		return { signal, output };
	});

	measurements.forEach(measurement => {
		measurement.output.forEach(digit => {
			if (digitCounts[digit.length] === undefined) digitCounts[digit.length] = 0;
			digitCounts[digit.length]++;
		});
	});

	return digitCounts[2] + digitCounts[3] + digitCounts[4] + digitCounts[7];
};

solutions.b = () => {
};

module.exports = { ...new Puzzle(input, example, solutions) };
