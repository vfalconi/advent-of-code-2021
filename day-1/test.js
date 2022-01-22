const assert = require('assert');
const puzzle = require('.');

describe('Day 1', function() {
	describe('Part 1', function() {

		it('should count total number of increases', function() {
			assert.strictEqual(puzzle.a.proof, 7);
			assert.strictEqual(puzzle.a.solution, 1527);
		});
	});

	describe('Part 2', function() {
		it('should count total increases between rolling sums', function() {
			assert.strictEqual(puzzle.b.proof, 5);
			assert.strictEqual(puzzle.b.solution, 1575);
		});
	});
});
