function Zombie(game) {
    this.game = game;
  
    this.w = 50;
    this.h = 150;
  
    this.dx = 9;
  
    this.x = this.game.canvas.width;
    this.y = this.game.player.y0 + this.game.player.h - this.h - 5;
  }
  
  Zombie.prototype.draw = function() {
    this.game.ctx.beginPath()
    this.game.ctx.fillStyle = "red";
    this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.game.ctx.beginPath()
  
  };
  
  Zombie.prototype.move = function() {
    this.x -= this.dx;
  };