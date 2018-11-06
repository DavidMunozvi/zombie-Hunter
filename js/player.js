function Player(game) {
  this.game = game;
 
  this.x = this.game.canvas.width * 0.08;

  // guardar posición original (suelo)
  this.y0 = this.game.canvas.height * 0.77;
  this.y = this.y0;

  this.img = new Image();
  this.img.src = 'img/playerRun2.png';
  
  // número de imágenes diferentes
  this.img.frames = 10;
  this.img.frameIndex = 0;

  // medidas de la imagen a representar en el canvas
  this.w = 110;
  this.h = 100;

  this.vy = 1;

  this.bullets = [];

  this.setListeners();
}

var TOP_KEY = 38;
var S = 83;

Player.prototype.draw = function() {

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

  this.bullets = this.bullets.filter(function(bullet) {
    return bullet.x < this.game.canvas.width;
  }.bind(this));

  this.bullets.forEach(function(bullet) {
    bullet.draw();
    bullet.move();
  });
};


Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode === TOP_KEY && this.y == this.y0) {
      this.y -= 5;
      this.vy -= 10;
    } else if (event.keyCode == S) {
      this.shoot();
    }
  }.bind(this);
};

Player.prototype.shoot = function() {
  var bullet = new Bullet(this.game, this.x + this.w, this.y + this.h / 2);

  this.bullets.push(bullet);
};

Player.prototype.animateImg = function() {
  if (this.game.framesCounter % 6 === 0) {
    this.img.frameIndex += 1;

    if (this.img.frameIndex > 2) this.img.frameIndex = 0;
  }
};

Player.prototype.move = function() {
  var gravity = 0.4;

  if (this.y >= this.y0) {
    this.vy = 1;
    this.y = this.y0;
  } else {
    this.vy += gravity;
    this.y += this.vy;
  }
};