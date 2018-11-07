function Backgroundboss(game) {
    this.game = game;
  
    this.img = new Image();
    this.img.src = 'img/bg3.jpg';
  
    this.x = 0;
    this.y = 0;
  
  }
  
  Backgroundboss.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
    this.game.ctx.drawImage(this.img, this.x + this.game.canvas.width, this.y, this.game.canvas.width, this.game.canvas.height);
  };
  
 