const { input, example, solutions } = require('./puzzle-input');
const Puzzle = require('../Puzzle');

class Paths extends Array {
	add() {
		const paths = [...arguments].map(arg => {

			return {
				boardId: arg.boardId,
				available: [...arg.path],
				hits: [],
				winningDraw: {
					value: arg.winningSquare,
					index: arg.winningSquareIndex,
				},
				unusedNumbers: [...arg.board.flat()],
			}
		});

		Array.prototype.push.apply(this, paths);
	}
};

solutions.a = (game) => {
	const boards = [...game.boards];
	const draw = [...game.draw];
	const pulled = [];
	const paths = new Paths();
	let winner = null;


	boards.forEach((board, i) => {
		const columns = [ [], [], [], [], [] ];

		board.forEach(row => {
			row.forEach((number, q) => {
				columns[q].push(number)

				if (columns[q].length === 5) {
					paths.add({
						boardId: i,
						path: [...columns[q]],
						board,
					});
				}
			});

			paths.add({
				path: [...row],
				board,
				boardId: i,
			});
		});
	});

	while (draw.length > 0 && winner === null) {
		const currentBall = draw.shift();

		pulled.push(currentBall);

		paths.forEach((path, i) => {
			path.unusedNumbers = path.unusedNumbers.filter(number => number !== currentBall);

			for(let p=0; p<path.available.length; p++) {
				if (path.available[p] === currentBall) {
					path.hits.push(currentBall);
  				path.available.splice(p, 1);
					p = path.available.length;
				}

				if (path.hits.length === 5) winner = {...path};
			}
		});
	}

	unusedSquaresSum = winner.unusedNumbers.reduce((p, c) => p + c);

	return pulled[pulled.length-1] * unusedSquaresSum;
};

solutions.b = (game) => {
	const solvedBoards = [...game.boards].map((board, i) => {
		const paths = new Paths()
		const columns = [ [], [], [], [], [] ];

		board.forEach(row => {
			const rowWinningSquareIndex = Math.max(...row.map((square, q) => {
				columns[q].push(square)

				if (columns[q].length === 5) {
					const columnWinningSquareIndex = Math.max(...columns[q].map(square => game.draw.indexOf(square)));

					paths.add({
						path: [...columns[q]],
						board,
						boardId: i,
						winningSquare: game.draw[columnWinningSquareIndex],
						winningSquareIndex: columnWinningSquareIndex,
					});
				}

				return game.draw.indexOf(square)
			}));

			paths.add({
				path: [...row],
				winningSquare: game.draw[rowWinningSquareIndex],
				winningSquareIndex: rowWinningSquareIndex,
				board,
				boardId: i,
			});
		});

		return paths;
	});
	const winningPath = solvedBoards.map((board, q) => {
		return board.reduce((p, c) => (p.winningDraw.index > c.winningDraw.index ? c : p));
	}).reduce((p, c) => (p.winningDraw.index > c.winningDraw.index ? p : c));
	const pulledNumbers = [...game.draw].slice(0, winningPath.winningDraw.index+1);
	let unusedSquaresSum = 0;

	winningPath.unusedNumbers = winningPath.unusedNumbers.filter(number => !pulledNumbers.includes(number));
	unusedSquaresSum = winningPath.unusedNumbers.reduce((p, c) => p+c);

	return unusedSquaresSum * winningPath.winningDraw.value;
};

module.exports = { ...new Puzzle(input, example, solutions) };
