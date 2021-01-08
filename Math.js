var c = document.getElementById("canvas");
var d = c.getContext("2d");
var canvasW = canvas.getBoundingClientRect().width;
var canvasH = canvas.getBoundingClientRect().height;
console.log(canvasW + " & " + canvasH);
var shapes = [];
var shapesX = [];
var shapesY = [];
var shapesVY = [];
var shapesVX = [];
var shapesH = [];
var shapesW = [];
var shapesText = [];
var selected = -1;
var mx = 0;
var my = 0;
var prevMx = 0;
var prevMy = 0;
var scale = 0;
var shapesValue = [];
var shapesValueType = [];
var shapesValueTypeNoEx = [];
var shapesTermLength = [];
var shapesType = [];
var shapesEx = [];
var rightWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var leftWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var weightVars = ["constant"];
var sizes = [20];
var timer = 0;
var equal = true;
var left = false;
var right = false;
var farLeft = false;
var farRight = false;
var scaleHeight = 0;
var shapesOn = false;
var highestShapeValue = 0;
var highestShapeEx = 0;
var scaleFill = "#000000";
var holdingEnter = false;
var holdingShift = false;
var colors = ["#000088", "#880000", "#008800", "#008888", "#888800", "#880088", "#004488", "#884400", "#448800", "#448888", "#888844", "#884488", "#440088", "#aa0044", "#008844", "#44aa00", "#880044", "#4400aa", "#444488", "#884444", "#448844", "#888888", "#444444", "#aa44aa"];
var variables = ["constant"];


function consoleLog() {
	console.log("Value: ");
	console.log(shapesValue);
	console.log("Type: ");
	console.log(shapesValueType);
	console.log("No Ex Type: ");
	console.log(shapesValueTypeNoEx);
	console.log("Term Length: ");
	console.log(shapesTermLength);
	console.log("Shapes Type: ");
	console.log(shapesType);
	console.log("Shapes Ex: ");
	console.log(shapesEx);
	console.log("Shapes Text: ");
	console.log(shapesText);
}

