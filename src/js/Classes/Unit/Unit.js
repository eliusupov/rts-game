// TODO write all with this and not variables

class Unit {
	constructor(posX, posY) {
		this.setPos(posX, posY);
	}

	posX = 400;

	posY = 300;

	toX = 0;

	toY = 0;

	radius = 10;

	xSpeed = 0.1;

	ySpeed = 0.1;

	maxSpeed = 4;

	acceleration = 0.1;

	minSpeed = 0.1;

	selected = false;

	initialise = canvasContext => {
		this.draw(canvasContext);
		this.move(this.toX, this.toY, this.xSpeed, this.ySpeed);
	};

	draw = canvasContext => {
		canvasContext.fillStyle = 'white';
		canvasContext.beginPath();
		canvasContext.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, true);
		canvasContext.fill();
		if (this.selected) {
			canvasContext.strokeStyle = 'white';
			canvasContext.beginPath();
			canvasContext.arc(this.posX, this.posY, this.radius + 5, 0, Math.PI * 2, true);
			canvasContext.stroke();
			// canvasContext.fill();
		}
	};

	move = (x, y) => {
		if (!x || !y) return;
		if (x === this.posX && y === this.posY) return;
		let unitX = this.posX;
		let unitY = this.posY;
		const { x: xSpeed, y: ySpeed } = this.calculateSpeed(x, y);
		const xMovingPlus = unitX + xSpeed;
		const xMovingMinus = unitX - xSpeed;
		const yMovingPlus = unitY + ySpeed;
		const yMovingMinus = unitY - ySpeed;
		// let setSpeedX = xSpeed;
		// let setSpeedY = ySpeed;

		if (unitX < x) {
			if (xMovingPlus > x) {
				unitX = x;
			} else {
				unitX = xMovingPlus;
			}
		} else if (unitX > x) {
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

		this.setPos(unitX, unitY);
		this.accelerate(x, y);
	};

	calculateSpeed = (toX, toY) => {
		let targetToX;
		let targetToY;
		const unitX = this.posX;
		const unitY = this.posY;

		let xSpeed = this.xSpeed;
		let ySpeed = this.ySpeed;

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

		return {
			x: xSpeed,
			y: ySpeed,
		};
	};

	accelerate = (x, y) => {
		let unitX = this.posX;
		let unitY = this.posY;
		let setSpeedX = this.xSpeed;
		let setSpeedY = this.ySpeed;

		if (this.xSpeed < this.maxSpeed) {
			setSpeedX = this.xSpeed + this.acceleration;
		} else {
			setSpeedX = this.maxSpeed;
		}
		if (this.ySpeed < this.maxSpeed) {
			setSpeedY = this.ySpeed + this.acceleration;
		} else {
			setSpeedY = this.maxSpeed;
		}
		if (unitX === x && unitY === y) {
			setSpeedX = this.minSpeed;
			setSpeedY = this.minSpeed;
		}

		this.setSpeed(setSpeedX, setSpeedY);
	};

	setPos = (x, y) => {
		this.posX = x;
		this.posY = y;
	};

	setSpeed = (x = this.xSpeed, y = this.ySpeed) => {
		this.xSpeed = x;
		this.ySpeed = y;
	};

	setTo = (toX, toY) => {
		this.toX = toX;
		this.toY = toY;
	};

	getPos = () => {
		return {
			x: this.posX,
			y: this.posY,
		};
	};
}

export default Unit;
