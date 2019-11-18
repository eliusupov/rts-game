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
		toX = evt.layerX;
		toY = evt.layerY;
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
