const { input, example, solutions } = require('./puzzle-input');
const Puzzle = require('../Puzzle');

solutions.a = (instructions) => {
	const position = { x: 0, depth: 0 };

	instructions.forEach(step => {
		const [ direction, ticks ] = step.split(' ');
		if (direction === 'forward') position.x += parseInt(ticks, 10);
		if (direction === 'up') position.depth -= parseInt(ticks, 10);
		if (direction === 'down') position.depth += parseInt(ticks, 10);
	});

	return (position.x * position.depth);
};

solutions.b = (instructions) => {
	const position = { x: 0, depth: 0, aim: 0 }

	instructions.forEach(step => {
		const [ direction, ticks ] = step.split(' ');
		if (direction === 'up') position.aim -= parseInt(ticks, 10);
		if (direction === 'down') position.aim += parseInt(ticks, 10);
		if (direction === 'forward') {
			position.x += parseInt(ticks, 10);
			position.depth += (parseInt(ticks, 10) * position.aim);
		}
	});

	return (position.x * position.depth);
};

module.exports = { ...new Puzzle(input, example, solutions) };
