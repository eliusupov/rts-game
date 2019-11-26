class Select {
	posX = 0;

	posY = 0;

	toX = 0;

	toY = 0;

	initialise = canvasContext => {
		this.draw(canvasContext);
	};

	draw = canvasContext => {
		canvasContext.strokeStyle = 'white';
		canvasContext.beginPath();
		canvasContext.rect(this.posX, this.posY, this.toX - this.posX, this.toY - this.posY);
		canvasContext.stroke();
	};

	isUnitSelected(unitRangeX, unitRangeY) {
		let selectedX = false;
		let selectedY = false;

		if (unitRangeX.from > this.posX && unitRangeX.to > this.toX && unitRangeX.from < this.toX) {
			selectedX = true;
		}
		if (unitRangeX.from > this.posX && unitRangeX.to < this.toX && unitRangeX.to > this.posX) {
			selectedX = true;
		}
		if (unitRangeX.from < this.posX && unitRangeX.to > this.toX) {
			selectedX = true;
		}
		if (unitRangeX.from < this.posX && unitRangeX.to < this.toX && unitRangeX.to > this.posX) {
			selectedX = true;
		}

		if (unitRangeY.from > this.posY && unitRangeY.to > this.toY && unitRangeY.from < this.toY) {
			selectedY = true;
		}
		if (unitRangeY.from > this.posY && unitRangeY.to < this.toY) {
			selectedY = true;
		}
		if (unitRangeY.from < this.posY && unitRangeY.to > this.toY) {
			selectedY = true;
		}
		if (unitRangeY.from < this.posY && unitRangeY.to < this.toY && unitRangeY.to > this.posY) {
			selectedY = true;
		}
		return selectedX && selectedY;
	}

	setPos = (x, y) => {
		this.posX = x;
		this.posY = y;
	};

	setPosTo = (x, y) => {
		this.toX = x;
		this.toY = y;
	};
}

export default Select;
