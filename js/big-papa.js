function Bigpapa(game) {
    this.game = game;
  
    this.w = 150;
    this.h = 220;
  
    this.dx = 9;
  
    this.x = this.game.canvas.width;
    this.y = 430;
    this.hp = 600;

    this.img = new Image();
    this.img.src = 'img/bigpapa.png';
  
 
    this.img.frames = 6;
    this.img.frameIndex = 0;
  }
  
  Bigpapa.prototype.draw = function() {
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
  
  Bigpapa.prototype.move = function() {
    this.x -= this.dx;
  };

  Bigpapa.prototype.animateImg = function() {
  if (this.game.framesCounter % 6 === 0) {
    this.img.frameIndex += 1;

    if (this.img.frameIndex > 5) this.img.frameIndex = 0;
  }
};