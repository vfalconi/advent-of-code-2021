const puzzles = {};
puzzles['Day 1'] = require('./day-1');
puzzles['Day 2'] = require('./day-2');

Object.keys(puzzles).forEach((day) => {
	console.group(day);
		console.group('---', 'Part A');
			console.log('Proof:', puzzles[day].a.proof);
			console.log('Solution:', puzzles[day].a.solution);
		console.groupEnd();
		console.group('---', 'Part B');
			console.log('Proof:', puzzles[day].b.proof);
			console.log('Solution:', puzzles[day].b.solution);
		console.groupEnd();
	console.groupEnd();
});
