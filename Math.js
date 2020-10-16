var c = document.getElementById("canvas");
var d = c.getContext("2d");
var shapes = [0];
var shapesX = [10];
var shapesY = [10];
var shapesVY = [2];
var shapesVX = [0];
var shapesH = [50];
var shapesW = [50];
var selected = -1;
var mx = 0;
var my = 0;

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
	d.fillRect(225, 242.5, 550, 15);
	d.fillRect(225, 230, 20, 15);
	d.fillRect(755, 230, 20, 15);
	
	//Left Scale
	d.fillRect(40, 210, 400, 20);
	
	//Right Scale
	d.fillRect(560, 210, 400, 20);
	
	//Render Shapes
	d.fillStyle = "#008800";
	for (var i = 0; i<shapes.length; i++) {
		d.fillRect(shapesX[i], shapesY[i], 50, 50);
	}
}

function update() {
	// Move Shapes
	for (var i = 0; i < shapes.length; i++) {
		shapesX[i] += shapesVX[i];
		shapesY[i] += shapesVY[i];
		shapesVY[i] += 0.45;
		if (shapesVX[i] != 0) {
			shapesVX[i] -= 0.1;
		}
		if (shapesY[i] >= 210 - shapesH[i] && shapesY[i] <= 230 - shapesH[i]) {
			shapesVY[i] = 0;
			shapesY[i] = 210 - shapesH[i];
		} else if (shapesY[i] >= 500 - shapesH[i]) {
			shapesVY[i] = 0;
			shapesY[i] = 500 - shapesH[i];
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
		selected = -1;
	}
});
