console.log("Hello World!");

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

class Player {
	constructor(){
		this.height = 100;
		this.width = 50;
		this.posX = 0;
		this.posY = canvas.height - this.height;
		this.velX = 0;
		this.velY = 0;
		this.gravY = 1;
		this.dragX = 1;
		this.jumpY = 20;
	}
	// Player Controls
	move(){
		console.log(event.keyCode);
		this.right();
		this.left();
		this.jump();
	}
	right(){
		if(event.keyCode == 39){
			if(this.posX <= canvas.width - this.width){
				this.velX += 10;
			} else {
				this.posX = 0;
			}
			this.dragX = 1;
		}
	}
	left(){
		if(event.keyCode == 37){
			console.log("Left");
			if(this.posX >= 0){
				this.velX += -10;
			} else {
				this.posX = 0;
			}
			this.dragX = 1;
		}
	}
	jump(){
		if(event.keyCode == 38){
			console.log("Up");
			if(this.posY == canvas.height - this.height){
				this.velY += -this.jumpY;
				this.dragX = 0.5;
			}
		}
	}
	// Player Rendering
	update(){

		if(this.velX > 0){
			this.velX += -this.dragX;
		} else if(this.velX < 0){
			this.velX += this.dragX;
		}
	
		this.posX += this.velX;
	
		if(this.posX > canvas.width - this.width){
			this.posX = canvas.width - this.width;
			this.velX = 0;
		}
		if(this.posX < 0){
			this.posX = 0;
			this.velX = 0;
		}
	
		this.velY += this.gravY;
		this.posY += this.velY;
	
		if(this.posY > canvas.height - this.height){
			this.posY = canvas.height - this.height;
			this.velY = 0;
		}
	}
	draw(){
		ctx.rect(this.posX, this.posY, this.width, this.height);
		ctx.stroke();
	}
}

class FloorPlatform {
	constructor(){
		this.height = 50;
		this.width = 100;
		this.posX = canvas.width - this.width;
		this.posY = canvas.height - this.height;
		this.velX = -2;
		this.velY = 0;
	}
	update(){
		this.posX += this.velX;
	}
	draw(){
		ctx.rect(this.posX, this.posY, this.width, this.height);
		ctx.stroke();
	}
	detectCollision(){
		if(this.detectOnTop() === true){
			player.posY = this.posY - player.height;
			player.velY = 0;
			console.log("Collision Top");
		}
		if(this.detectOnRight() === true){
			player.posX = this.posX + this.width;
			player.velX = 0;
			console.log("Collision Right");
		}
		if(this.detectOnLeft() === true){
			player.posX = this.posX - player.width;
			player.posX += this.velX;
			console.log("Collision Left");
		}
	}
	detectOnTop(){
		if((((player.posY + player.height) - this.posY > -(player.velY + player.gravY)) && ((player.posY + player.height) - this.posY < (player.velY + player.gravY))) && (((player.posX > this.posX) && (player.posX < this.posX + this.width)) || ((player.posX + player.width > this.posX) && (player.posX + player.width < this.posX + this.width)))){
			return true;
		} else {
			return false;
		}
	}
	detectOnRight(){
		if(((player.posX - (this.posX + this.width) > player.velX) && (player.posX - (this.posX + this.width) < -player.velX)) && (((player.posY > this.posY) && (player.posY < this.posY + this.height)) || ((player.posY + player.height <= this.posY + this.height) && (player.posY + player.height > this.posY)))){
			return true;
		} else {
			return false;
		}
	}
	detectOnLeft(){
		if((((player.posX + player.width) - this.posX > -(player.velX + player.dragX - this.velX)) && ((player.posX + player.width) - this.posX < (player.velX + player.dragX - this.velX))) && (((player.posY > this.posY) && (player.posY < this.posY + this.height)) || ((player.posY + player.height <= this.posY + this.height) && (player.posY + player.height > this.posY)))){
			return true;
		} else {
			return false;
		}
	}
}

