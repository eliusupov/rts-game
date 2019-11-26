import Unit from './js/Classes/Unit/Unit';
import Select from './js/Classes/Select/Select';

var canvas;
var canvasContext;
var drawSelect = false;

const select = new Select();
const unit = new Unit(200, 300);
const unit2 = new Unit(400, 300);
const unit3 = new Unit(100, 300);

const units = [unit, unit2, unit3];

function drawEverything(canvasContext) {
	// next line blanks out the screen with black
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	units.forEach(e => e.initialise(canvasContext));
	if (drawSelect) {
		select.initialise(canvasContext);
	}
}

window.onload = function() {
	canvas = document.getElementById('pongCanvas');
	canvasContext = canvas.getContext('2d');
	const framesPerSecond = 60;
	setInterval(() => {
		drawEverything(canvasContext);
	}, 1000 / framesPerSecond);

	canvas.addEventListener('mousedown', function(evt) {
		if (evt.button === 2 && !drawSelect) {
			units.forEach(e => e.selected && e.setTo(evt.layerX, evt.layerY));
		} else if (!drawSelect) {
			drawSelect = true;
			select.setPos(evt.layerX, evt.layerY);
		}
	});

	canvas.addEventListener('mouseup', evt => {
		if (evt.button !== 2) {
			units.forEach(e => {
				const unitRangeX = {
					from: e.posX - e.radius,
					to: e.posX + e.radius,
				};
				const unitRangeY = {
					from: e.posY - e.radius,
					to: e.posY + e.radius,
				};
				e.selected = select.isUnitSelected(unitRangeX, unitRangeY);
			});
			drawSelect = false;
		}
	});

	canvas.addEventListener('mousemove', e => select.setPosTo(e.layerX, e.layerY));
};

function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}
