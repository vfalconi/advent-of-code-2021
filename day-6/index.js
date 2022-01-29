const { input, example, solutions } = require('./puzzle-input');
const Puzzle = require('../Puzzle');

solutions.a = (ages) => {
	const school = [...ages];

	for (let i=0,days=80; i<days; i++) {
		school.forEach((fish, i) => {
			school[i]--;
			if (school[i] === -1) {
				school[i] = 6;
				school.push(8);
			}
		});
	}

	return school.length;
};

solutions.b = (ages) => {
	const school = [...ages];
	const sortedSchool = Array.from({length:9}, (_,i)=>0);

	school.forEach(fish => {
		sortedSchool[fish]++;
	});

	for (let i=0,days=256; i<days; i++) {
		const spawning = sortedSchool.shift();
		sortedSchool[8] = spawning;
		sortedSchool[6] += spawning;
	}

	return sortedSchool.reduce((p, c) => p + c);
};

module.exports = { ...new Puzzle(input, example, solutions) };
