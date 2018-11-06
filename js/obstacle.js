function Obstacle(game) {
  this.game = game;

  this.w = 100;
  this.h = 50;

  this.dx = 10;

  this.x = this.game.canvas.width;
  this.y = this.game.player.y0 + this.game.player.h - this.h - 5;
  this.img = new Image();
  this.img.src = '../img/spikes_2.png'
}

Obstacle.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, 100, 100) 

};

Obstacle.prototype.move = function() {
  this.x -= this.dx;
};