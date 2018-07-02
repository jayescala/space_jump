console.log("Hello World!");

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

// Controls
let name = "Player Name";
let height = 100;
let width = 50;
let fps = 0;
let posX = 0;
let posY = canvas.height - height;
let velX = 0;
let velY = 0;
let accX = 0;
let accY = 0;
let gravY = 1;
let dragX = 0.5;
let jumpY = 15;

// Frame Rendering
const renderPage = () => {
	update();
	draw();
	fps = window.requestAnimationFrame(renderPage);
}

const draw = () => {
	canvas.width = canvas.width;
	ctx.rect(posX, posY, width, height);
	ctx.stroke();
}

const update = () => {
	if(velX > 0){
		velX += -dragX;
	} else if(velX < 0){
		velX += dragX;
	}

	posX += velX;

	if(posX > canvas.width - width){
		posX = canvas.width - width;
		velX = 0;
	}
	if(posX < 0){
		posX = 0;
		velX = 0;
	}

	velY += gravY;
	posY += velY;

	if(posY > canvas.height - height){
		posY = canvas.height - height;
		velY = 0;
	}
}

// Actions

const jump = () => {
	velY += -jumpY;
}

const move = (event) => {
	console.log(event.keyCode);
	if(event.keyCode == 39){
		console.log("Right");
		if(posX <= canvas.width - width){
			velX += 10;
		} else {
			posX = 0;
		}
	}
	if(event.keyCode == 37){
		console.log("Left");
		if(posX >= 0){
			velX += -10;
		} else {
			posX = 0;
		}
	}
	if(event.keyCode == 38){
		console.log("Up");
		if(posY == canvas.height - height){
			jump();
		}
	}
}

renderPage();
document.onkeydown = move;