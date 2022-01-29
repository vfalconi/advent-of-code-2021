const puzzles = {};
const key = parseInt(process.argv[2], 10) || 0;
if (key !== 0) {
	puzzles[`Day ${key}`] = require(`./day-${key}`);
} else {
	puzzles['Day 1'] = require('./day-1');
	puzzles['Day 2'] = require('./day-2');
	puzzles['Day 3'] = require('./day-3');
	puzzles['Day 4'] = require('./day-4');
	puzzles['Day 5'] = require('./day-5');
	puzzles['Day 6'] = require('./day-6');
}

Object.keys(puzzles).forEach((day) => {
	console.group(day);
		console.group('Part A');
			console.log('Proof:', puzzles[day].a.proof);
			console.log('Solution:', puzzles[day].a.solution);
		console.groupEnd();
		console.group('Part B');
			console.log('Proof:', puzzles[day].b.proof);
			console.log('Solution:', puzzles[day].b.solution);
		console.groupEnd();
	console.groupEnd();
});
