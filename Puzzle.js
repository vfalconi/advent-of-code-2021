module.exports = class {
	constructor(input, example, solutions) {
		return {
			source: {
				input,
				example
			},
			a: {
				proof: solutions.a(example),
				solution: solutions.a(input),
			},
			b: {
				proof: solutions.b(example),
				solution: solutions.b(input),
			}
		};
	}
};