function switchShapesAndText() {
	/*highestShapeValue = 0;
	for (var j=0; j < shapes.length; j++) {
		for (var i=0; i < shapesValue[j].length; i++) {
			if (shapesEx[j][i] != 0) {
				if (shapesValue[j][i]/parseInt(shapesEx[j][i]) > highestShapeValue) {
					highestShapeValue = shapesValue[j][i]/parseInt(shapesEx[j][i]);
				}
			} else {
				if (shapesValue[j][i] > highestShapeValue) {
					highestShapeValue = shapesValue[j][i];
				}
			}
		}
	}
	var scale = 1;
	if (highestShapeValue >= 6) {
		console.log("Highest Shape Value" + highestShapeValue);
		scale *= highestShapeValue/3;
	}
	highestShapeEx = 0;
	for (var j=0; j < shapes.length; j++) {
		for (var i=0; i < shapesEx[j].length; i++) {
			if (parseInt(shapesEx[j][i]) > highestShapeEx) {
				highestShapeEx = parseInt(shapesEx[j][i]);
			}
		}
	}
	var scaleEx = 1;
	if (highestShapeEx >= 6) {
		scaleEx *= highestShapeEx/3;
	}
	shapesOn = !shapesOn;
	var weightVarsNoEx = [];
	for (var i = 0; i < weightVars.length; i++) {
		if (!contains(weightVars[i], "^")) {
			weightVarsNoEx.push(weightVars[i]);
		} else {
			var noExponetString = "";
			var newString = true;
			for (var j = 0; j < weightVars[i].length; j++) {
				if (weightVars[i].charAt(j) === "^") {
					break;
				} else {
					noExponetString = noExponetString + weightVars[i].charAt(j);
				}
			}
			for (var j = 0; j < weightVarsNoEx.length; j++) {
				if (noExponetString === weightVarsNoEx[j]) {
					newString = false;
				}
			}
			if (newString) {
				weightVarsNoEx.push(noExponetString);
			}
			console.log(noExponetString);
		}
	}
	*/	
	variables = ["constant"];
	shapesOn = !shapesOn;
	if (shapesOn) {
		for (var i = 0; i < shapes.length; i++) {
			var found = false;
			for (var j = 0; j < variables.length; j++) {
				if (shapesValueType[i][0] == variables[j]) {
					found = true;
				}
			}
			if (!found) {
				variables.push(shapesValueType[i][0]);
			}
		}
		for (var i = 0; i < shapes.length; i++) {
			if (shapesValue[i].length < 2) {
			} else {
					for (var k = 0; k < shapesValue[i].length; k++) {
						console.log(k);
						if (shapes[i] === 1) { // If the shape has a value
							if (k >= 1) {
								console.log("k > 1");
								shapes.push(shapes[i]);
								shapesX.push(shapesX[i]+shapesW[i]+20);
								shapesY.push(shapesY[i]+10);
								shapesVX.push(0);
								shapesVY.push(0);
								shapesValue.push([shapesValue[i][k]]);
								shapesValueType.push([shapesValueType[i][k]]);
								shapesValueTypeNoEx.push([shapesValueTypeNoEx[i][k]]);
								shapesTermLength.push([shapesTermLength[i][k]]);
								shapesEx.push([shapesEx[i][k]]);
								shapesText.push(shapesValue[shapesValue.length-1] + shapesValueType[shapesValueType.length-1]);
								// console.log("Shapes Value Type " + shapesValueTypeNoEx[shapes.length-1]);
								// console.log(shapesValueTypeNoEx);
								// console.log("Shapes Exponet " + shapesEx[shapes.length-1]);
								if (shapesValueTypeNoEx[shapes.length-1][0] === "constant") { // for constants
									shapesH.push(20/scaleEx);
									shapesW.push((20*shapesValue[shapes.length-1][0])/shapesEx[i][k]);
									console.log("constant");
								} else if (shapesEx[shapes.length-1][0] === 1) { // for variables without exponets
									var j;
									console.log("Exponet of 1");
									for (j = 1; j < weightVarsNoEx.length; j++) {   // find which size it should be
										if (shapesValueTypeNoEx[shapes.length-1][0] == weightVarsNoEx[j]) {
											break;
										}
									}
									shapesH.push((20/scaleEx) * shapesTermLength[i]);
									shapesW.push(((sizes[j]*shapesValue[shapes.length-1])/scale)/shapesEx[i][k]);
								} else if (shapesEx[shapes.length-1][0] > 1) { // for variables with exponets
									var j;
									console.log("Exponet of more than 1");
									for (j = 1; j < weightVarsNoEx.length; j++) {   // find which size it should be
										if (shapesValueTypeNoEx[shapes.length-1][0] == weightVarsNoEx[j]) {
											break;
										}
									}
									shapesH.push(((sizes[j] * (shapesEx[shapes.length-1][0] * 0.5))/scaleEx) * shapesTermLength[i][0]);
									shapesW.push(((sizes[j] * shapesValue[shapes.length-1][0])/scale)/shapesEx[i][k]);
								}
							} else { 
								console.log("Shapes Value Type " + shapesValueTypeNoEx[i][0]);
								console.log("Shapes Exponet " + shapesEx[i][0]);
								if (shapesValueTypeNoEx[i][0] === "constant") { // for constants
									shapesH[i][0] = 20/scaleEx;
									shapesW[i][0] = ((20*shapesValue[i][0])/scale)/shapesEx[i][0];
									console.log("constant");
								} else if (shapesEx[i][0] === 1) { // for variables without exponets
									var j;
									console.log("Exponet of 1");
									for (j = 1; j < weightVarsNoEx.length; j++) {   // find which size it should be
										if (shapesValueTypeNoEx[i][0] == weightVarsNoEx[j][0]) {
											break;
										}
									}
									shapesH[i] = (20/scaleEx) * shapesTermLength[i][0];
									shapesW[i] = ((sizes[j]*shapesValue[i][0])/scale)/shapesEx[i][0];
								} else if (shapesEx[i][0] > 1) { // for variables with exponets
									var j;
									console.log("Exponet of more than 1");
									for (j = 1; j < weightVarsNoEx.length; j++) {   // find which size it should be
										if (shapesValueTypeNoEx[i][0] == weightVarsNoEx[j]) {
											break;
										}
									}
									shapesH[i] = ((sizes[j] * (shapesEx[i][0] * 0.5))/scaleEx) * shapesTermLength[i][0];
									shapesW[i] = ((sizes[j]*shapesValue[i][0])/scale)/shapesEx[i][0];
								}
							}
						}
					}
				

			}
			if (shapesValue[i][0] == 1 ||shapesValue[i][0] == 2/3 || shapesValue[i][0] == 5/6) {
				shapesW[i] = 40;
				shapesH[i] = 40;
			} else if (shapesValue[i][0] == 0.5) {
				shapesW[i] = 40;
				shapesH[i] = 20;
			} else if (shapesValue[i][0] == 1/3) {
				shapesW[i] = 25;
				shapesH[i] = 20;
			} else if (shapesValue[i][0] == 1/6) {
				shapesW[i] = 20;
				shapesH[i] = 20;
			}
		}
		/*sizes = [20];     // Reset sizes array
		for (var i = 1; i < weightVarsNoEx.length; i++) {
			sizes.push(20+((20/weightVarsNoEx.length)*i));    // Add a different number to the array for each type of variable used
		}
		console.log(sizes);
		oldShapesLength = shapes.length;
		for (var i = 0; i < oldShapesLength; i++) {
				if (shapesValue[i].length < 2) {
					if (shapes[i] === 1) { // If the shape has a value
						console.log("Shapes Value Type " + shapesValueTypeNoEx[i][0]);
						console.log("Shapes Exponet " + shapesEx[i]);
						if (shapesValueTypeNoEx[i][0] === "constant") { // for constants
							shapesH[i] = 20/scaleEx;
							shapesW[i] = (20*shapesValue[i])/scale;
							console.log("constant");
						} else if (shapesEx[i][0] === 1) { // for variables without exponets
							var j;
							console.log("Exponet of 1");
							for (j = 1; j < weightVarsNoEx.length; j++) {   // find which size it should be
								if (shapesValueTypeNoEx[i] == weightVarsNoEx[j]) {
									break;
								}
							}
							if (shapesTermLength[i][0] >= 1) {
							    shapesH[i] = (20 * shapesTermLength[i][0])/scaleEx;
							} else {
							    shapesH[i] = 20/scaleEx;
							}
							shapesW[i] = (sizes[j]*shapesValue[i])/scale;
						} else if (shapesEx[i][0] > 1) { // for variables with exponets
							var j;
							console.log("Exponet of more than 1");
							for (j = 1; j < weightVarsNoEx.length; j++) {   // find which size it should be
								if (shapesValueTypeNoEx[i] == weightVarsNoEx[j]) {
									break;
								}
							}
							if (shapesTermLength[i][0] >= 1) {
								shapesH[i] = ((sizes[j] * (shapesEx[i][0] * 0.5))/scaleEx) * shapesTermLength[i][0];
							} else {
							shapesH[i] = ((sizes[j] * (shapesEx[i][0] * 0.5))/scaleEx);
							}
							shapesW[i] = ((sizes[j]*shapesValue[i])/shapesEx[i][0])/scale;
						}
					}
				} else {
					for (var k = 0; k < shapesValue[i].length; k++) {
						console.log(k);
						if (shapes[i] === 1) { // If the shape has a value
							if (k >= 1) {
								console.log("k > 1");
								shapes.push(shapes[i]);
								shapesX.push(shapesX[i]+shapesW[i]+20);
								shapesY.push(shapesY[i]+10);
								shapesVX.push(0);
								shapesVY.push(0);
								shapesValue.push([shapesValue[i][k]]);
								shapesValueType.push([shapesValueType[i][k]]);
								shapesValueTypeNoEx.push([shapesValueTypeNoEx[i][k]]);
								shapesTermLength.push([shapesTermLength[i][k]]);
								shapesEx.push([shapesEx[i][k]]);
								shapesText.push(shapesValue[shapesValue.length-1] + shapesValueType[shapesValueType.length-1]);
								// console.log("Shapes Value Type " + shapesValueTypeNoEx[shapes.length-1]);
								// console.log(shapesValueTypeNoEx);
								// console.log("Shapes Exponet " + shapesEx[shapes.length-1]);
								if (shapesValueTypeNoEx[shapes.length-1][0] === "constant") { // for constants
									shapesH.push(20/scaleEx);
									shapesW.push((20*shapesValue[shapes.length-1][0])/shapesEx[i][k]);
									console.log("constant");
								} else if (shapesEx[shapes.length-1][0] === 1) { // for variables without exponets
									var j;
									console.log("Exponet of 1");
									for (j = 1; j < weightVarsNoEx.length; j++) {   // find which size it should be
										if (shapesValueTypeNoEx[shapes.length-1][0] == weightVarsNoEx[j]) {
											break;
										}
									}
									shapesH.push((20/scaleEx) * shapesTermLength[i]);
									shapesW.push(((sizes[j]*shapesValue[shapes.length-1])/scale)/shapesEx[i][k]);
								} else if (shapesEx[shapes.length-1][0] > 1) { // for variables with exponets
									var j;
									console.log("Exponet of more than 1");
									for (j = 1; j < weightVarsNoEx.length; j++) {   // find which size it should be
										if (shapesValueTypeNoEx[shapes.length-1][0] == weightVarsNoEx[j]) {
											break;
										}
									}
									shapesH.push(((sizes[j] * (shapesEx[shapes.length-1][0] * 0.5))/scaleEx) * shapesTermLength[i][0]);
									shapesW.push(((sizes[j] * shapesValue[shapes.length-1][0])/scale)/shapesEx[i][k]);
								}
							} else { 
								console.log("Shapes Value Type " + shapesValueTypeNoEx[i][0]);
								console.log("Shapes Exponet " + shapesEx[i][0]);
								if (shapesValueTypeNoEx[i][0] === "constant") { // for constants
									shapesH[i][0] = 20/scaleEx;
									shapesW[i][0] = ((20*shapesValue[i][0])/scale)/shapesEx[i][0];
									console.log("constant");
								} else if (shapesEx[i][0] === 1) { // for variables without exponets
									var j;
									console.log("Exponet of 1");
									for (j = 1; j < weightVarsNoEx.length; j++) {   // find which size it should be
										if (shapesValueTypeNoEx[i][0] == weightVarsNoEx[j][0]) {
											break;
										}
									}
									shapesH[i] = (20/scaleEx) * shapesTermLength[i][0];
									shapesW[i] = ((sizes[j]*shapesValue[i][0])/scale)/shapesEx[i][0];
								} else if (shapesEx[i][0] > 1) { // for variables with exponets
									var j;
									console.log("Exponet of more than 1");
									for (j = 1; j < weightVarsNoEx.length; j++) {   // find which size it should be
										if (shapesValueTypeNoEx[i][0] == weightVarsNoEx[j]) {
											break;
										}
									}
									shapesH[i] = ((sizes[j] * (shapesEx[i][0] * 0.5))/scaleEx) * shapesTermLength[i][0];
									shapesW[i] = ((sizes[j]*shapesValue[i][0])/scale)/shapesEx[i][0];
								}
							}
						}
					}
				if (shapes[i] === 1) {
						shapesValue[i] = [shapesValue[i][0]];
						shapesValueType[i] = [shapesValueType[i][0]];
						shapesValueTypeNoEx[i] = [shapesValueTypeNoEx[i][0]];
						shapesTermLength[i] = [shapesTermLength[i][0]];
						shapesEx[i] = [shapesEx[i][0]];
						if (shapesValueType[i] != "constant") {
							shapesText[i] = shapesValue[i][0]+shapesValueType[i][0];
						} else {
							shapesText[i] = shapesValue[i][0];
						}
				}

			}
		}*/
	} else {
		for (var i = 0; i < shapes.length; i++) {
			if (shapes[i] === 1) {
				shapesH[i] = 30;
				shapesW[i] = shapesText[i].length * 15;
				console.log("TEXT");
			}
		}
	}
}

