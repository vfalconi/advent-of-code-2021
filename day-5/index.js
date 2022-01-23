const { Graph, Line } = require('../Utils');
const { input, example, solutions } = require('./puzzle-input');
const Puzzle = require('../Puzzle');

class SeaMap extends Graph {
	findDanger() {
		return [...this].flat().filter(square => square >= 2).length;
	}
}

solutions.a = (coords) => {
	const graph = new SeaMap(coords.flat());
	const lines = coords.map(pair => {
		return new Line(pair);
	}).filter(line => line.type !== 'diagonal');

	graph.addLines(lines);

	return graph.findDanger();
};

solutions.b = (coords) => {
	const graph = new SeaMap(coords.flat());
	const lines = coords.map(pair => new Line(pair));

	graph.addLines(lines);

	return graph.findDanger();
};

module.exports = { ...new Puzzle(input, example, solutions) };
