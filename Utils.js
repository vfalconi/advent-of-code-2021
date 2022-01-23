module.exports.Graph = class extends Array {
	constructor(coords) {
		super(...Array.from({length:([...coords].reduce((p, c) => p.x > c.x ? p : c).x + 1)}, (_,i)=>{
			return Array.from({length:([...coords].reduce((p, c) => p.y > c.y ? p : c).y + 1)}, (_,i)=>0);
		}));
	}

	get chart() {
		const columns = [...this];
		return columns.map(column => {
			return column.join('');
		}).join("\n").replaceAll('0', '.');
	}

	addLine(line) {
		line.points.forEach(point => {
			this[point.y][point.x]++;
		})
	}

	addLines(lines) {
		this.lines = [...lines];

		for (const line of this.lines) {
			this.addLine(line);
		}
	}
}

module.exports.Line = class extends Array {
	constructor(points) {
		super(...points);
	}

	get type() {
		const points = [...this];
		if (points[0].x === points[1].x) return 'vertical';
		if (points[0].y === points[1].y) return 'horizontal';
		return 'diagonal';
	}

	get points() {
		const endpoints = [...this];
		const x1 = endpoints[0].x;
		const x2 = endpoints[1].x;
		const y1 = endpoints[0].y;
		const y2 = endpoints[1].y;
		const dx = (x2 - x1);
		const dy = (y2 - y1);
		const steps = (Math.abs(x1 - x2) + Math.abs(y1 - y2)) / (dx === 0 || dy === 0 ? 1 : 2);
		const linePoints = [];

		for (let step=0; step<=steps; step++) {
			let x = x1;
			let y = y1;

			if (dx > 0) x += step;
			if (dx < 0) x -= step;

			if (dy > 0) y += step;
			if (dy < 0) y -= step;

			linePoints.push({ x, y});
		}

		return linePoints;
	}
}
