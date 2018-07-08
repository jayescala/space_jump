console.log("Hello World!");

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

let teleporterImage = new Image();
teleporterImage.src = "img/teleporter_sprite.png";

teleporterImage.onload = function (posX, posY, width, height) {
	ctx.drawImage(teleporterImage, 4, 4, 30, 63, posX, posY, width, height);
}

let platformImage = new Image();
platformImage.src = "img/platform_sprite.png";

platformImage.onload = function (posX, posY, width, height) {
	ctx.drawImage(platformImage, 4, 16, 46, 5, posX, posY, width, height);
}

let robotImage = new Image();
robotImage.src = "img/robot_player_sprite.png";

robotImage.onload = function (posX, posY, width, height) {
	ctx.drawImage(robotImage, 35, 0, 20, 30, posX, posY, width, height);
}

let robotReversedImage = new Image();
robotReversedImage.src = "img/robot_player_sprite_reversed.png";

robotReversedImage.onload = function (posX, posY, width, height) {
	ctx.drawImage(robotReversedImage, 35, 0, 20, 30, posX, posY, width, height);
}

let ghostImage = new Image();
ghostImage.src = "img/ghost_enemy_sprite.png";

ghostImage.onload = function (posX, posY, width, height) {
	ctx.drawImage(ghostImage, 98, 10, 90, 86, posX, posY, width, height);
}

let ghostReversedImage = new Image();
ghostReversedImage.src = "img/ghost_enemy_sprite_reversed.png";

ghostReversedImage.onload = function (posX, posY, width, height) {
	ctx.drawImage(ghostReversedImage, 8, 10, 90, 86, posX, posY, width, height);
}

let droidImage = new Image();
droidImage.src = "img/droid_enemy_sprite.png";

droidImage.onload = function (posX, posY, width, height) {
	ctx.drawImage(droidImage, 260, 100, 28, 28, posX, posY, width, height);
}

let laserImage = new Image();
laserImage.src = "img/laser_sprite.png";

laserImage.onload = function (posX, posY, width, height) {
	ctx.drawImage(laserImage, 20, 20, 500, 100, posX, posY, width, height);
}

let motherJellyfishImage = new Image();
motherJellyfishImage.src = "img/giant_jellyfish_enemy_sprite.png";

motherJellyfishImage.onload = function (posX, posY, width, height) {
	ctx.drawImage(motherJellyfishImage, 160, 30, 140, 140, posX, posY, width, height);
}

let droneJellyfishImage = new Image();
droneJellyfishImage.src = "img/eye_jellyfish_enemy_sprite.png";

droneJellyfishImage.onload = function (posX, posY, width, height) {
	ctx.drawImage(droneJellyfishImage, 100, 25, 75, 75, posX, posY, width, height);
}



