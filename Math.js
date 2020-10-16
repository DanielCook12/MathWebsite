c = document.getElementById("canvas");
d = c.getContext("2d");

render();
function render() {
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
}