class RaisedPlatform {
	constructor(){
		this.height = 50;
		this.width = 100;
		this.posX = canvas.width - this.width;
		this.posY = (canvas.height - this.height)* 3/4;
		this.velX = -1;
		this.velY = 0;
	}
	update(){
		this.posX += this.velX;
	}
	draw(){
		ctx.rect(this.posX, this.posY, this.width, this.height);
		ctx.stroke();
	}
	detectCollision(){
		if(this.detectOnTop() === true){
			player.posY = this.posY - player.height;
			player.velY = 0;
			console.log("Collision Top");
		}
		if(this.detectOnRight() === true){
			player.posX = this.posX + this.width;
			player.velX = 0;
			console.log("Collision Right");
		}
		if(this.detectOnBottom() === true){
			player.posY = this.posY + this.height;
			player.velY = 0;
			console.log("Collision Bottom");
		}
		if(this.detectOnLeft() === true){
			player.posX = this.posX - player.width;
			player.posX += this.velX;
			console.log("Collision Left");
		}
	}
	detectOnTop(){
		if((((player.posY + player.height) - this.posY > -(player.velY + player.gravY)) && ((player.posY + player.height) - this.posY < (player.velY + player.gravY))) && (((player.posX > this.posX) && (player.posX < this.posX + this.width)) || ((player.posX + player.width > this.posX) && (player.posX + player.width < this.posX + this.width)))){
			return true;
		} else {
			return false;
		}
	}
	detectOnRight(){
		if(((player.posX - (this.posX + this.width) > player.velX) && (player.posX - (this.posX + this.width) < -player.velX)) && (((player.posY > this.posY) && (player.posY < this.posY + this.height)) || ((player.posY + player.height <= this.posY + this.height) && (player.posY + player.height > this.posY)))){
			return true;
		} else {
			return false;
		}
	}
	detectOnBottom(){
		if(((player.posY - (this.posY + this.height) > player.velY) && (player.posY - (this.posY + this.height) < -player.velY)) && (((player.posX > this.posX) && (player.posX < this.posX + this.width)) || ((player.posX + player.width > this.posX) && (player.posX + player.width < this.posX + this.width)))){
			return true;
		} else {
			return false;
		}
	}
	detectOnLeft(){
		if((((player.posX + player.width) - this.posX > -(player.velX + player.dragX - this.velX)) && ((player.posX + player.width) - this.posX < (player.velX + player.dragX - this.velX))) && (((player.posY > this.posY) && (player.posY < this.posY + this.height)) || ((player.posY + player.height <= this.posY + this.height) && (player.posY + player.height > this.posY)))){
			return true;
		} else {
			return false;
		}
	}
}

// Game Initializer

let fps = 0;
let floorPlatforms = [];
let raisedPlatforms = [];
const player = new Player;

document.addEventListener("keydown", (event) => {
	player.move();
});

const playerRender = () => {
	player.update();
	player.draw();
}

const floorPlatformRender = () => {
	if(fps % 200 == 0){
		floorPlatforms.push(new FloorPlatform());
	}
	for(let i = floorPlatforms.length-1; i >= 0; i--){
		floorPlatforms[i].detectCollision();
		floorPlatforms[i].update();
		floorPlatforms[i].draw();
		if(floorPlatforms[i].posX + floorPlatforms[i].width === 0){
			floorPlatforms.splice(i, 1);
		}
	}
}

const raisedPlatformRender = () => {
	if(fps % 300 == 0){
		raisedPlatforms.push(new RaisedPlatform());
	}
	for(let i = raisedPlatforms.length-1; i >= 0; i--){
		raisedPlatforms[i].detectCollision();
		raisedPlatforms[i].update();
		raisedPlatforms[i].draw();
		if(raisedPlatforms[i].posX + raisedPlatforms[i].width === 0){
			raisedPlatforms.splice(i, 1);
		}
	}
}

const gameRender = () => {
	canvas.width = canvas.width;
	playerRender();
	floorPlatformRender();
	raisedPlatformRender();
	fps = window.requestAnimationFrame(gameRender);
}

gameRender();