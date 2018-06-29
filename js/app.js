console.log("Hello World!");

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

let name = "Player Name";
let height = 100;
let width = 50;
let x = 0;
let y = 300;//canvas.height - height;

// const draw = () =>{
	// ctx.beginPath();
	// ctx.rect(x, y, width, height);
	// ctx.fillStyle = "white";
	// ctx.fill();
	// ctx.closePath();
// }

const draw = () =>{
	canvas.width = canvas.width;
	ctx.rect (x, y, width, height);
	ctx.stroke();
}

const move = (event) => {
	console.log(event.keyCode);
	if(event.keyCode == 39){
		console.log("Right");
		if(x <= canvas.width - width){
			x += 5;
		} else {
			x = 0;
		}
	}
	if(event.keyCode == 37){
		console.log("Left");
		if(x >= 0){
			x += -5;
		} else {
			x = 0;
		}
	}
	if(event.keyCode == 38){
		console.log("Up");
		if(y = canvas.height - height){
			y += -200;
		} else {
			y = 0;
		}
	}
	draw();
}

const gravity = () =>{
	const gravityEngine = setInterval(function(){
		console.log("Gravity 1");
		if(y < canvas.height - height){
			y += 5;
			console.log("Gravity 2");
		} else if(y >= canvas.height){
			y = canvas.height;
			console.log("Gravity 3");
		}
		draw();
	}, 10);
}

draw();
gravity();
document.onkeydown = move;