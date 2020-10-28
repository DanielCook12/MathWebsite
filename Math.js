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
var shapesValueType = ["constant", "constant"];
var shapesType = ["none", "none"];
var rightWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var leftWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var weightVars = ["constant"];
var timer = 0;
var equal = true;
var left = false;
var right = false;
var farLeft = false;
var farRight = false;
var scaleHeight = 0;

function contains(string, value) {
	for (var i = 0; i < string.length; i++) {
		if (string.charAt(i) === value) {
			return i;
		}
	}
	return false;
}

function findTypeFromString(string, start, end) {
	var returnV = [];
	if (start != null) {
		for (var i = start; i < end; i++) {
			if (string.charAt(i) == "0" || string.charAt(i) == "1" || string.charAt(i) == "2" || string.charAt(i) == "3" || string.charAt(i) == "4" || string.charAt(i) == "5" || string.charAt(i) == "6" || string.charAt(i) == "7" || string.charAt(i) == "8" || string.charAt(i) == "9") {
				returnV[i] = "num";
			} else if (string.charAt(i) == "+" || string.charAt(i) == "-" || string.charAt(i) == "*" || string.charAt(i) == "/" || string.charAt(i) == "^") {
				returnV[i] = "op";
			} else if (string.charAt(i) == "(" || string.charAt(i) == ")" || string.charAt(i) == "{" || string.charAt(i) == "}" || string.charAt(i) == "[" || array [i] == "]") {
				returnV[i] = "group";
			} else if (string.charAt(i) == "a" || string.charAt(i) == "b" || string.charAt(i) == "c" || string.charAt(i) == "d" || string.charAt(i) == "e" || string.charAt(i) == "f" || string.charAt(i) == "g" || string.charAt(i) == "h" || string.charAt(i) == "i" || string.charAt(i) == "j" || string.charAt(i) == "k" || string.charAt(i) == "l" || string.charAt(i) == "m" || string.charAt(i) == "n" || string.charAt(i) == "o" || string.charAt(i) == "p" || string.charAt(i) == "q" || string.charAt(i) == "r" || string.charAt(i) == "s" || string.charAt(i) == "t" || string.charAt(i) == "u" || string.charAt(i) == "v" || string.charAt(i) == "w" || string.charAt(i) == "x" || string.charAt(i) == "y" || string.charAt(i) == "z") {
				returnV[i] = "letter";
			} else {
				returnV[i] = "unknown"
			}
		}
	} else {
		for (var i = 0; i < string.length; i++) {
			if (string.charAt(i) == "0" || string.charAt(i) == "1" || string.charAt(i) == "2" || string.charAt(i) == "3" || string.charAt(i) == "4" || string.charAt(i) == "5" || string.charAt(i) == "6" || string.charAt(i) == "7" || string.charAt(i) == "8" || string.charAt(i) == "9") {
				returnV[i] = "num";
			} else if (string.charAt(i) == "+" || string.charAt(i) == "-" || string.charAt(i) == "*" || string.charAt(i) == "/" || string.charAt(i) == "^") {
				returnV[i] = "op";
			} else if (string.charAt(i) == "(" || string.charAt(i) == ")" || string.charAt(i) == "{" || string.charAt(i) == "}" || string.charAt(i) == "[" || string.charAt(i) == "]") {
				returnV[i] = "group";
			} else if (string.charAt(i) == "a" || string.charAt(i) == "b" || string.charAt(i) == "c" || string.charAt(i) == "d" || string.charAt(i) == "e" || string.charAt(i) == "f" || string.charAt(i) == "g" || string.charAt(i) == "h" || string.charAt(i) == "i" || string.charAt(i) == "j" || string.charAt(i) == "k" || string.charAt(i) == "l" || string.charAt(i) == "m" || string.charAt(i) == "n" || string.charAt(i) == "o" || string.charAt(i) == "p" || string.charAt(i) == "q" || string.charAt(i) == "r" || string.charAt(i) == "s" || string.charAt(i) == "t" || string.charAt(i) == "u" || string.charAt(i) == "v" || string.charAt(i) == "w" || string.charAt(i) == "x" || string.charAt(i) == "y" || string.charAt(i) == "z") {
				returnV[i] = "letter";
			} else {
				returnV[i] = "unknown"
			}
		}
	}
	return returnV;
}

