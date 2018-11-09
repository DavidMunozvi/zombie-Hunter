function Zombie(game) {
    this.game = game;
  
    this.w = 120;
    this.h = 150;
  
    this.dx = 30;
  
    this.x = this.game.canvas.width;
    this.y = 500;

    this.img = new Image();
  this.img.src = 'img/zombie-boy.png';
  
 
  this.img.frames = 10;
  this.img.frameIndex = 0;
  }
  
  Zombie.prototype.draw = function() {
    this.game.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0,
      Math.floor(this.img.width / this.img.frames),
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );
 this.animateImg();
  };
  
  Zombie.prototype.move = function() {
    this.x -= this.dx;
  };

  Zombie.prototype.animateImg = function() {
  if (this.game.framesCounter % 6 === 0) {
    this.img.frameIndex += 1;

    if (this.img.frameIndex > 9) this.img.frameIndex = 0;
  }
};