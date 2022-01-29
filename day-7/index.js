const { input, example, solutions } = require('./puzzle-input');
const Puzzle = require('../Puzzle');

solutions.a = (positions) => {
	const uniquePositions = new Set();
	const costs = [];

	positions.forEach(position => {
		uniquePositions.add(position);
	});

	for (let positionA of uniquePositions) {
		const distanceCosts = positions.map(positionB => Math.abs((positionB - positionA)));
		costs.push({
			position: positionA,
			cost: distanceCosts.reduce((p, c) => p + c),
		});
	}

	return costs.reduce((p, c) => p.cost < c.cost ? p : c).cost;
};

solutions.b = (positions) => {
	const upper = Math.max(...positions);
	const lower = Math.min(...positions);
	const costs = [];

	for (let positionA=lower; positionA<=upper; positionA++) {
		const distanceCosts = positions.map(positionB => {
			const distanceSteps = Math.abs((positionB - positionA));
			return (.5 * distanceSteps)*(distanceSteps + 1);
		});
		costs.push({
			position: positionA,
			cost: distanceCosts.reduce((p, c) => p + c),
		});
	}

	return costs.reduce((p, c) => p.cost < c.cost ? p : c).cost;
};

module.exports = { ...new Puzzle(input, example, solutions) };