function contains(string, value) {
	for (var i = 0; i < string.length; i++) {
		if (string.charAt(i) === value) {
			return true;
		}
	}
	return false;
}

function clearCanvas() {	 	 // The function called by the Clear button
	location.reload();          // Reloads the page, thus clearing all text inputs
}


function findTypeFromString(string, start, end) {
	var returnV = [];
	if (start != null) {
		for (var i = start; i < end; i++) {
			if (string.charAt(i) == "0" || string.charAt(i) == "1" || string.charAt(i) == "2" || string.charAt(i) == "3" || string.charAt(i) == "4" || string.charAt(i) == "5" || string.charAt(i) == "6" || string.charAt(i) == "7" || string.charAt(i) == "8" || string.charAt(i) == "9") {
				returnV[i] = "num";
			} else if (string.charAt(i) == "^" && (string.charAt(i-1) == "a" || string.charAt(i-1) == "b" || string.charAt(i-1) == "c" || string.charAt(i-1) == "d" || string.charAt(i-1) == "e" || string.charAt(i-1) == "f" || string.charAt(i-1) == "g" || string.charAt(i-1) == "h" || string.charAt(i-1) == "i" || string.charAt(i-1) == "j" || string.charAt(i-1) == "k" || string.charAt(i-1) == "l" || string.charAt(i-1) == "m" || string.charAt(i-1) == "n" || string.charAt(i-1) == "o" || string.charAt(i-1) == "p" || string.charAt(i-1) == "q" || string.charAt(i-1) == "r" || string.charAt(i-1) == "s" || string.charAt(i-1) == "t" || string.charAt(i-1) == "u" || string.charAt(i-1) == "v" || string.charAt(i-1) == "w" || string.charAt(i-1) == "x" || string.charAt(i-1) == "y" || string.charAt(i-1) == "z")) {
				returnV[i] = "exponet";
			} else if (string.charAt(i) == "+" || string.charAt(i) == "-" || string.charAt(i) == "*" || string.charAt(i) == "/" || string.charAt(i) == "^") {
				returnV[i] = "op";
			} else if (string.charAt(i) == "(" || string.charAt(i) == ")" || string.charAt(i) == "{" || string.charAt(i) == "}" || string.charAt(i) == "[" || array [i] == "]") {
				returnV[i] = "group";
			} else if (string.charAt(i) == "a" || string.charAt(i) == "b" || string.charAt(i) == "c" || string.charAt(i) == "d" || string.charAt(i) == "e" || string.charAt(i) == "f" || string.charAt(i) == "g" || string.charAt(i) == "h" || string.charAt(i) == "i" || string.charAt(i) == "j" || string.charAt(i) == "k" || string.charAt(i) == "l" || string.charAt(i) == "m" || string.charAt(i) == "n" || string.charAt(i) == "o" || string.charAt(i) == "p" || string.charAt(i) == "q" || string.charAt(i) == "r" || string.charAt(i) == "s" || string.charAt(i) == "t" || string.charAt(i) == "u" || string.charAt(i) == "v" || string.charAt(i) == "w" || string.charAt(i) == "x" || string.charAt(i) == "y" || string.charAt(i) == "z") {
				returnV[i] = "letter";
			} else if (string.charAt(i) == ".") {
				returnV[i] = "decimal";
			} else {
				returnV[i] = "unknown";
			}
		}
	} else {
		for (var i = 0; i < string.length; i++) {
			if (string.charAt(i) == "0" || string.charAt(i) == "1" || string.charAt(i) == "2" || string.charAt(i) == "3" || string.charAt(i) == "4" || string.charAt(i) == "5" || string.charAt(i) == "6" || string.charAt(i) == "7" || string.charAt(i) == "8" || string.charAt(i) == "9") {
				returnV[i] = "num";
			} else if (string.charAt(i) == "^" && (string.charAt(i-1) == "a" || string.charAt(i-1) == "b" || string.charAt(i-1) == "c" || string.charAt(i-1) == "d" || string.charAt(i-1) == "e" || string.charAt(i-1) == "f" || string.charAt(i-1) == "g" || string.charAt(i-1) == "h" || string.charAt(i-1) == "i" || string.charAt(i-1) == "j" || string.charAt(i-1) == "k" || string.charAt(i-1) == "l" || string.charAt(i-1) == "m" || string.charAt(i-1) == "n" || string.charAt(i-1) == "o" || string.charAt(i-1) == "p" || string.charAt(i-1) == "q" || string.charAt(i-1) == "r" || string.charAt(i-1) == "s" || string.charAt(i-1) == "t" || string.charAt(i-1) == "u" || string.charAt(i-1) == "v" || string.charAt(i-1) == "w" || string.charAt(i-1) == "x" || string.charAt(i-1) == "y" || string.charAt(i-1) == "z")) {
				returnV[i] = "exponet";
			} else if (string.charAt(i) == "+" || string.charAt(i) == "-" || string.charAt(i) == "*" || string.charAt(i) == "/" || string.charAt(i) == "^") {
				returnV[i] = "op";
			} else if (string.charAt(i) == "(" || string.charAt(i) == ")" || string.charAt(i) == "{" || string.charAt(i) == "}" || string.charAt(i) == "[" || string.charAt(i) == "]") {
				returnV[i] = "group";
			} else if (string.charAt(i) == "a" || string.charAt(i) == "b" || string.charAt(i) == "c" || string.charAt(i) == "d" || string.charAt(i) == "e" || string.charAt(i) == "f" || string.charAt(i) == "g" || string.charAt(i) == "h" || string.charAt(i) == "i" || string.charAt(i) == "j" || string.charAt(i) == "k" || string.charAt(i) == "l" || string.charAt(i) == "m" || string.charAt(i) == "n" || string.charAt(i) == "o" || string.charAt(i) == "p" || string.charAt(i) == "q" || string.charAt(i) == "r" || string.charAt(i) == "s" || string.charAt(i) == "t" || string.charAt(i) == "u" || string.charAt(i) == "v" || string.charAt(i) == "w" || string.charAt(i) == "x" || string.charAt(i) == "y" || string.charAt(i) == "z") {
				returnV[i] = "letter";
			} else if (string.charAt(i) == ".") {
				returnV[i] = "decimal";
			} else {
				returnV[i] = "unknown";
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
	var negative = [1];
	var exponets = [0];
	var containsDecimal = [0];
	var fractions = ["no"];
	for (var i = 0; i < string.length; i++) {
		if (val[i] === "num" && val[i-1] != "exponetNum") {
			if (fractions[fractions.length-1] != "no") {
				fractions[fractions.length-1] *= 10;
				console.log("frac");
				console.log(fractions);
				fractions[fractions.length-1] += parseInt(string.charAt(i));
			} else if (containsDecimal[containsDecimal.length-1] === 0) {
				terms[terms.length-1] *= 10;
				console.log("num");
				terms[terms.length-1] += parseInt(string.charAt(i));
			} else {
				console.log("num");
				terms[terms.length-1] += parseInt(string.charAt(i))/(10 * containsDecimal[containsDecimal.length-1]);
				containsDecimal[containsDecimal.length-1] *= 10;
			}
		} else if (string.charAt(0) == "-" && i === 0) {
			negative[negative.length-1] = -1;
		} else if (val[i] === "op" && string.charAt(i) == "/") {
			fractions[fractions.length-1] = 0;
			console.log("/");
		} else if (val[i] === "op") {
			fractions.push("no");
			terms.push(0);
			negative.push(1);
			if (string.charAt(i) === "-") {
				negative[negative.length-1] = -1;
			}
			exponets.push(0);
			console.log("sym");
			termsType.push("constant");
			operators.push(string.charAt(i));
			containsDecimal.push(0);
		} else if (val[i] === "letter") {
			console.log("var");
			exponets[exponets.length-1] = 1;
			if (termsType[termsType.length-1] === "constant") {
				termsType[termsType.length-1] = string.charAt(i);
			} else {
				termsType[termsType.length-1] = termsType[termsType.length-1] + string.charAt(i);
			}
		} else if (val[i] === "exponet") {
			console.log("exponet");
			exponets[exponets.length-1] = string.charAt(i+1);
			var k = 2;
			while (string.charAt(i+k) == "1" || string.charAt(i+k) == "2"|| string.charAt(i+k) == "3" || string.charAt(i+k) == "4" || string.charAt(i+k) == "5" || string.charAt(i+k) == "6" || string.charAt(i+k) == "7" || string.charAt(i+k) == "8" || string.charAt(i+k) == "9" || string.charAt(i+k) == "0") {
				exponets[exponets.length-1] += string.charAt(i+k);
				val[i+k] = "exponetNum";
				k++;
			} 
		} else if (val[i] === "decimal") {
			console.log("decimal");
			containsDecimal[containsDecimal.length-1] = 1;
		}
	}
	for (var i = 0; i < terms.length; i++) {
		if (fractions[i] != "no") {
			terms[i] = terms[i]/fractions[i];
		}
		terms[i] *= negative[i];	
		if (terms[i] === 0 && termsType[i] != "constant" && negative[i] === -1) {
			terms[i] = -1;
		} else if (terms[i] === 0 && termsType[i] != "constant" && negative[i] === 1) {
			terms[i] = 1;
		}
	}
	
	if (terms.length > 1) {
		for (var i = 0; i < terms.length; i++) {
			if (terms[i] === 0 && termsType[i] != "constant") {
				terms[i] = 1;
			}
		}
		// for (var i = 0; i < terms.length; i++) {
			// for (var j = 0; j < terms.length; j++) {
				// if (j != i && termsType[i] === termsType[j] && (val[i] === "letter" || val[i] === "num")) {
					// if (operators[i] === "+" || operators[i] ===  "-") {
						// terms[i] += terms[j];
					// } else if (operators[i] === "*") {
						// terms[i] *= terms[j];
					// } else if (operators[i] === "/") {
						// terms[i] /= terms[j];
					// }
					// terms.splice(j, 1);
					// termsType.splice(j, 1);
				// }
			// }

		// }
		var isConstant = true;
		for (var i = 0; i<terms.length; i++) {
			if (termsType[i] != "constant") {
				isConstant = false;
			}
		}
		if (isConstant) {
			terms[0] = eval(string);
			termsType[0] = "constant";
			exponets[0] = 0;
			while (terms.length > 1) {
				terms.splice(1, 1);
				termsType.splice(1, 1);
				exponets.splice(1, 1);
			}
		}
	}
	console.log("terms: ");
	console.log(terms);
	console.log("terms type: ");
	console.log(termsType);
	console.log("terms: ");
	console.log(terms);
	console.log("terms type: ");
	console.log(termsType);
	console.log("Exponets: " + exponets);
	return [terms, exponets];
}


function findTypeOfString(string) {
	var val = findTypeFromString(string);
	var terms = [0];
	var termsType = ["constant"];
	var negative = [1];
	var exponets = [0];
	var operators = [];
	var termLength = [1];
	var containsDecimal = [0];
	var fractions = ["no"];
	for (var i = 0; i < string.length; i++) {
		if (val[i] === "num" && val[i-1] != "exponetNum") {
			if (fractions[fractions.length-1] != "no") {
				fractions[fractions.length-1] *= 10;
				console.log("frac");
				console.log(fractions);
				fractions[fractions.length-1] += parseInt(string.charAt(i));
			} else if (containsDecimal[containsDecimal.length-1] === 0) {
				terms[terms.length-1] *= 10;
				console.log("num");
				terms[terms.length-1] += parseInt(string.charAt(i));
			} else {
				console.log("num");
				terms[terms.length-1] += parseInt(string.charAt(i))/(10 * containsDecimal[containsDecimal.length-1]);
				containsDecimal[containsDecimal.length-1] *= 10;
			}
		} else if (string.charAt(i) == "-" && i === 0) {
			negative[negative.length-1] = -1;
		} else if (val[i] === "op" && string.charAt(i) == "/") {
			fractions[fractions.length-1] = 0;
			console.log("/");
		} else if (val[i] === "op") {
			fractions.push("no");
			terms.push(0);
			negative.push(1);
			if (string.charAt(i) === "-") {
				negative[negative.length-1] = -1;
			}
			exponets.push(0);
			// console.log("sym");
			termsType.push("constant");
			operators.push(string.charAt(i));
			containsDecimal.push(0);
		} else if (val[i] === "letter") {
			// console.log("var");
			if (termsType[termsType.length-1] === "constant") {
				termsType[termsType.length-1] = string.charAt(i);
			} else {
				termsType[termsType.length-1] = termsType[termsType.length-1] + string.charAt(i);
				termLength[termLength.length-1]++;
			}
		} else if (val[i] === "exponet") {
			exponets[exponets.length-1] = string.charAt(i+1);
			var k = 2;
			while (string.charAt(i+k) == "1" || string.charAt(i+k) == "2"|| string.charAt(i+k) == "3" || string.charAt(i+k) == "4" || string.charAt(i+k) == "5" || string.charAt(i+k) == "6" || string.charAt(i+k) == "7" || string.charAt(i+k) == "8" || string.charAt(i+k) == "9" || string.charAt(i+k) == "0") {
				exponets[exponets.length-1] += string.charAt(i+k);
				val[i+k] = "exponetNum";
				k++;
			} 
		} else if (val[i] === "decimal") {
			// console.log("decimal");
			containsDecimal[containsDecimal.length-1] = 1;
		}
	}

	for (var i = 0; i < terms.length; i++) {
		if (fractions[i] != "no") {
			terms[i] = terms[i]/fractions[i];
		}
		terms[i] *= negative[i];
		if (terms[i] === 0 && termsType[i] != "constant" && negative[i] === -1) {
			terms[i] = -1;
		} else if (terms[i] === 0 && termsType[i] != "constant" && negative[i] === 1) {
			terms[i] = 1;
		}
	}

	if (terms.length > 1) {
		for (var i = 0; i < terms.length; i++) {
			if (terms[i] === 0 && termsType[i] != "constant") {
				terms[i] = 1;
			}
		}
		for (var i = 0; i < terms.length; i++) {
			for (var j = 0; j < terms.length; j++) {
				if (j != i && termsType[i] === termsType[j] && (val[i] === "letter" || val[i] === "num")) {
					if (operators[i] === "+" || "-") {
						terms[i] += terms[j];
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
		var isConstant = true;
		for (var i = 0; i<terms.length; i++) {
			if (termsType[i] != "constant") {
				isConstant = false;
			}
		}
		if (isConstant) {
			terms[0] = eval(string);
			termsType[0] = "constant";
			exponets[0] = 0;
			while (terms.length > 1) {
				terms.splice(1, 1);
				termsType.splice(1, 1);
				exponets.splice(1, 1);
			}
		}
	}
	console.log("real terms type");
	console.log(termsType);
	return [termsType, termLength];
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
		if (contains(leftinput, "'")) {
			shapesValue.push(0);
			shapes[shapes.length-1] = 0;
			console.log("comment");
			shapesText[shapesText.length-1] = leftinput;
		} else {
			shapesTermLength.push(0);
			shapesValue.push(findValueOfString(leftinput)[0]);
			shapesEx.push(findValueOfString(leftinput)[1]);
			console.log(shapesEx[shapesEx.length-1]);
			shapesValueType.push([0]);
			shapesValueTypeNoEx.push([0]);
			// For each term
			for (var i = 0; i < shapesValue[shapesValue.length-1].length; i++) {
				console.log(shapesEx[shapesEx.length-1][i]);
				if (shapesEx[shapesEx.length-1][i] != 0 && shapesEx[shapesEx.length-1][i] != 1) { // If there is an exponet
					shapesValueType[shapesValueType.length-1][i] = findTypeOfString(leftinput)[0][i] + "^" + shapesEx[shapesEx.length-1][0];
					console.log("ex");
					console.log(findTypeOfString(leftinput)[0][i] + "^" + shapesEx[shapesEx.length-1][0]);
					shapesValueTypeNoEx[shapesValueTypeNoEx.length-1][i] = findTypeOfString(leftinput)[0][i];
				} else {
					shapesValueType[shapesValueType.length-1][i] = findTypeOfString(leftinput)[0][i];
					shapesValueTypeNoEx[shapesValueTypeNoEx.length-1][i] = findTypeOfString(leftinput)[0][i];
				}
				// console.log(shapesValueType[shapes.length-1][i]);
				/*if (shapesValue[shapes.length-1][i] == 0 && shapesValueType[shapesValueType.length-1][i] != "constant") {
					shapesValue[shapes.length-1][i] = 1;
				}*/
			}
			shapesTermLength[shapesTermLength.length-1] = (findTypeOfString(leftinput)[1]);
			console.log("Shape Term Length: " + shapesTermLength[shapes.length-1]);
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
		if (contains(rightinput, "'")) {
			shapesValue.push(0);
			shapes[shapes.length-1] = 0;
			console.log("comment");
			shapesText[shapesText.length-1] = rightinput;
		} else {
			shapesTermLength.push(0);
			shapesValue.push(findValueOfString(rightinput)[0]);
			shapesEx.push(findValueOfString(rightinput)[1]);
			console.log(shapesEx[shapesEx.length-1]);
			// For each term
			shapesValueType.push([0]);
			shapesValueTypeNoEx.push([0]);
			for (var i = 0; i < shapesValue[shapesValue.length-1].length; i++) {
				console.log(shapesEx[shapesEx.length-1][i]);
				if (shapesEx[shapesEx.length-1][i] != 0 && shapesEx[shapesEx.length-1][i] != 1) {
					shapesValueType[shapesValueType.length-1][i] = findTypeOfString(rightinput)[0][i] + "^" + shapesEx[shapesEx.length-1][0];
					console.log("ex");
					console.log(findTypeOfString(rightinput)[0][i] + "^" + shapesEx[shapesEx.length-1][0]);
					shapesValueTypeNoEx[shapesValueType.length-1][i] = findTypeOfString(rightinput)[0][i];
				} else {
					shapesValueType[shapesValueType.length-1][i] = findTypeOfString(rightinput)[0][i];
					shapesValueTypeNoEx[shapesValueType.length-1][i] = findTypeOfString(rightinput)[0][i];
				}
				console.log(shapesValueType[shapes.length-1][i]);
				// if (shapesValue[shapes.length-1][i] == 0 && shapesValueType[shapesValueType.length-1][i] != "constant") {
					// shapesValue[shapes.length-1][i] = 1;
				// }
			}
			shapesTermLength[shapesTermLength.length-1] = (findTypeOfString(rightinput)[1]);
			console.log("Shape Term Length: " + shapesTermLength[shapes.length-1]);
		}
		// console.log(shapesValue[shapesValue.length-1]);
		// console.log(shapesValueType[shapesValue.length-1]);
	}
	if (shapesOn) {
		shapesOn = false;
		switchShapesAndText();
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
	canvasW = canvas.getBoundingClientRect().width;
	canvasH = canvas.getBoundingClientRect().height;
	// console.log(canvasW + " " + canvasH);
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
	for (var i = 0; i<shapes.length; i++) {
		if (shapesOn) {
				var color = 0;
				for (var j = 0; j < variables.length; j++) {
					if (variables[j] == shapesValueType[i][0]) {
						color = j;
					}
				}
				if (shapes[i] === 0) {
					d.fillStyle = colors[color];
					d.beginPath();
					d.moveTo(shapesX[i] + (40/4), shapesY[i]);
					d.lineTo(shapesX[i] + ((40/4)*3), shapesY[i]);
					d.lineTo(shapesX[i] + 40, shapesY[i]+(40/2));
					d.lineTo(shapesX[i] + ((40/4)*3), shapesY[i]+40);
					d.lineTo(shapesX[i] + (40/4), shapesY[i]+40);
					d.lineTo(shapesX[i], shapesY[i]+(40/2));
					d.lineTo(shapesX[i] + (40/4), shapesY[i]);
					d.fill();
					d.font = "30px Arial";
					d.fillStyle = "#000000";
					d.fillText(shapesText[i], shapesX[i], shapesY[i] + 40);
				} else if (shapes[i] === 1) {
					d.fillStyle = colors[color];
					if (shapesValue[i][0] === 1) {
						d.beginPath();
						d.moveTo(shapesX[i] + (40/4), shapesY[i]);
						d.lineTo(shapesX[i] + ((40/4)*3), shapesY[i]);
						d.lineTo(shapesX[i] + 40, shapesY[i]+(40/2));
						d.lineTo(shapesX[i] + ((40/4)*3), shapesY[i]+40);
						d.lineTo(shapesX[i] + (40/4), shapesY[i]+40);
						d.lineTo(shapesX[i], shapesY[i]+(40/2));
						d.lineTo(shapesX[i] + (40/4), shapesY[i]);
						d.fill();			
					} else if (shapesValue[i][0] === 0.5) {
						d.beginPath();
						d.moveTo(shapesX[i], shapesY[i]+(40/2)-20);
						d.lineTo(shapesX[i] + 40, shapesY[i]+(40/2)-20);
						d.lineTo(shapesX[i] + ((40/4)*3), shapesY[i]+40-20);
						d.lineTo(shapesX[i] + (40/4), shapesY[i]+40-20);
						d.lineTo(shapesX[i], shapesY[i]+(40/2)-20);
						d.fill();		
					} else if (shapesValue[i][0] === 1/3) {
						d.beginPath();
						d.moveTo(shapesX[i] + (40/2), shapesY[i]);
						d.lineTo(shapesX[i] + ((40/4)*3), shapesY[i]+20);
						d.lineTo(shapesX[i] + (40/4), shapesY[i]+20);
						d.lineTo(shapesX[i], shapesY[i]);
						d.lineTo(shapesX[i] + (40/2), shapesY[i]);
						d.fill();			
					} else if (shapesValue[i][0] === 1/6) {
						d.beginPath();
						d.moveTo(shapesX[i] + (40/2)-7, shapesY[i]);
						d.lineTo(shapesX[i] + ((40/4)*3)-7, shapesY[i]+20);
						d.lineTo(shapesX[i] + (40/4)-7, shapesY[i]+20);
						d.lineTo(shapesX[i] + (40/2)-7, shapesY[i]);
						d.fill();			
					} else if (shapesValue[i][0] === 5/6) {
						d.beginPath();
						d.moveTo(shapesX[i] + (40/4), shapesY[i]);
						d.lineTo(shapesX[i]+(40/2), shapesY[i]+40/2);
						d.lineTo(shapesX[i] + ((40/4)*3), shapesY[i]);
						d.lineTo(shapesX[i] + 40, shapesY[i]+(40/2));
						d.lineTo(shapesX[i] + ((40/4)*3), shapesY[i]+40);
						d.lineTo(shapesX[i] + (40/4), shapesY[i]+40);
						d.lineTo(shapesX[i], shapesY[i]+(40/2));
						d.lineTo(shapesX[i] + (40/4), shapesY[i]);
						d.fill();						
					} else if (shapesValue[i][0] === 2/3) {
						d.beginPath();
						d.moveTo(shapesX[i] + (40/4), shapesY[i]);
						d.lineTo(shapesX[i]+(40/2), shapesY[i]+40/2);
						d.lineTo(shapesX[i] + 40, shapesY[i]+(40/2));
						d.lineTo(shapesX[i] + ((40/4)*3), shapesY[i]+40);
						d.lineTo(shapesX[i] + (40/4), shapesY[i]+40);
						d.lineTo(shapesX[i], shapesY[i]+(40/2));
						d.lineTo(shapesX[i] + (40/4), shapesY[i]);
						d.fill();						
					} else {
						if (shapes[i] === 0) {
							d.fillStyle = "#008800";
							d.fillRect(shapesX[i], shapesY[i], shapesW[i], shapesH[i]);
							d.font = "30px Arial";
							d.fillStyle = "#000000";
							d.fillText(shapesText[i], shapesX[i], shapesY[i] + shapesH[i]);
						} else if (shapes[i] === 1) {
							d.font = "30px Arial";
							d.fillStyle = "#555555";
							d.fillText(shapesText[i], shapesX[i], shapesY[i] + shapesH[i]);
						}
					}
				}
		} 
		if (!shapesOn) {
			for (var i = 0; i<shapes.length; i++) {
				if (shapes[i] === 0) {
					d.fillStyle = "#008800";
					d.fillRect(shapesX[i], shapesY[i], shapesW[i], shapesH[i]);
					d.font = "30px Arial";
					d.fillStyle = "#000000";
					d.fillText(shapesText[i], shapesX[i], shapesY[i] + shapesH[i]);
				} else if (shapes[i] === 1) {
					d.font = "30px Arial";
					d.fillStyle = "#555555";
					d.fillText(shapesText[i], shapesX[i], shapesY[i] + shapesH[i]);
				}
			}
		}
	}
}

function update() {
	// Move Shapes
	for (var i = 0; i < shapes.length; i++) {
		shapesX[i] += shapesVX[i]; // Change X
		shapesY[i] += shapesVY[i]; // Change Y
		var xDone = false;
		var yDone = false;

		if (shapesVX[i] != 0 && shapesVY[i] == 0) { // friction
			for (var j = 0; j < 2; j++) {
				if (shapesVX[i] > 0) {
					shapesVX[i] -= 0.5;
				} else if (shapesVX[i] < 0) {
					shapesVX[i] += 0.5;
				}
				shapesVX[i] = Math.floor(shapesVX[i]*2)/2; // round value to halves
			}
		} else if (shapesVX[i] != 0) { // Air resistance
			if (shapesVX[i] > 0) {
				shapesVX[i] -= 0.05;
			} else {
				shapesVX[i] += 0.05;
			}
			// shapesVX[i] = Math.floor(shapesVX[i]*2)/2; // round value to halves
		}
		if (shapesX[i] < 0) { // stop from going off the left side of the screen
			shapesX[i] = 0;
		} else if (shapesX[i] > 1000 - shapesW[i]) { // stop from going off the right side.
			shapesX[i] = 1000 - shapesW[i];
		} else if (shapesVX[i] != 0) {
			for (var j = 0; j < shapes.length; j++) {
				if (shapesVX[j] === 0 && j != i) { // for all other shapes moving that is not this shape
					if ((shapesX[i] + shapesW[i] >= shapesX[j] && shapesX[i] + shapesW[i] <= shapesX[j] + shapesW[j]) && (shapesY[i] + shapesH[i] >= shapesY[j] + (shapesH[j] * 0.3) && shapesY[i] <= shapesY[j] + shapesH[j])) { // collide with other shapes from the left
						shapesVX[i] *= -0.8;
						setTimeout(function () {shapesX[i] = shapesX[j] - shapesW[i] - 1;}, 10);
						xDone = true;
					} else if ((shapesX[i] >= shapesX[j] && shapesX[i] <= shapesX[j] + shapesW[j]) && (shapesY[i] + shapesH[i] >= shapesY[j] + (shapesH[j] * 0.3) && shapesY[i] <= shapesY[j] + shapesH[j])) { // collide with other shapes from the right
						shapesVX[i] *= -0.8;
						setTimeout(function () {shapesX[i] = shapesX[j] + shapesW[i] + 1;}, 10);
						xDone = true;
					}
				}
			}
		}
		shapesVY[i] += 1; // gravity
		if (shapesY[i] >= 210 - shapesH[i] + scaleHeight && shapesY[i] <= 230 - shapesH[i] + scaleHeight && shapesVY[i] > 0 && (shapesX[i] < 440) && shapesX[i] > 40 - shapesW[i]) { // collide with left scale
			shapesVY[i] = 0;
			shapesY[i] = 210 - shapesH[i] + scaleHeight;
		} else if (shapesY[i] >= 210 - shapesH[i] - scaleHeight && shapesY[i] <= 230 - shapesH[i] - scaleHeight && shapesVY[i] > 0 && (shapesX[i] > 560) && shapesX[i] < 960) { // collide with right scale
			shapesVY[i] = 0;
			shapesY[i] = 210 - shapesH[i] - scaleHeight;
		} else if (shapesY[i] >= 460 - shapesH[i]) { // collide with ground
			shapesVY[i] = 0;
			shapesY[i] = 460 - shapesH[i];
		} else if (shapesVY[i] != 0) {
			for (var j = 0; j < shapes.length; j++) {
				if (shapesVY[j] === 0 && j != i && shapesY[j] >= shapesY[i] + (shapesH[i]*6/10)) { // for all other shapes that are not moving and below this shape
					if (shapesY[i] + shapesH[i] >= shapesY[j] && shapesY[i] + shapesH[i] <= shapesY[j] + shapesH[j] && (shapesX[i] + shapesW[i] >= shapesX[j] && shapesX[i] <= shapesX[j] + shapesW[j])) { // collide downwards
						shapesVY[i] = 0;
						shapesY[i] = shapesY[j] - shapesH[i];
					}
				}
			}
		} 
		if (shapesVY[i] === 0) {
			for (var j = 0; j < shapes.length; j++) {
				if (shapesVY[j] === 0 && shapesVX[j] === 0 && j != i && !xDone) {
					if (((shapesX[i] <= shapesX[j] && shapesX[i] + shapesW[i] >= shapesX[j]) || (shapesX[i] <= shapesX[j] + shapesW[j] && shapesX[i] + shapesW[i] >= shapesX[j] + shapesW[j]) || (shapesX[i] <= shapesX[j] && shapesX[i] + shapesW[i] >= shapesX[j] + shapesW[j])) && (shapesY[i]+shapesH[i] === shapesY[j]+shapesH[j])) {
						if (shapesH[i] >= shapesH[j]) {
							shapesY[i] -= shapesH[j];
							console.log("problem");
						} else {
							shapesY[j] -= shapesH[i];
							console.log("problem");						
						}
					}
				}
			}
		}
		if (selected == i) {
			shapesX[i] = mx - (shapesW[i]/2);
			shapesY[i] = my - (shapesH[i]/2);
		}
		if (shapesX[i] * 0 != 0) {
			shapesX[i] = 1;
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
		weightEx = [1];
		//For each shape
		for (var i = 0; i < shapesValue.length; i++) {
			// For each term in the shape
			for (var k = 0; k < shapesValue[i].length; k++) {
				var valueTypeNum = -1;
				// For each variable used
				for (var j = 0; j < weightVars.length; j++) {
					//If the variable of the shape is the same as j, set the variable type number to j
					if (shapesValueType[i][k] === weightVars[j]) {
						valueTypeNum = j;
					}
				}
				// If it is a previously unused variable, add it to weightVars
				if (valueTypeNum === -1) {
					valueTypeNum = weightVars.length;
					weightVars.push(shapesValueTypeNoEx[i][k]);
					weightEx.push(parseInt(shapesEx[i][k]));
				}

				// Add the value into the leftweight or rightweight arrays.
				if (shapesY[i]+shapesH[i] <= 210+scaleHeight && shapesY[i]+shapesH[i] >= 140 + scaleHeight) {
					if (shapesX[i] < 500) {
						if (valueTypeNum < leftweight.length) {
							leftweight[valueTypeNum] += shapesValue[i][k];
						} else {
							while (leftweight.length < weightVars.length-1) {
								leftweight.push(0);
							}
							leftweight.push(shapesValue[i][k]);
						}
					}
				}
				if (shapesY[i]+shapesH[i] <= 210 - scaleHeight && shapesY[i]+shapesH[i] >= 140-scaleHeight && shapesX[i] >=500) {
					if (valueTypeNum < rightweight.length) {
						rightweight[valueTypeNum] += shapesValue[i][k];
					} else {
						while (rightweight.length < weightVars.length-1) {
							rightweight.push(0);
						}
						rightweight.push(shapesValue[i][k]);
					}
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
		// console.log(weightVars);
		while (leftweight.length > rightweight.length) {
			rightweight.push(0);
		}
		while (rightweight.length > leftweight.length) {
			leftweight.push(0);
		}
		for (var i = 0; i < leftweight.length; i++) {
			if (leftweight[i] != rightweight[i]) {
				differences.push(leftweight[i] - rightweight[i]);
				if (weightEx[i] > 1) {
					differences[differences.length-1] *= weightEx[i];
				}
				if (weightVars[i] != "constant") {
					differences[differences.length-1] *= weightVars[i].length;
				}
			}
		}
		// console.log("WeightVars:");
		// console.log(weightVars);
		// console.log("WeightEx: ");
		// console.log(weightEx);
		// console.log("Differences:");
		// console.log(differences);
		var difference = 0;
		for (var i = 0; i < differences.length; i++) {
			difference += differences[i];
		}
		if (difference < 0 && difference >= -50) {
			right = true;
			// console.log("right");
			scaleHeight = -10;
		} else if (difference > 0 && difference < 50) {
			left = true;
			// console.log("left");
			scaleHeight = 10;

		} else if (difference === 0) {
			equal = true;
			// console.log("Equal");
			for (var i = 0; i < shapes.length; i++) {
				if (shapesY[i] <= 210 && scaleHeight != 0) {
					shapesY[i] -= 25;
				}
			}
			scaleHeight = 0;
		} else if (difference <= -50) {
			farRight = true;
			// console.log("far right");
			for (var i = 0; i < shapes.length; i++) {
				if (shapesY[i] <= 210 && scaleHeight != -25) {
					shapesY[i] -= 25;
				}
			}
			scaleHeight = -25;
		} else if (difference >= 50) {
			farLeft = true;
			// console.log("far Left");
			for (var i = 0; i < shapes.length; i++) {
				if (shapesY[i] <= 210 && scaleHeight != 25) {
					shapesY[i] -= 25;
				}
			}
			scaleHeight = 25;

		}
		// console.log(leftweight);
		// console.log(rightweight);
	}
}

document.addEventListener('mousemove', function(event) {
	mx = event.offsetX * (1015/canvasW);
	my = event.offsetY * (515/canvasH);
	var mxNow = mx;
	var myNow = my;
	setTimeout(function() {prevMx = mxNow; prevMy = myNow;}, 200);
});

document.addEventListener('mousedown', function(event) {
	mx = event.offsetX * (1015/canvasW);
	my = event.offsetY * (515/canvasH);
	// console.log(mx + " " + my);
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

document.addEventListener('keyup', function(event) {
	var code = event.keyCode;
	if (code == 13) {
		holdingEnter = false;
	} else if (code == 16) {
		holdingShift = false;
	} else if (holdingEnter && holdingShift) {
		if (code == 49) {
			newShape("1");
		} else if (code == 50) {
			newShape("1/2");
		} else if (code == 51) {
			newShape("1/3");
		} else if (code == 52) {
			newShape("1/4");
		} else if (code == 53) {
			newShape("1/5");
		} else if (code == 54) {
			newShape("1/6");
		} else if (code == 55) {
			newShape("1/7");
		} else if (code == 56) {
			newShape("1/8");
		} else if (code == 57) {
			newShape("1/9");
		}
	} else if (holdingEnter) {
		if (code == 49) {
			newShape("1");
		} else if (code == 50) {
			newShape("2");
		} else if (code == 51) {
			newShape("3");
		} else if (code == 52) {
			newShape("4");
		} else if (code == 53) {
			newShape("5");
		} else if (code == 54) {
			newShape("6");
		} else if (code == 55) {
			newShape("7");
		} else if (code == 56) {
			newShape("8");
		} else if (code == 57) {
			newShape("9");
		} else if (code == 83) {
			switchShapesAndText();
		} else if (code == 68) {
			darkMode();
		} else if (code == 67) {
			clearCanvas();
		} 
	}
});

document.addEventListener('keydown', function(event) {
	var code = event.keyCode;
	if (code == 13) {
		holdingEnter = true;
	} else if (code == 16) {
		holdingShift = true;
	}
});

function newShape(value) {
		shapes.push(1);
		shapesX.push(200);
		shapesY.push(100);
		shapesVX.push(0);
		shapesVY.push(0);
		shapesH.push(30);
		shapesW.push(value.length * 15);
		shapesText.push(value);
		if (contains(value, "'")) {
			shapesValue.push(0);
			shapes[shapes.length-1] = 0;
			console.log("comment");
			shapesText[shapesText.length-1] = value;
		} else {
			shapesTermLength.push(0);
			shapesValue.push(findValueOfString(value)[0]);
			shapesEx.push(findValueOfString(value)[1]);
			console.log(shapesEx[shapesEx.length-1]);
			shapesValueType.push([0]);
			shapesValueTypeNoEx.push([0]);
			// For each term
			for (var i = 0; i < shapesValue[shapesValue.length-1].length; i++) {
				shapesValueType[shapesValueType.length-1][i] = findTypeOfString(value)[0][i];
				shapesValueTypeNoEx[shapesValueTypeNoEx.length-1][i] = findTypeOfString(value)[0][i];
				// console.log(shapesValueType[shapes.length-1][i]);
				/*if (shapesValue[shapes.length-1][i] == 0 && shapesValueType[shapesValueType.length-1][i] != "constant") {
					shapesValue[shapes.length-1][i] = 1;
				}*/
			}
			shapesTermLength[shapesTermLength.length-1] = (findTypeOfString(leftinput)[1]);
			console.log("Shape Term Length: " + shapesTermLength[shapes.length-1]);
		}
		
		console.log(shapesValue[shapesValue.length-1]);
		console.log(shapesValueType[shapesValue.length-1]);


	if (shapesOn) {
		shapesOn = false;
		switchShapesAndText();
	}
	if (eval(leftinput) == eval(rightinput)) {
		document.getElementById("status").style.backgroundColor = "green";
		document.getElementById("status").innerHTML = "Equal";
	} else {
		document.getElementById("status").style.backgroundColor = "red";
		document.getElementById("status").innerHTML = "Not Equal";
	}

}
