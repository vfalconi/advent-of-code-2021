module.exports = class {
	constructor(input, example, solutions) {
		return {
			source: {
				input,
				example
			},
			a: {
				proof: solutions.a(example.a),
				solution: solutions.a(input),
			},
			b: {
				proof: solutions.b(example.b),
				solution: solutions.b(input),
			}
		};
	}
};
