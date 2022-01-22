const { input, example, solutions } = require('./puzzle-input');
const Puzzle = require('../Puzzle');

solutions.a = (records) => {
	const bitRates = [];
	const gamma = [];
	const epsilon = [];
	let gammaRate = 0;
	let epsilonRate = 0;

	records.forEach(record => {
		const bits = record.split('').map(b => parseInt(b, 10));

		bits.forEach((bit, i) => {
			if (bitRates[i] === undefined) {
				bitRates[i] = [0, 0];
			}
			bitRates[i][bit]++;
		});
	});

	bitRates.forEach((rate, i) => {
		if (rate[0] > rate[1]) {
			gamma[i] = '0';
			epsilon[i] = '1';
		} else {
			gamma[i] = '1';
			epsilon[i] = '0';
		}
	});

	gammaRate = parseInt(gamma.join(''), 2);
	epsilonRate = parseInt(epsilon.join(''), 2);

	return (gammaRate * epsilonRate);
};

solutions.b = (records) => {
	let generatorRating = [...records];
	let scrubberRating = [...records];
	let lifeSupportRating = 0;
	let pointer = 0;

	const getBitRates = (bNumbers, which) => {
		const bitRates = [];

		bNumbers.forEach(record => {
			const bits = record.split('').map(b => parseInt(b, 10));

			bits.forEach((bit, i) => {
				if (bitRates[i] === undefined) {
					bitRates[i] = [0, 0];
				}
				bitRates[i][bit]++;
			});
		});

		return bitRates[which];
	};

	while(generatorRating.length > 1 || scrubberRating.length > 1) {
		if (generatorRating.length > 1) {
			const generatorRates = getBitRates(generatorRating, pointer);
			const generatorFilterRate = (generatorRates[0] > generatorRates[1] ? 0 : 1);
			generatorRating = generatorRating.filter(bNumber => {
				const bits = bNumber.split('').map(b => parseInt(b, 10));
				return bits[pointer] === generatorFilterRate;
			});
		}

		if (scrubberRating.length > 1) {
			const scrubberRates = getBitRates(scrubberRating, pointer);
			const scrubberFilterRate = (scrubberRates[0] > scrubberRates[1] ? 1 : 0);
			scrubberRating = scrubberRating.filter(bNumber => {
				const bits = bNumber.split('').map(b => parseInt(b, 10));
				return bits[pointer] === scrubberFilterRate;
			});
		}

		pointer++;
	}

	generatorRating = parseInt(generatorRating[0], 2);
	scrubberRating = parseInt(scrubberRating[0], 2);

	return (generatorRating * scrubberRating);
};

module.exports = { ...new Puzzle(input, example, solutions) };
