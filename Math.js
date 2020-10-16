c = document.getElementById("canvas");
d = c.getContext("2d");

render();
function render() {
	// Render Scale
	d.fillStyle = "#000000";
	
	d.beginPath();
	d.moveTo(500, 250);
	d.lineTo(325, 450);
	d.lineTo(675, 450);
	d.lineTo(500, 250);
	d.fill();
	
	d.beginPath();
	d.arc(500, 250, 40, 0, Math.PI*2);
	d.fill();
	
	d.fillRect(225, 242.5, 550, 15);
	d.fillRect(225, 230, 20, 15);
	d.fillRect(755, 230, 20, 15);
	
	d.fillRect(40, 210, 400, 20);
	d.fillRect(560, 210, 400, 20);
}