function findValueOfString(string) {
	var val = findTypeFromString(string);
	var terms = [0];
	var termsType = ["constant"];
	var operators = [];
	//var groups = [];
	for (var i = 0; i < string.length; i++) {
		if (val[i] === "num") {
			terms[terms.length-1] *= 10;
			console.log("num");
			terms[terms.length-1] += parseInt(string.charAt(i));
		} else if (val[i] === "op") {
			terms.push(0);
			console.log("sym");
			termsType.push("constant");
			operators.push(string.charAt(i));
		} else if (val[i] === "letter") {
			console.log("var");
			termsType[termsType.length-1] = string.charAt(i);
		}
	}
	if (terms.length > 1) {
		for (var i = 0; i < terms.length; i++) {
			for (var j = 0; j < terms.length; j++) {
				if (j != i && termsType[i] === termsType[j] && (val[i] === "letter" || val[i] === "num")) {
					if (operators[i] === "+") {
						terms[i] += terms[j];
					} else if (operators[i] === "-") { 
						terms[i] -= terms[j];
					} else if (operators[i] === "*") {
						terms[i] *= terms[j];
					} else if (operators[i] === "/") {
						terms[i] /= terms[j];
					}
					terms.splice(j, 1);
					termsType.splice(j, 1);
				}
			}
		}
	}
	console.log(terms);
	console.log(termsType);
	return terms[0];
}


