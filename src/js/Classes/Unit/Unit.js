class Unit {
	posX = 400;

	posY = 300;

	speed = 5;

	maxSpeed = 10;

	acceleration = 0.05;

	minSpeed = 0.1;

	draw = canvasContext => {
		canvasContext.fillStyle = 'white';
		canvasContext.beginPath();
		canvasContext.arc(this.posX, this.posY, 7, 0, Math.PI * 2, true);
		canvasContext.fill();
	};

	move = (x, y, xSpeed, ySpeed) => {
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
		
		this.setPos(unitX, unitY)
	};

	setPos = (x, y) => {
		this.posX = x;
		this.posY = y;
	};
	
	getPos = () => {
		return {
			x: this.posX,
			y: this.posY,
		}
	};
}

export default Unit;
