import Unit from './js/Classes/Unit/Unit';

var canvas;
var canvasContext;
var toX;
var toY;

let selectedUnit;
const unit = new Unit(200, 300);
const unit2 = new Unit(400, 300);

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect(),
		root = document.documentElement,
		mouseX = evt.clientX - rect.left - root.scrollLeft,
		mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY,
	};
}

function calculateSpeed(unit, toX, toY) {
	let targetToX;
	let targetToY;
	const unitX = unit.posX;
	const unitY = unit.posY;
	let xSpeed = unit.minSpeed;
	let ySpeed = unit.minSpeed;

	// let xSpeed = unit.xSpeed < unit.minSpeed ? unit.minSpeed : unit.xSpeed;
	// let ySpeed = unit.ySpeed < unit.minSpeed ? unit.minSpeed : unit.ySpeed;

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

	return unit.setSpeed(xSpeed, ySpeed);
}

function drawEverything(canvasContext) {
	// next line blanks out the screen with black
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	unit.initialise(canvasContext, toX, toY);
	// unit2.initialise(canvasContext, toX, toY, xSpeed, ySpeed);
}

window.onload = function() {
	canvas = document.getElementById('pongCanvas');
	canvasContext = canvas.getContext('2d');
	var framesPerSecond = 60;
	setInterval(() => {
		drawEverything(canvasContext);
	}, 1000 / framesPerSecond);

	canvas.addEventListener('mousedown', function(evt) {
		// calculateSpeed(unit, evt.layerX, evt.layerY);
		toX = evt.layerX;
		toY = evt.layerY;
		unit.calculateSpeed(toX, toY);
	});
};

function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
	canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}
