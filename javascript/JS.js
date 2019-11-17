var canvas,
	canvasContext,
	ballX = 400,
	ballY = 300,
	ballSpeedX = 10,
	ballSpeedY = 4,
	player1Score = 0,
	player2Score = 0;
const WINNING_SCORE = 3;

var showingWinScreen = false,
	paddle1Y = 250,
	paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

var speed = 5;
var toX = ballX;
var toY = ballY;
var xSpeed = speed;
var ySpeed = speed;

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

window.onload = function () {
	canvas = document.getElementById('pongCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 60;

	setInterval(function () {
		drawEverything();
		moveUnit(toX, toY, xSpeed, ySpeed);
	}, 1000 / framesPerSecond);

	// canvas.addEventListener('mousemove',
	// 	function (evt) {
	// 		var mousePos = calculateMousePos(evt);
	// 		paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
	// 	});

	canvas.addEventListener('mousedown',
		function (evt) {
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
				ySpeed = ySpeed/(targetToX/targetToY);
			}
			if (Math.abs(targetToX) < Math.abs(targetToY)) {
				xSpeed = xSpeed/(targetToY/targetToX);
			}
		});
};

function moveUnit(x, y, xSpeed, ySpeed) {
	if (x === ballX && y === ballY) return;
	let xMovingPlus = ballX + xSpeed;
	let xMovingMinus = ballX - xSpeed;
	let yMovingPlus = ballY + ySpeed;
	let yMovingMinus = ballY - ySpeed;

	if (ballX < x) {
		ballX = xMovingPlus;
		if (xMovingPlus > x) {
			ballX = x;
		}
	}

	if (ballX > x) {
		ballX = xMovingMinus;
		if (xMovingPlus < x) {
			ballX = x;
		}
	}

	if (ballY < y) {
		ballY = yMovingPlus;
		if (yMovingPlus > y) {
			ballY = y;
		}
	}

	if (ballY > y) {
		ballY = yMovingMinus;
		if (yMovingPlus < y) {
			ballY = y;
		}
	}


}

function drawEverything() {
	// next line blanks out the screen with black
	colorRect(0, 0, canvas.width, canvas.height, 'black');

	if (showingWinScreen) {
		canvasContext.fillStyle = 'white';
		canvasContext.fillText('click to continue', 100, 100);
		return;
	}

	// this is left player paddle
	// colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

	// this is right computer paddle
	// colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

	// next line draws the ball
	colorCircle(ballX, ballY, 7, 'white');

	// canvasContext.fillText(player1Score, 100, 100);
	// canvasContext.fillText(player2Score, canvas.width - 100, 100);
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
