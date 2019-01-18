function Demon(game) {
    this.game = game;
  
    this.w = 100;
    this.h = 100;
    this.dx = 20;
  
    this.x = this.game.canvas.width;
    this.y = 550

    this.img = new Image();
    this.img.src = 'img/demons.png';

  this.img.frames = 8;
  this.img.frameIndex = 0;
  }
  
  Demon.prototype.draw = function() {
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
  
  Demon.prototype.move = function() {
    this.x -= this.dx;
  };

  Demon.prototype.animateImg = function() {
  if (this.game.framesCounter % 7 === 0) {
    this.img.frameIndex += 1;

    if (this.img.frameIndex > 2) this.img.frameIndex = 0;
  }
};