function findTypeOfString(string) {
	var val = findTypeFromString(string);
	var terms = [0];
	var termsType = ["constant"];
	var operators = [];
	//var groups = [];
	for (var i = 0; i < string.length; i++) {
		if (val[i] === "num") {
			terms[terms.length-1] *= 10;
			console.log("num");
			terms[terms.length-1] += parseInt(string.charAt(i));
		} else if (val[i] === "op") {
			terms.push(0);
			console.log("sym");
			termsType.push("constant");
			operators.push(string.charAt(i));
		} else if (val[i] === "letter") {
			console.log("var");
			termsType[termsType.length-1] = string.charAt(i);
		}
	}
	if (terms.length > 1) {
		for (var i = 0; i < terms.length; i++) {
			for (var j = 0; j < terms.length; j++) {
				if (j != i && termsType[i] === termsType[j] && (val[i] === "letter" || val[i] === "num")) {
					if (operators[i] === "+") {
						terms[i] += terms[j];
					} else if (operators[i] === "-") { 
						terms[i] -= terms[j];
					} else if (operators[i] === "*") {
						terms[i] *= terms[j];
					} else if (operators[i] === "/") {
						terms[i] /= terms[j];
					}
					terms.splice(j, 1);
					termsType.splice(j, 1);
				}
			}
		}
	}
	return termsType[0];
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
		if (contains(leftinput, '"')) {
			shapesValue.push(0);
		} else {
			shapesValue.push(findValueOfString(leftinput));
			shapesValueType.push(findTypeOfString(leftinput));
		}
		console.log(shapesValue[shapesValue.length-1]);
		console.log(shapesValueType[shapesValue.length-1]);
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
		if (contains(rightinput, '"')) {
			shapesValue.push(0);
		} else {
			shapesValue.push(findValueOfString(rightinput));
			shapesValueType.push(findTypeOfString(rightinput));
		}
	}
	if (eval(leftinput) == eval(rightinput)) {
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
	d.moveTo(225, 230+scaleHeight);
	d.lineTo(225, 257.5+scaleHeight);
	d.lineTo(775, 257.5-scaleHeight);
	d.lineTo(775, 230-scaleHeight);
	d.lineTo(755, 230-scaleHeight);
	d.lineTo(755, 242.5-scaleHeight);
	d.lineTo(245, 242.5+scaleHeight);
	d.lineTo(245, 230+scaleHeight);
	d.fill();

	//Left Scale
	d.fillRect(40, 210 + scaleHeight, 400, 20);

	//Right Scale
	d.fillRect(560, 210 - scaleHeight, 400, 20);

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
		if (shapesY[i] >= 210 - shapesH[i] + scaleHeight && shapesY[i] <= 230 - shapesH[i] + scaleHeight && shapesVY[i] > 0 && (shapesX[i] < 440) && shapesX[i] > 40 - shapesW[i]) {
			shapesVY[i] = 0;
			shapesY[i] = 210 - shapesH[i] + scaleHeight;
		} else if (shapesY[i] >= 210 - shapesH[i] - scaleHeight && shapesY[i] <= 230 - shapesH[i] - scaleHeight && shapesVY[i] > 0 && (shapesX[i] > 560) && shapesX[i] < 960) {
			shapesVY[i] = 0;
			shapesY[i] = 210 - shapesH[i] - scaleHeight;
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
	
	
	// Detect how much is on each side of the scale

	// Timer is used to only run the code every 25 times the code reaches this point for better performance.
	timer++;
	if (timer === 25) {
		timer = 0;
		// Reset variables to put what is necessary in them.
		leftweight = [0];
		rightweight = [0];
		weightVars = ["constant"];
		//For each shape
		for (var i = 0; i < shapesValue.length; i++) {
			var valueTypeNum = -1;
			// For each variable used
			for (var j = 0; j < weightVars.length; j++) {
				//If the variable of the shape is the same as j, set teh variable type number to j
				if (shapesValueType[i] === weightVars[j]) {
					valueTypeNum = j;
				}
			}
			// If it is a previously unused variable, add it to weightVars
			if (valueTypeNum === -1) {
				valueTypeNum = weightVars.length;
				weightVars.push(shapesValueType[i]);
			}
			
			// Add the value into the leftweight or rightweight arrays.
			if (shapesY[i] <= 210+scaleHeight && shapesY[i] >= 100) {
				if (shapesX[i] < 500) {
					if (valueTypeNum < leftweight.length) {
						leftweight[valueTypeNum] += parseInt(shapesValue[i]);
					} else {
						while (leftweight.length < weightVars.length-1) {
							leftweight.push(0);
						}
						leftweight.push(parseInt(shapesValue[i]));
					}
				}
			}
			if (shapesY[i] <= 210 - scaleHeight && shapesY[i] >= 100 && shapesX[i] >=500) {
				if (valueTypeNum < rightweight.length) {
					rightweight[valueTypeNum] += parseInt(shapesValue[i]);
				} else {
					while (rightweight.length < weightVars.length-1) {
						rightweight.push(0);
					}	
					rightweight.push(parseInt(shapesValue[i]));
				}			
			}
			
		}
		// Detect if the sides are equal
		equal = false;
		left = false;
		right = false;
		farRight = false;
		farLeft = false;
		var differences = [];
		while (leftweight.length > rightweight.length) {
			rightweight.push(0);
		}
		while (rightweight.length > leftweight.length) {
			leftweight.push(0);
		}
		for (var i = 0; i < leftweight.length; i++) {
			if (leftweight[i] != rightweight[i]) {
				differences.push(leftweight[i] - rightweight[i]);
			}
		} 
		console.log(differences);
		var difference = 0;
		for (var i = 0; i < differences.length; i++) {
			difference += differences[i];
		}
		if (difference < 0 && difference >= -50) {
			right = true;
			console.log("right");
			scaleHeight = -10;
		} else if (difference > 0 && difference < 50) {
			left = true;
			console.log("left");
			scaleHeight = 10;

		} else if (difference === 0) {
			equal = true;
			console.log("Equal");
			scaleHeight = 0;
		} else if (difference <= -50) {
			farRight = true;
			console.log("far right");
			scaleHeight = -25;
		} else if (difference >= 50) {
			farLeft = true;
			console.log("far Left");
			scaleHeight = 25;
		}
		console.log(leftweight);
		console.log(rightweight);
	}
}

document.addEventListener('mousemove', function(event) {
	mx = event.offsetX;
	my = event.offsetY;
	var mxNow = mx;
	var myNow = my;
	setTimeout(function() {prevMx = mxNow; prevMy = myNow}, 200);
});

document.addEventListener('mousedown', function(event) {
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