// Player Class
class Player {
	constructor(){
		this.height = 60;
		this.width = 30;
		this.posX = 10;
		this.posY = canvas.height - this.height + 10;
		this.velX = 0;
		this.velY = 0;
		this.gravY = 1;
		this.dragX = 1;
		this.jumpY = 20;
		this.onGround = true;
	}
	// Player Controls
	move(){
		this.jump();
		this.right();
		this.left();
	}
	jump(){
		if(upKeyDown === true){
			if(this.onGround === true){
				this.velY += -this.jumpY;
				this.dragX = 1;
				this.onGround = false;
			}
		}
	}
	right(){
		if(rightKeyDown === true){
			if(this.posX <= canvas.width - this.width){
				this.velX += 2;
			} else {
				this.posX = 0;
			}
		}
	}
	left(){
		if(leftKeyDown === true){
			if(this.posX >= 0){
				this.velX += -2;
			} else {
				this.posX = 0;
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
			this.onGround = true;
		}
	}
	draw(){
		this.move();
		if(this.velX >= 0){
			robotImage.onload(this.posX, this.posY, this.width, this.height);
		}
		if(this.velX < 0){
			robotReversedImage.onload(this.posX, this.posY, this.width, this.height);
		}
	}
}

// Platform Class
class Platform {
	constructor(height, width, posX, posY, velX, velY, topPlatform){
		this.height = height;
		this.width = width;
		this.posX = posX;
		this.posY = posY;
		this.velX = velX;
		this.velY = velY;
		this.topPlatform = topPlatform;
	}
	update(){
		this.posX += this.velX;
		this.posY += this.velY;

	}
	draw(){
		platformImage.onload(this.posX, this.posY, this.width, this.height);
	}
	detectCollision(){
		if(this.detectOnTop() === true){
			if(downKeyDown === false){
				player.velY = 0;
				player.posY = this.posY - player.height - player.gravY;
				player.velY += this.velY;
				player.onGround = true;
				if(rightKeyDown === false && leftKeyDown === false && player.onGround === true && this.velX != 0){
					player.dragX = 0;
					player.velX = this.velX;
				}
			}
		}
		// if(this.detectOnRight() === true){
			// player.velX = 0;
			// player.posX = this.posX + this.width;
		// }
		// if(this.detectOnBottom() === true){
			// player.velY = 0;
			// player.posY = this.posY + this.height;
		// }
		// if(this.detectOnLeft() === true){
			// player.posX = this.posX - player.width + this.velX;
			// player.velX += this.velX;
		// }
	}
	detectOnTop(){
		if(((player.posY + player.height) - this.posY > (-player.velY - player.gravY + this.velY)) && ((player.posY + player.height) - this.posY < (player.velY + player.gravY - this.velY))){
			if(((player.posX > this.posX) && (player.posX < this.posX + this.width)) || ((player.posX + player.width > this.posX) && (player.posX + player.width < this.posX + this.width))){
				return true;
			} else {
				return false;
			}
		}
	}
	// detectOnRight(){
		// if((player.posX - (this.posX + this.width) > player.velX + this.velX) && (player.posX - (this.posX + this.width) < -player.velX - this.velX)){
			// if(((player.posY > this.posY) && (player.posY < this.posY + this.height)) || ((player.posY + player.height <= this.posY + this.height) && (player.posY + player.height > this.posY))){
				// return true;
			// } else {
				// return false;
			// }
		// }
	// }
	// detectOnBottom(){
		// if((player.posY - (this.posY + this.height) > player.velY) && (player.posY - (this.posY + this.height) < -player.velY)){
			// if(((player.posX > this.posX) && (player.posX < this.posX + this.width)) || ((player.posX + player.width > this.posX) && (player.posX + player.width < this.posX + this.width))){
				// return true;
			// } else {
				// return false;
			// }
		// }
	// }
	// detectOnLeft(){
		// if(((player.posX + player.width) - this.posX > -(player.velX + player.dragX - this.velX)) && ((player.posX + player.width) - this.posX < (player.velX + player.dragX - this.velX))){
			// if(((player.posY > this.posY) && (player.posY < this.posY + this.height)) || ((player.posY + player.height <= this.posY + this.height) && (player.posY + player.height > this.posY))){
				// return true;
			// } else {
				// return false;
			// }
		// }
	// }
	checkTopPlatform(){
		if(this.topPlatform === true){
			topPlatformPosX = this.posX;
			topPlatformPosY = this.posY;
		}
	}
	// detectGhostCollision(){
		// for(let i = 0; i <= ghosts.length-1; i++){
			// if(this.detectGhostOnTop() === true){
				// ghosts[i].velY = 0;
				// ghosts[i].posY = this.posY - ghosts[i].height + 10;
				// ghosts[i].onGround = true;
			// }
		// }
	// }
	// detectGhostOnEdge(){
		// for(let i = 0; i <= ghosts.length-1; i++){
			// let reverseVelX = ghosts[i].velX * (-1);
			// if(ghosts[i].posX <= this.posX){
				// ghosts[i].velX = 0;
				// ghosts[i].velX = reverseVelX;
			// }
			// if(ghosts[i].posX + ghosts[i].width >= this.posX + ghosts[i].width){
				// ghosts[i].velX = 0;
				// ghosts[i].velX = reverseVelX;
			// }
		// }
	// }
	// detectGhostOnTop(){
		// for(let i = 0; i <= ghosts.length-1; i++){
			// if(((ghosts[i].posY + ghosts[i].height) - this.posY > -ghosts[i].velY - ghosts[i].gravY) && ((ghosts[i].posY + ghosts[i].height) - this.posY < ghosts[i].velY + ghosts[i].gravY)){
				// if(((ghosts[i].posX > this.posX) && (ghosts[i].posX < this.posX + this.width)) || ((ghosts[i].posX + ghosts[i].width > this.posX) && (ghosts[i].posX + ghosts[i].width < this.posX + this.width))){
					// return true;
				// } else {
					// return false;
				// }
			// }
		// }
	// }
}

// Teleporter Class
class Teleporter {
	constructor(level){
		this.height = 100;
		this.width = 50;
		this.posX = 0;
		this.posY = 0;
		this.level = level;
		this.nextLevel = level + 1;
	}
	update(){
		this.posX = topPlatformPosX + (this.width/2);
		this.posY = topPlatformPosY - this.height;
	}
	draw(){
		teleporterImage.onload(this.posX, this.posY, this.width, this.height);
		// window.onload = function() {
    		// let img = document.getElementById("teleporter");
    		// ctx.drawImage(img, this.x, this.y, this.width, this.height);
    	// };
		// let teleporterImage = new Image();
		// teleporterImage = "../img/teleporter_sprite.png";
		// ctx.drawImage(teleporterImage, this.height, this.width);
		// teleporterImage.onload(this.x, this.y, this.width, this.height);

		// ctx.rect(this.posX, this.posY, this.width, this.height);
		// ctx.stroke();
	}
	detectCollision(){
		let load = 0;
		if(this.detectOnRight() === true){
			if(aKeyDown === true){
				console.log("aKeyDown");
				this.setupNextLevel();
			}
		} else if(this.detectOnLeft() === true){
			if(aKeyDown === true){
				console.log("aKeyDown");
				aKeyDown = false;
			}
		}
	}
	detectOnRight(){
		if((player.posX + player.width > this.posX) && (player.posX + player.width < this.posX + this.width)){
			if(((player.posY > this.posY) && (player.posY < this.posY + this.height)) || ((player.posY + player.height <= this.posY + this.height) && (player.posY + player.height > this.posY))){
				return true;
			} else {
				return false;
			}
		}
	}
	detectOnLeft(){
		if((player.posX > this.posX) && (player.posX < this.posX + this.width)){
			if(((player.posY > this.posY) && (player.posY < this.posY + this.height)) || ((player.posY + player.height <= this.posY + this.height) && (player.posY + player.height > this.posY))){
				return true;
			} else {
				return false;
			}
		}
	}
	setupNextLevel(){
		level = this.nextLevel;
		platforms = [];
		ghosts = [];
		player.posX = 10;
		player.posY = canvas.height - player.height + 10;
		teleporters.push(new Teleporter(this.nextLevel));
		teleporters.splice(0, 1);
	}
}

// Ghost Class
class Ghost {
	constructor(height, width, posX, posY, velX, velY){
		this.height = height;
		this.width = width;
		this.posX = posX;
		this.posY = posY;
		this.velX = velX;
		this.velY = velY;
		this.gravY = 0;
		this.dragX = 0;
		this.jumpY = 0;
		this.onGround = true;
	}
	reverse(){
		let reverseVelX = this.velX * (-1)
		this.velX = reverseVelX;
	}
	move(){
		if(this.posX > canvas.width - this.width){
			this.posX = canvas.width - this.width;
			this.reverse();
		}
		if(this.posX < 0){
			this.posX = 0;
			this.reverse();
		}
	}
	// jump(){
		// if(this.onGround === true){
			// this.velY += -this.jumpY;
			// this.onGround = false;
		// }
	// }
	// right(){
		// if(player.posX > this.posX){
			// if(player.posY === this.posY){
				// this.velX += 1;
			// }
		// }
	// }
	// left(){
		// if(player.posX < this.posX){
			// if(player.posY === this.posY){
				// this.velX += -1;
			// }
		// }
	// }
	// Ghost Rendering
	update(){
		this.posX += this.velX;
	}
	draw(){
		this.move();
		if(this.velX > 0){
			ghostImage.onload(this.posX, this.posY, this.width, this.height);
		}
		if(this.velX < 0){
			ghostReversedImage.onload(this.posX, this.posY, this.width, this.height);
		}

	}
	detectCollision(){
		if(this.detectOnTop() === true){
			player.velY = 0;
			player.posY = this.posY - player.height;
			player.velY += -10;
		}
		if(this.detectOnRight() === true){
			player.velX = 0;
			player.posX = this.posX + this.width + 5;
			player.velX += 10;
		}
		if(this.detectOnBottom() === true){
			player.velY = 0;
			player.posY = this.posY + this.height;
			player.velY += 10;
		}
		if(this.detectOnLeft() === true){
			player.velX = 0;
			player.posX = this.posX - player.width - 5;
			player.velX += -10;
		}
	}
	detectOnTop(){
		if(((player.posY + player.height) - this.posY > -player.velY - player.gravY) && ((player.posY + player.height) - this.posY < player.velY + player.gravY)){
			if(((player.posX > this.posX) && (player.posX < this.posX + this.width)) || ((player.posX + player.width > this.posX) && (player.posX + player.width < this.posX + this.width))){
				return true;
			} else {
				return false;
			}
		}
	}
	detectOnRight(){
		if((player.posX < (this.posX + this.width)) && (player.posX > this.posX)){
			if(((player.posY > this.posY) && (player.posY < this.posY + this.height)) || ((player.posY + player.height <= this.posY + this.height) && (player.posY + player.height > this.posY))){
				return true;
			} else {
				return false;
			}
		}
	}
	detectOnBottom(){
		if((player.posY - (this.posY + this.height) > player.velY) && (player.posY - (this.posY + this.height) < -player.velY)){
			if(((player.posX > this.posX) && (player.posX < this.posX + this.width)) || ((player.posX + player.width > this.posX) && (player.posX + player.width < this.posX + this.width))){
				return true;
			} else {
				return false;
			}
		}
	}
	detectOnLeft(){
		if(((player.posX + player.width) > this.posX) && ((player.posX + player.width) < this.posX + this.width)){
			if(((player.posY > this.posY) && (player.posY < this.posY + this.height)) || ((player.posY + player.height <= this.posY + this.height) && (player.posY + player.height > this.posY))){
				return true;
			} else {
				return false;
			}
		}
	}
}

class Droid {
	constructor(height, width, posX, posY, velX, velY){
		this.height = height;
		this.width = width;
		this.posX = posX;
		this.posY = posY;
		this.velX = velX;
		this.velY = velY;
		this.onGround = true;
	}
	move(){

	}
	// jump(){
		// if(this.onGround === true){
			// this.velY += -this.jumpY;
			// this.onGround = false;
		// }
	// }
	// right(){
		// if(player.posX > this.posX){
			// if(player.posY === this.posY){
				// this.velX += 1;
			// }
		// }
	// }
	// left(){
		// if(player.posX < this.posX){
			// if(player.posY === this.posY){
				// this.velX += -1;
			// }
		// }
	// }
	// Droid Rendering
	update(){
		this.posX += this.velX;
	}
	draw(){
		droidImage.onload(this.posX, this.posY, this.width, this.height);
	}
	detectCollision(){
		if(this.detectOnTop() === true){
			player.velY = 0;
			player.posY = this.posY - player.height;
			player.velY += -10;
		}
		if(this.detectOnRight() === true){
			player.velX = 0;
			player.posX = this.posX + this.width + 5;
			player.velX += 10;
		}
		if(this.detectOnBottom() === true){
			player.velY = 0;
			player.posY = this.posY + this.height;
			player.velY += 10;
		}
		if(this.detectOnLeft() === true){
			player.velX = 0;
			player.posX = this.posX - player.width - 5;
			player.velX += -10;
		}
	}
	detectOnTop(){
		if(((player.posY + player.height) - this.posY > -player.velY - player.gravY) && ((player.posY + player.height) - this.posY < player.velY + player.gravY)){
			if(((player.posX > this.posX) && (player.posX < this.posX + this.width)) || ((player.posX + player.width > this.posX) && (player.posX + player.width < this.posX + this.width))){
				return true;
			} else {
				return false;
			}
		}
	}
	detectOnRight(){
		if((player.posX < (this.posX + this.width)) && (player.posX > this.posX)){
			if(((player.posY > this.posY) && (player.posY < this.posY + this.height)) || ((player.posY + player.height <= this.posY + this.height) && (player.posY + player.height > this.posY))){
				return true;
			} else {
				return false;
			}
		}
	}
	detectOnBottom(){
		if((player.posY - (this.posY + this.height) > player.velY) && (player.posY - (this.posY + this.height) < -player.velY)){
			if(((player.posX > this.posX) && (player.posX < this.posX + this.width)) || ((player.posX + player.width > this.posX) && (player.posX + player.width < this.posX + this.width))){
				return true;
			} else {
				return false;
			}
		}
	}
	detectOnLeft(){
		if(((player.posX + player.width) > this.posX) && ((player.posX + player.width) < this.posX + this.width)){
			if(((player.posY > this.posY) && (player.posY < this.posY + this.height)) || ((player.posY + player.height <= this.posY + this.height) && (player.posY + player.height > this.posY))){
				return true;
			} else {
				return false;
			}
		}
	}
}

class Laser {
	constructor(height, width, posX, posY, velX, velY){
		this.height = height;
		this.width = width;
		this.posX = posX;
		this.posY = posY;
		this.velX = velX;
		this.velY = velY;
		this.onGround = true;
	}
	move(){

	}
	// jump(){
		// if(this.onGround === true){
			// this.velY += -this.jumpY;
			// this.onGround = false;
		// }
	// }
	// right(){
		// if(player.posX > this.posX){
			// if(player.posY === this.posY){
				// this.velX += 1;
			// }
		// }
	// }
	// left(){
		// if(player.posX < this.posX){
			// if(player.posY === this.posY){
				// this.velX += -1;
			// }
		// }
	// }
	// Laser Rendering
	update(){
		this.posX += this.velX;
	}
	draw(){
		laserImage.onload(this.posX, this.posY, this.width, this.height);
	}
	detectCollision(){
		// if(this.detectOnRight() === true){
			// console.log("Right");
			// player.velX = 0;
			// player.posX = this.posX + this.width + 5;
			// player.velX += 10;
		// }
		if(this.detectOnLeft() === true){
			console.log("Left");
			player.velX = 0;
			player.posX = this.posX - player.width - 5;
			player.velX += -10;
		}
	}
	// detectOnRight(){
		// if((this.posX + this.width + this.velX < player.posX + player.width) && ((this.posX + this.width + this.velX) > player.posX)){
			// if(((this.posY > player.posY) && (this.posY < player.posY + player.height)) || ((this.posY + this.height > player.posY) && (this.posY + this.height < player.posY + player.height))){
				// return true;
			// } else {
				// return false;
			// }
		// }
	// }
	detectOnLeft(){
		if((this.posX + this.velX < player.posX + player.width) && (this.posX + this.velX > player.posX)){
			if(((this.posY > player.posY) && (this.posY < player.posY + player.height)) || ((this.posY + this.height > player.posY) && (this.posY + this.height < player.posY + player.height))){
				return true;
			} else {
				return false;
			}
		}
	}
}

class MotherJellyfish {
	constructor(height, width, posX, posY, velX, velY){
		this.height = height;
		this.width = width;
		this.posX = posX;
		this.posY = posY;
		this.velX = velX;
		this.velY = velY;
		this.onGround = true;
	}
	move(){

	}
	// jump(){
		// if(this.onGround === true){
			// this.velY += -this.jumpY;
			// this.onGround = false;
		// }
	// }
	// right(){
		// if(player.posX > this.posX){
			// if(player.posY === this.posY){
				// this.velX += 1;
			// }
		// }
	// }
	// left(){
		// if(player.posX < this.posX){
			// if(player.posY === this.posY){
				// this.velX += -1;
			// }
		// }
	// }
	// Droid Rendering
	update(){
		this.posX += this.velX;
	}
	draw(){
		motherJellyfishImage.onload(this.posX, this.posY, this.width, this.height);
	}
	detectCollision(){
		if(this.detectOnTop() === true){
			player.velY = 0;
			player.posY = this.posY - player.height;
			player.velY += -10;
		}
		if(this.detectOnRight() === true){
			player.velX = 0;
			player.posX = this.posX + this.width + 5;
			player.velX += 10;
		}
		if(this.detectOnBottom() === true){
			player.velY = 0;
			player.posY = this.posY + this.height;
			player.velY += 10;
		}
		if(this.detectOnLeft() === true){
			player.velX = 0;
			player.posX = this.posX - player.width - 5;
			player.velX += -10;
		}
	}
	detectOnTop(){
		if(((player.posY + player.height) - this.posY > -player.velY - player.gravY) && ((player.posY + player.height) - this.posY < player.velY + player.gravY)){
			if(((player.posX > this.posX) && (player.posX < this.posX + this.width)) || ((player.posX + player.width > this.posX) && (player.posX + player.width < this.posX + this.width))){
				return true;
			} else {
				return false;
			}
		}
	}
	detectOnRight(){
		if((player.posX < (this.posX + this.width)) && (player.posX > this.posX)){
			if(((player.posY > this.posY) && (player.posY < this.posY + this.height)) || ((player.posY + player.height <= this.posY + this.height) && (player.posY + player.height > this.posY))){
				return true;
			} else {
				return false;
			}
		}
	}
	detectOnBottom(){
		if((player.posY - (this.posY + this.height) > player.velY) && (player.posY - (this.posY + this.height) < -player.velY)){
			if(((player.posX > this.posX) && (player.posX < this.posX + this.width)) || ((player.posX + player.width > this.posX) && (player.posX + player.width < this.posX + this.width))){
				return true;
			} else {
				return false;
			}
		}
	}
	detectOnLeft(){
		if(((player.posX + player.width) > this.posX) && ((player.posX + player.width) < this.posX + this.width)){
			if(((player.posY > this.posY) && (player.posY < this.posY + this.height)) || ((player.posY + player.height <= this.posY + this.height) && (player.posY + player.height > this.posY))){
				return true;
			} else {
				return false;
			}
		}
	}
}

class DroneJellyfish {
	constructor(height, width, posX, posY, velX, velY){
		this.height = height;
		this.width = width;
		this.posX = posX;
		this.posY = posY;
		this.velX = velX;
		this.velY = velY;
		this.gravY = 1;
	}
	move(){

	}
	// jump(){
		// if(this.onGround === true){
			// this.velY += -this.jumpY;
			// this.onGround = false;
		// }
	// }
	// right(){
		// if(player.posX > this.posX){
			// if(player.posY === this.posY){
				// this.velX += 1;
			// }
		// }
	// }
	// left(){
		// if(player.posX < this.posX){
			// if(player.posY === this.posY){
				// this.velX += -1;
			// }
		// }
	// }
	// Droid Rendering
	update(){

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
	}
	draw(){
		droneJellyfishImage.onload(this.posX, this.posY, this.width, this.height);
	}
	detectCollision(){
		if(this.detectOnTop() === true){
			player.velY = 0;
			player.posY = this.posY - player.height;
			player.velY += -10;
		}
		if(this.detectOnRight() === true){
			player.velX = 0;
			player.posX = this.posX + this.width + 5;
			player.velX += 10;
		}
		if(this.detectOnBottom() === true){
			player.velY = 0;
			player.posY = this.posY + this.height;
			player.velY += 10;
		}
		if(this.detectOnLeft() === true){
			player.velX = 0;
			player.posX = this.posX - player.width - 5;
			player.velX += -10;
		}
	}
	detectOnTop(){
		if(((player.posY + player.height) - this.posY > -player.velY - player.gravY) && ((player.posY + player.height) - this.posY < player.velY + player.gravY)){
			if(((player.posX > this.posX) && (player.posX < this.posX + this.width)) || ((player.posX + player.width > this.posX) && (player.posX + player.width < this.posX + this.width))){
				return true;
			} else {
				return false;
			}
		}
	}
	detectOnRight(){
		if((player.posX < (this.posX + this.width)) && (player.posX > this.posX)){
			if(((player.posY > this.posY) && (player.posY < this.posY + this.height)) || ((player.posY + player.height <= this.posY + this.height) && (player.posY + player.height > this.posY))){
				return true;
			} else {
				return false;
			}
		}
	}
	detectOnBottom(){
		if((player.posY - (this.posY + this.height) > player.velY) && (player.posY - (this.posY + this.height) < -player.velY)){
			if(((player.posX > this.posX) && (player.posX < this.posX + this.width)) || ((player.posX + player.width > this.posX) && (player.posX + player.width < this.posX + this.width))){
				return true;
			} else {
				return false;
			}
		}
	}
	detectOnLeft(){
		if(((player.posX + player.width) > this.posX) && ((player.posX + player.width) < this.posX + this.width)){
			if(((player.posY > this.posY) && (player.posY < this.posY + this.height)) || ((player.posY + player.height <= this.posY + this.height) && (player.posY + player.height > this.posY))){
				return true;
			} else {
				return false;
			}
		}
	}
}

// Game Command Controls
const keyDown = (event) => {
	console.log(event.keyCode);
	if(event.keyCode === 38){
		upKeyDown = true;
	}
	if(event.keyCode === 39){
		rightKeyDown = true;
	}
	if(event.keyCode === 40){
		downKeyDown = true;
	}
	if(event.keyCode === 37){
		leftKeyDown = true;
	}
	if(event.keyCode === 65){
		aKeyDown = true;
	}
}

document.addEventListener("keydown", keyDown);

const keyUp = (event) => {
	if(event.keyCode === 38){
		upKeyDown = false;
	}
	if(event.keyCode === 39){
		rightKeyDown = false;
	}
	if(event.keyCode === 40){
		downKeyDown = false;
	}
	if(event.keyCode === 37){
		leftKeyDown = false;
	}
	if(event.keyCode === 65){
		aKeyDown = false;
	}
}

document.addEventListener("keyup", keyUp);

// Visual Renderings

const levels = [];

//Level 1
levels[0] = {
	level: 0,
	// Player Renders
	platformRender(){
		if(fps % 100 == 0){
			platforms.push(new Platform(10, 200, canvas.width - 200, canvas.height * (10/12), 0, 0, false));
			platforms.push(new Platform(10, 200, 0, canvas.height * (8/12), 0, 0, false));
			platforms.push(new Platform(10, 100, canvas.width, canvas.height * (6/12), -2, 0, false));
			platforms.push(new Platform(10, 100, -100, canvas.height * (4/12), 2, 0, false));
			platforms.push(new Platform(10, 100, canvas.width - 100, canvas.height * (2/12), 0, 0, true));
		}
		for(let i = platforms.length-1; i >= 0; i--){
			platforms[i].detectCollision();
			platforms[i].checkTopPlatform();
			platforms[i].update();
			platforms[i].draw();
			if(platforms[i].posX + platforms[i].width === 0 || platforms[i].posX === canvas.width || platforms[i].posY + platforms[i].height === 0 || platforms[i].posY === canvas.height){
				platforms.splice(i, 1);
			}
		}
	},
	teleporterRender(){
		if(teleporters.length === 0){
			teleporters.push(new Teleporter(this.level));
		}
		for(let i = teleporters.length-1; i >= 0; i--){
			teleporters[i].detectCollision();
			teleporters[i].update();
			teleporters[i].draw();
			// if(teleporters.length > 1){
				// teleporters.splice(i, 1);
			// }
		}
	},
	ghostRender(){

	},
	droidRender(){

	},
	motherJellyfishRender(){

	}
}

// Level 2
levels[1] = {
	level: 1,
	// Player Renders
	platformRender(){
		if(platforms.length === 0){
			platforms.push(new Platform(10, 300, 0, canvas.height * (10/12), 0, 0, false));
			platforms.push(new Platform(10, 300, canvas.width - 300, canvas.height * (8/12), 0, 0, false));
			platforms.push(new Platform(10, 300, 0, canvas.height * (6/12), 0, 0, false));
			platforms.push(new Platform(10, 300, canvas.width - 300, canvas.height * (4/12), 0, 0, false));
			platforms.push(new Platform(10, 200, 0, canvas.height * (2/12), 0, 0, true));
		}
		for(let i = platforms.length-1; i >= 0; i--){
			platforms[i].detectCollision();
			platforms[i].checkTopPlatform();
			platforms[i].update();
			platforms[i].draw();
			if(platforms[i].posX + platforms[i].width === 0 || platforms[i].posX === canvas.width || platforms[i].posY + platforms[i].height === 0 || platforms[i].posY === canvas.height){
				platforms.splice(i, 1);
			}
		}

	},
	teleporterRender(){
		if(teleporters.length === 0){
			teleporters.push(new Teleporter(this.level));
		}
		for(let i = 0; i <= teleporters.length-1; i++){
			teleporters[i].detectCollision();
			teleporters[i].update();
			teleporters[i].draw();
			if(teleporters.length > 1){
				teleporters.splice(i, 1);
			}
		}
	},
	ghostRender(){
		if(ghosts.length === 0){
			ghosts.push(new Ghost(70, 70, 0, canvas.height * (10/12) - 70, -2, 0));
			ghosts.push(new Ghost(70, 70, canvas.width - 70, canvas.height * (8/12) - 70, 2, 0));
			ghosts.push(new Ghost(70, 70, 0, canvas.height * (6/12) - 70, -2, 0));
			ghosts.push(new Ghost(70, 70, canvas.width - 70, canvas.height * (4/12) -70, 2, 0));
		}
		for(let i = ghosts.length-1; i >= 0; i--){
			ghosts[i].detectCollision();
			ghosts[i].update();
			ghosts[i].draw();
			// if(ghosts[i].posX + ghosts[i].width === 0 || ghosts[i].posX === canvas.width || ghosts[i].posY + ghosts[i].height === 0 || ghosts[i].posY === canvas.height){
				// ghosts.splice(i, 1);
			// }
		}
	},
	droidRender(){

	},
	motherJellyfishRender(){

	}
}

// Level 3
levels[2] = {
	level: 2,
	// Player Renders
	platformRender(){
		if(platforms.length === 0){
			platforms.push(new Platform(10, 100, 0, canvas.height * (8/12), 0, 0, false));
			platforms.push(new Platform(10, 100, canvas.width - 100, (canvas.height * (8/12)), 0, 0, false));
			platforms.push(new Platform(10, 100, (canvas.width * (1/2)) - 100, canvas.height * (4/12), 0, 0, false));
			platforms.push(new Platform(10, 100, canvas.width - 100, canvas.height * (4/12), 0, 0, false));
			platforms.push(new Platform(10, 100, canvas.width - 200, canvas.height * (2/12), 0, 0, true));
		} else if(fps % 100 == 0){
			platforms.push(new Platform(10, 100, canvas.width, canvas.height * (10/12), -3, 0, false));
			platforms.push(new Platform(10, 100, -100, canvas.height * (6/12), 3, 0, false));
		}
		for(let i = platforms.length-1; i >= 0; i--){
			platforms[i].detectCollision();
			platforms[i].checkTopPlatform();
			platforms[i].update();
			platforms[i].draw();
			if(platforms[i].posX + platforms[i].width === 0 || platforms[i].posX === canvas.width || platforms[i].posY + platforms[i].height === 0 || platforms[i].posY === canvas.height){
				platforms.splice(i, 1);
			}
		}

	},
	teleporterRender(){
		if(teleporters.length === 0){
			teleporters.push(new Teleporter(this.level));
		}
		for(let i = 0; i <= teleporters.length-1; i++){
			teleporters[i].detectCollision();
			teleporters[i].update();
			teleporters[i].draw();
			if(teleporters.length > 1){
				teleporters.splice(i, 1);
			}
		}
	},
	ghostRender(){

	},
	droidRender(){
		if(fps % 200 == 0){
			lasers.push(new Laser(5, 50, canvas.width - 70, canvas.height * (8/12) - 30, -20, 0));
			lasers.push(new Laser(5, 50, canvas.width - 70, canvas.height * (4/12) - 30, -20, 0));
		}
		for(let i = lasers.length-1; i >= 0; i--){
			lasers[i].detectCollision();
			lasers[i].update();
			lasers[i].draw();
			if(lasers[i].posX + lasers[i].width === 0 || lasers[i].posX === canvas.width || lasers[i].posY + lasers[i].height === 0 || lasers[i].posY === canvas.height){
				lasers.splice(i, 1);
			}
		}
		if(droids.length === 0){
			droids.push(new Droid(50, 50, canvas.width - 50, canvas.height * (8/12) - 50, 0, 0));
			droids.push(new Droid(50, 50, canvas.width - 50, canvas.height * (4/12) - 50, 0, 0));
		}
		for(let i = droids.length-1; i >= 0; i--){
			droids[i].detectCollision();
			droids[i].update();
			droids[i].draw();
			// if(droids[i].posX + droids[i].width === 0 || droids[i].posX === canvas.width || droids[i].posY + droids[i].height === 0 || droids[i].posY === canvas.height){
				// droids.splice(i, 1);
			// }
		}
	},
	motherJellyfishRender(){

	}
}

// Level 4
levels[3] = {
	level: 3,
	// Player Renders
	platformRender(){
		if(platforms.length === 0){
			platforms.push(new Platform(10, 100, (canvas.width * (1/2) - 50), canvas.height * (10/12), 0, 0, false));
			platforms.push(new Platform(10, 100, (canvas.width * (1/2) - 50), canvas.height * (4/12), 0, 0, false));
			platforms.push(new Platform(10, 100, canvas.width - 100, canvas.height * (2/12), 0, 0, true));
		} else if(fps % 50 == 0){
			platforms.push(new Platform(10, 100, 0, canvas.height - 10, 0, -3, false));
			platforms.push(new Platform(10, 100, canvas.width - 100, canvas.height * (2/12), 0, 3, false));
		}
		for(let i = platforms.length-1; i >= 0; i--){
			platforms[i].detectCollision();
			platforms[i].checkTopPlatform();
			platforms[i].update();
			platforms[i].draw();
			if(platforms[i].posX + platforms[i].width === 0 || platforms[i].posX === canvas.width || platforms[i].posY + platforms[i].height === 0 || platforms[i].posY === canvas.height){
				platforms.splice(i, 1);
			}
		}

	},
	teleporterRender(){
		if(teleporters.length === 0){
			teleporters.push(new Teleporter(this.level));
		}
		for(let i = 0; i <= teleporters.length-1; i++){
			teleporters[i].detectCollision();
			teleporters[i].update();
			teleporters[i].draw();
			if(teleporters.length > 1){
				teleporters.splice(i, 1);
			}
		}
	},
	ghostRender(){

	},
	droidRender(){

	},
	motherJellyfishRender(){
		if(motherJellyfishes.length === 0){
			motherJellyfishes.push(new MotherJellyfish(150, 150, (canvas.width * (1/2)) - 75, canvas.height * (6/12), 0, 0));
		}
		for(let i = motherJellyfishes.length-1; i >= 0; i--){
			motherJellyfishes[i].detectCollision();
			motherJellyfishes[i].update();
			motherJellyfishes[i].draw();
			// if(droids[i].posX + droids[i].width === 0 || droids[i].posX === canvas.width || droids[i].posY + droids[i].height === 0 || droids[i].posY === canvas.height){
				// droids.splice(i, 1);
			// }
		}
		if(fps % 200 == 0){
			droneJellyfishes.push(new DroneJellyfish(50, 50, 100, canvas.height - 50, 4, -35));
			droneJellyfishes.push(new DroneJellyfish(50, 50, canvas.width - 50 - 100, canvas.height - 50, -4, -35));
		}
		for(let i = droneJellyfishes.length-1; i >= 0; i--){
			droneJellyfishes[i].detectCollision();
			droneJellyfishes[i].update();
			droneJellyfishes[i].draw();
			if(droneJellyfishes[i].posX + droneJellyfishes[i].width === 0 || droneJellyfishes[i].posX === canvas.width || droneJellyfishes[i].posY + droneJellyfishes[i].height === 0 || droneJellyfishes[i].posY === canvas.height){
				droneJellyfishes.splice(i, 1);
			}
		}
	},

}

// Game Setup
let upKeyDown = false;
let rightKeyDown = false;
let downKeyDown = false;
let leftKeyDown = false;
let aKeyDown = false;
let topPlatformPosX = 0;
let topPlatformPosY = 0;
let level = 0;
let fps = 0;

const player = new Player;
let platforms = [];
let teleporters = [];
let ghosts = [];
let droids = [];
let lasers = [];
let motherJellyfishes = [];
let droneJellyfishes = [];

const playerRender = () => {
	player.update();
	player.draw();
}

const gameRender = () => {
	canvas.width = canvas.width;
	levels[level].platformRender();
	levels[level].ghostRender();
	levels[level].droidRender();
	levels[level].motherJellyfishRender();
	levels[level].teleporterRender();
	playerRender();
	fps = window.requestAnimationFrame(() => {
		gameRender();
	});
}

// Game Initializer
gameRender();
