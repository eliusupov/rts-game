import Unit from './js/Classes/Unit/Unit';

var canvas;
var canvasContext;
var toX;
var toY;

let selectedUnit;
const unit = new Unit(200, 300);
const unit2 = new Unit(400, 300);
const unit3 = new Unit(100, 300);

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
	if (selectedUnit) {
		selectedUnit.initialise(canvasContext, toX, toY);
	}
	unit3.initialise(canvasContext);
	unit2.initialise(canvasContext);
	unit.initialise(canvasContext);
}

window.onload = function() {
	canvas = document.getElementById('pongCanvas');
	canvasContext = canvas.getContext('2d');
	var framesPerSecond = 60;
	setInterval(() => {
		drawEverything(canvasContext);
	}, 1000 / framesPerSecond);

	canvas.addEventListener('mousedown', function(evt) {
		if (evt.button === 2) {
			toX = evt.layerX;
			toY = evt.layerY;
		}
		const units = [unit, unit2, unit3];
		units.forEach(e => {
			const xRange = {
				from: e.posX - e.radius,
				to: e.posX + e.radius,
			};
			const yRange = {
				from: e.posY - e.radius,
				to: e.posY + e.radius,
			};

			if (
				evt.layerX < xRange.from ||
				evt.layerX > xRange.to ||
				evt.layerY < yRange.from ||
				evt.layerY > yRange.to
			) {
				// debugger
			} else {
				units.forEach(el => el.selected = false)
				selectedUnit = e;
				selectedUnit.selected  = true;
				toX = selectedUnit.posX;
				toY = selectedUnit.posY;
			}
		});
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
