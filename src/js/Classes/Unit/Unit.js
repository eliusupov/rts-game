class Unit {
	constructor(posX, posY) {
		this.setPos(posX, posY);
	}

	posX = 400;

	posY = 300;

	xSpeed = 1;

	ySpeed = 1;

	maxSpeed = 10;

	acceleration = 0.1;

	minSpeed = 0.1;

	initialise = (canvasContext, toX, toY) => {
		// if (this.xSpeed < this.maxSpeed) {
		// 	this.setSpeed(this.xSpeed + this.acceleration, this.ySpeed)
		// } else {
		// 	this.setSpeed(this.maxSpeed, this.ySpeed)
		// }
		//
		// if (this.ySpeed < this.maxSpeed) {
		// 	this.setSpeed(this.xSpeed, this.ySpeed + this.acceleration)
		// } else {
		// 	this.setSpeed(this.xSpeed, this.maxSpeed)
		// }
		this.draw(canvasContext);
		// this.calculateSpeed(toX, toY);
		this.move(toX, toY, this.xSpeed, this.ySpeed);
	};

	draw = canvasContext => {
		canvasContext.fillStyle = 'white';
		canvasContext.beginPath();
		canvasContext.arc(this.posX, this.posY, 7, 0, Math.PI * 2, true);
		canvasContext.fill();
	};

	move = (x, y, xSpeed, ySpeed) => {
		if (!x || !y) return;
		if (x === this.posX && y === this.posY) return;
		const xMovingPlus = this.posX + xSpeed;
		const xMovingMinus = this.posX - xSpeed;
		const yMovingPlus = this.posY + ySpeed;
		const yMovingMinus = this.posY - ySpeed;

		let unitX = this.posX;
		let unitY = this.posY;

		if (this.posX < x) {
			if (xMovingPlus > x) {
				unitX = x;
			} else {
				unitX = xMovingPlus;
			}
		} else if (this.posX > x) {
			if (xMovingPlus < x) {
				unitX = x;
			} else {
				unitX = xMovingMinus;
			}
		}

		if (this.posY < y) {
			if (yMovingPlus > y) {
				unitY = y;
			} else {
				unitY = yMovingPlus;
			}
		} else if (this.posY > y) {
			if (yMovingPlus < y) {
				unitY = y;
			} else {
				unitY = yMovingMinus;
			}
		}
		if (unitX !== x) {
			this.xSpeed = this.xSpeed + this.acceleration;
		}
		// if (unitY !== y) {
		// 	// this.setSpeed(this.xSpeed, this.ySpeed + this.acceleration)
		// }
		this.setPos(unitX, unitY);
	};

	calculateSpeed(toX, toY) {
		let targetToX;
		let targetToY;
		const unitX = this.posX;
		const unitY = this.posY;

		let xSpeed = this.xSpeed;
		let ySpeed = this.ySpeed;

		// if (this.xSpeed < this.minSpeed) {
		// 	xSpeed = this.minSpeed;
		// } else if (this.xSpeed > this.maxSpeed) {
		// 	xSpeed = this.maxSpeed;
		// } else {
		// 	xSpeed = this.xSpeed;
		// }
		//
		// if (this.ySpeed < this.minSpeed) {
		// 	ySpeed = this.minSpeed;
		// } else if (this.ySpeed > this.maxSpeed) {
		// 	ySpeed = this.maxSpeed;
		// } else {
		// 	ySpeed = this.ySpeed;
		// }

		if (Math.abs(unitX) > Math.abs(toX)) {
			targetToX = Math.abs(unitX) - Math.abs(toX);
		} else {
			targetToX = Math.abs(toX) - Math.abs(unitX);
		}

		if (Math.abs(unitY) > Math.abs(toY)) {
			targetToY = Math.abs(unitY) - Math.abs(toY);
		} else {
			targetToY = Math.abs(toY) - Math.abs(unitY);
		}

		if (Math.abs(targetToX) > Math.abs(targetToY)) {
			ySpeed = ySpeed / (targetToX / targetToY);
		}
		if (Math.abs(targetToX) < Math.abs(targetToY)) {
			xSpeed = xSpeed / (targetToY / targetToX);
		}

		return this.setSpeed(xSpeed, ySpeed);
	}

	setPos = (x, y) => {
		this.posX = x;
		this.posY = y;
	};

	setSpeed = (x = this.xSpeed, y = this.ySpeed) => {
		this.xSpeed = x;
		this.ySpeed = y;
	};

	getPos = () => {
		return {
			x: this.posX,
			y: this.posY,
		};
	};
}

export default Unit;
