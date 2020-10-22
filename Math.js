var c = document.getElementById("canvas");
var d = c.getContext("2d");
var shapes = [0, 0];
var shapesX = [10, 100];
var shapesY = [10, 10];
var shapesVY = [2, 0];
var shapesVX = [0, 0];
var shapesH = [50, 75];
var shapesW = [50, 35];
var shapesText = ["", ""];
var selected = -1;
var mx = 0;
var my = 0;
var prevMx = 0;
var prevMy = 0;
var scale = 0;
var shapesValue = [0, 0];
var shapesType = ["none", "none"];

function contains(array, value) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] === value) {
			return i;
		}
	}
	return false;
}

function findTypeFromString(array, start, end) {
	var returnV = [];
	if (start != null) {
		for (var i = start; i < end; i++) {
			if (array[i] == "0" || array[i] == "1" || array[i] == "2" || array[i] == "3" || array[i] == "4" || array[i] == "5" || array[i] == "6" || array[i] == "7" || array[i] == "8" || array[i] == "9") {
				returnV[i] = "num";
			} else if (array[i] == "+" || array[i] == "-" || array[i] == "*" || array[i] == "/" || array[i] == "^") {
				returnV[i] = "op";
			} else if (array[i] == "(" || array[i] == ")" || array[i] == "{" || array[i] == "}" || array[i] == "[" || array [i] == "]") {
				returnV[i] = "group";
			} else if (array[i] == "a" || array[i] == "b" || array[i] == "c" || array[i] == "d" || array[i] == "e" || array[i] == "f" || array[i] == "g" || array[i] == "h" || array[i] == "i" || array[i] == "j" || array[i] == "k" || array[i] == "l" || array[i] == "m" || array[i] == "n" || array[i] == "o" || array[i] == "p" || array[i] == "q" || array[i] == "r" || array[i] == "s" || array[i] == "t" || array[i] == "u" || array[i] == "v" || array[i] == "w" || array[i] == "x" || array[i] == "y" || array[i] == "z") {
				returnV[i] = "letter";
			} else {
				returnV[i] = "unknown"
			}
		}
	} else {
		for (var i = 0; i < array.length; i++) {
			if (array[i] == "0" || array[i] == "1" || array[i] == "2" || array[i] == "3" || array[i] == "4" || array[i] == "5" || array[i] == "6" || array[i] == "7" || array[i] == "8" || array[i] == "9") {
				returnV[i] = "num";
			} else if (array[i] == "+" || array[i] == "-" || array[i] == "*" || array[i] == "/" || array[i] == "^") {
				returnV[i] = "op";
			} else if (array[i] == "(" || array[i] == ")" || array[i] == "{" || array[i] == "}" || array[i] == "[" || array [i] == "]") {
				returnV[i] = "group";
			} else if (array[i] == "a" || array[i] == "b" || array[i] == "c" || array[i] == "d" || array[i] == "e" || array[i] == "f" || array[i] == "g" || array[i] == "h" || array[i] == "i" || array[i] == "j" || array[i] == "k" || array[i] == "l" || array[i] == "m" || array[i] == "n" || array[i] == "o" || array[i] == "p" || array[i] == "q" || array[i] == "r" || array[i] == "s" || array[i] == "t" || array[i] == "u" || array[i] == "v" || array[i] == "w" || array[i] == "x" || array[i] == "y" || array[i] == "z") {
				returnV[i] = "letter";
			} else {
				returnV[i] = "unknown"
			}
		}
	}
}


function send() {
	var leftinput = document.getElementById("leftinput").value;
	var rightinput = document.getElementById("rightinput").value;
	if (leftinput != "") {
		shapes.push(1);
		shapesX.push(200);
		shapesY.push(100);
		shapesVX.push(0);
		shapesVY.push(0);
		shapesH.push(30);
		shapesW.push(leftinput.length * 15);
		shapesText.push(leftinput);

	}
	if (rightinput != "") {
		shapes.push(1);
		shapesX.push(600);
		shapesY.push(100);
		shapesVX.push(0);
		shapesVY.push(0);
		shapesH.push(30);
		shapesW.push(rightinput.length * 15);
		shapesText.push(rightinput);
	}
	if (leftinput == rightinput) {
		document.getElementById("status").style.backgroundColor = "green";
		document.getElementById("status").innerHTML = "Equal";
	} else {
		document.getElementById("status").style.backgroundColor = "red";
		document.getElementById("status").innerHTML = "Not Equal";
	}
}

setInterval(function() {
	render();
	update();
}, 33);

