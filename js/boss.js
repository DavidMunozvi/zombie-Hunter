function Boss (game){
    
    this.game = game;
  
    this.w = 200;
    this.h = 200;
  
    this.x = 900;
    this.y = 350

    this.img = new Image();
    this.img.src = 'img/boss.png';

    this.img.frames = 1;
    this.img.frameIndex = 0;

    this.health = 1000;
}
Boss.prototype.draw = function() {
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
    }
