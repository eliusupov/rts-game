import Unit from './js/Classes/Unit/Unit';

var canvas;
var canvasContext;
var ballX = 400;
var ballY = 300;

var speed = 5;
var toX = ballX;
var toY = ballY;
var xSpeed = speed;
var ySpeed = speed;

const unit = new Unit();

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

window.onload = function() {
	canvas = document.getElementById('pongCanvas');
	canvasContext = canvas.getContext('2d');
	var framesPerSecond = 60;
	setInterval(function() {
		drawEverything(canvasContext);
		unit.move(toX, toY, xSpeed, ySpeed);
	}, 1000 / framesPerSecond);

	canvas.addEventListener('mousedown', function(evt) {
		let targetToX;
		let targetToY;
		toX = evt.layerX;
		toY = evt.layerY;
		xSpeed = speed;
		ySpeed = speed;

		if (Math.abs(ballX) > Math.abs(toX)) {
			targetToX = Math.abs(ballX) - Math.abs(toX);
		} else {
			targetToX = Math.abs(toX) - Math.abs(ballX);
		}

		if (Math.abs(ballY) > Math.abs(toY)) {
			targetToY = Math.abs(ballY) - Math.abs(toY);
		} else {
			targetToY = Math.abs(toY) - Math.abs(ballY);
		}

		if (Math.abs(targetToX) > Math.abs(targetToY)) {
			ySpeed = ySpeed / (targetToX / targetToY);
		}
		if (Math.abs(targetToX) < Math.abs(targetToY)) {
			xSpeed = xSpeed / (targetToY / targetToX);
		}
	});
};

function drawEverything(canvasContext) {
	// next line blanks out the screen with black
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	unit.draw(canvasContext);
}

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