function render() {
	//clear screen
	d.clearRect(0, 0, 1000, 700);

	// Render Scale
	d.fillStyle = "#000000";

	// Main Triangle
	d.beginPath();
	d.moveTo(500, 250);
	d.lineTo(325, 450);
	d.lineTo(675, 450);
	d.lineTo(500, 250);
	d.fill();

	// Axel/Circle
	d.beginPath();
	d.arc(500, 250, 40, 0, Math.PI*2);
	d.fill();

	// Main Board of balancing
	d.beginPath();
	d.moveTo(225, 230);
	d.lineTo(225, 257.5);
	d.lineTo(775, 257.5);
	d.lineTo(775, 230);
	d.lineTo(755, 230);
	d.lineTo(755, 242.5);
	d.lineTo(245, 242.5);
	d.lineTo(245, 230);
	d.fill();

	//Left Scale
	d.fillRect(40, 210, 400, 20);

	//Right Scale
	d.fillRect(560, 210, 400, 20);

	//Render Shapes
	d.fillStyle = "#008800";
	for (var i = 0; i<shapes.length; i++) {
		if (shapes[i] === 0) {
			d.fillRect(shapesX[i], shapesY[i], shapesW[i], shapesH[i]);
		} else if (shapes[i] === 1) {
			d.font = "30px Arial";
			d.fillStyle = "#000000";
			d.fillText(shapesText[i], shapesX[i], shapesY[i] + shapesH[i]);
		}
	}
}

function update() {
	// Move Shapes
	for (var i = 0; i < shapes.length; i++) {
		shapesX[i] += shapesVX[i];
		shapesY[i] += shapesVY[i];

		if (shapesVX[i] != 0 && shapesVY[i] == 0) {
			if (shapesVX[i] > 0) {
				shapesVX[i] -= 1;
			} else {
				shapesVX[i] += 1;
			}
			shapesVX[i] = Math.floor(shapesVX[i]*2)/2;
		} else if (shapesVX[i] != 0) {
			if (shapesVX[i] > 0) {
				shapesVX[i] -= 0.1;
			} else {
				shapesVX[i] += 0.1;
			}
			shapesVX[i] = Math.floor(shapesVX[i]*2)/2;
		}
		if (shapesX[i] < 0) {
			shapesX[i] = 0;
		} else if (shapesX[i] > 1000 - shapesW[i]) {
			shapesX[i] = 1000 - shapesW[i];
		} else if (shapesVX[i] != 0) {
			for (var j = 0; j < shapes.length; j++) {
				if (shapesVX[j] === 0 && j != i) {
					if (shapesX[i] + shapesW[i] >= shapesX[j] && shapesX[i] + shapesW[i] <= shapesX[j] + shapesW[j] && (shapesY[i] + shapesH[i] >= shapesY[j] + (shapesH[j] * 0.7) && shapesY[i] <= shapesY[j] + shapesH[j])) {
						shapesVX[i] = 0;
						shapesX[i] = shapesX[j] - shapesW[i];
					} else if (shapesX[i] >= shapesX[j] && shapesX[i] <= shapesX[j] + shapesW[j] && (shapesY[i] + shapesH[i] >= shapesY[j] + (shapesH[j] * 0.7) && shapesY[i] <= shapesY[j] + shapesH[j])) {
						shapesVX[i] = 0;
						shapesX[i] = shapesX[j] + shapesW[j];
					}
				}
			}
		}
		shapesVY[i] += 1;
		if (shapesY[i] >= 210 - shapesH[i] && shapesY[i] <= 230 - shapesH[i] && shapesVY[i] > 0 && (shapesX[i] > 560 - shapesW[i] || shapesX[i] < 440) && shapesX[i] > 40 - shapesW[i] && shapesX[i] < 960) {
			shapesVY[i] = 0;
			shapesY[i] = 210 - shapesH[i];
		} else if (shapesY[i] >= 460 - shapesH[i]) {
			shapesVY[i] = 0;
			shapesY[i] = 460 - shapesH[i];
		} else if (shapesVY[i] > 0) {
			for (var j = 0; j < shapes.length; j++) {
				if (shapesVY[j] === 0 && j != i && shapesY[j] >= shapesY[i] + (shapesH[i]*6/10)) {
					if (shapesY[i] + shapesH[i] >= shapesY[j] && shapesY[i] + shapesH[i] <= shapesY[j] + shapesH[j] && (shapesX[i] + shapesW[i] >= shapesX[j] && shapesX[i] <= shapesX[j] + shapesW[j])) {
						shapesVY[i] = 0;
						shapesY[i] = shapesY[j] - shapesH[i];
					}
				}
			}
		}
		if (selected == i) {
			shapesX[i] = mx - (shapesW[i]/2);
			shapesY[i] = my - (shapesH[i]/2);
		}
	}
}

document.addEventListener('mousemove', function(event) {
	mx = event.offsetX;
	my = event.offsetY;
	var mxNow = mx;
	var myNow = my;
	setTimeout(function() {prevMx = mxNow; prevMy = myNow}, 200);
});

document.addEventListener('click', function(event) {
	mx = event.offsetX;
	my = event.offsetY;
	if (selected == -1) {
		for (var i = 0; i < shapes.length; i++) {
			if (mx - shapesX[i] <= shapesW[i] && mx - shapesX[i] >= 0 && my - shapesY[i] >= 0 && my - shapesY[i] <= shapesH[i]) {
				selected = i;
			}
		}
	} else {
		shapesVX[selected] = (mx - prevMx)/6;
		shapesVY[selected] = (my - prevMy)/6;
		selected = -1;
	}
});
