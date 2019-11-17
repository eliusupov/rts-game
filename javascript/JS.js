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

var speed = 10;
var toX = ballX;
var toY = ballY;

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
	
	var framesPerSecond = 30;
	
	setInterval(function () {
		drawEverything();
		moveUnit(toX, toY, speed);
	}, 1000 / framesPerSecond);
	
	// canvas.addEventListener('mousemove',
	// 	function (evt) {
	// 		var mousePos = calculateMousePos(evt);
	// 		paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
	// 	});
	
	canvas.addEventListener('mousedown',
		function (evt) {
			toX = evt.layerX;
			toY = evt.layerY;
			console.log(toX, 'x');
			console.log(toY, 'y');
			console.log(toX/toY);
			console.log((toY/toX));
		});
};

function moveUnit(x, y, s) {
	if (x === ballX && y === ballY) return;
	let xSpeed = s;
	let ySpeed = s;
	
	if (Math.abs(x) > Math.abs(y)) {
		xSpeed = xSpeed/(toX/toY);
		// ySpeed = ySpeed/((toX/toY).toFixed(1) * 2);
	}
	if (Math.abs(x) < Math.abs(y)) {
		ySpeed = ySpeed/(toY/toX);
		// xSpeed = xSpeed/((toY/toX).toFixed(1) * 2);
	}
	
	let xMovingPlus = ballX + xSpeed;
	let xMovingPlusHalfSpeed = ballX + xSpeed / 2;
	let xMovingMinus = ballX - xSpeed;
	let xMovingMinusHalfSpeed = ballX - xSpeed / 2;
	let yMovingPlus = ballY + ySpeed;
	let yMovingPlusHalfSpeed = ballY + ySpeed / 2;
	let yMovingMinus = ballY - ySpeed;
	let yMovingMinusHalfSpeed = ballY - ySpeed / 2;
	// if (ballX < x && ballX < y) {
	// 	ballX = xMovingPlusHalfSpeed;
	// 	ballY = yMovingPlusHalfSpeed;
	// 	return;
	// }
	//
	// if (ballX < x && ballX > y) {
	// 	ballX = xMovingPlusHalfSpeed;
	// 	ballY = yMovingMinusHalfSpeed;
	// 	return;
	// }
	//
	// if (ballX > x && ballX > y) {
	// 	ballX = xMovingMinusHalfSpeed;
	// 	ballY = yMovingMinusHalfSpeed;
	// 	return;
	// }
	//
	// if (ballX > x && ballX < y) {
	// 	ballX = xMovingMinusHalfSpeed;
	// 	ballY = yMovingMinusHalfSpeed;
	// 	return;
	// }
	
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
