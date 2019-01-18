function Game(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;

  this.reset();
}

Game.prototype.start = function() {
  document.getElementById("song").play();
  this.interval = setInterval(
    function() {
      this.clear();

      this.framesCounter++;

      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      if (this.framesCounter % 80 === 0) {
        this.generateObstacle(); //obstaculos velocidad de gen
      }

      if (this.framesCounter % 15 === 0) {
        this.generateZombies(); //zombies velocidad de gen
      }
      if (this.framesCounter % 84 === 0) {
        this.generateBigpapa(); //Big papa velocidad de gen
      }
      this.score += 0.01;
      this.moveAll();
      this.boss.animateImg();

      if (this.score > 10) {
        this.boss.appear = true;
        this.drawBoss();
        this.generateDemons();
        this.zombies = [];
        this.bigpapa = [];
        this.obstacles = [];
        this.boss.showHp(this.score);
      } else {
        this.draw();
      }

      // eliminamos obstáculos /zombies fuera del canvas
      this.clearObstacles();
      this.clearZombies();
      this.clearBigpapa();
      this.clearDemons();

      if (this.obstacleCollision()) {
        this.gameOver();
      }
      if (this.zombieCollision()) {
        this.gameOver();
      }
      if (this.demonCollision()) {
        this.gameOver();
      }
      if (this.bigPapaCollision()) {
        this.gameOver();
      }

      if (this.bulletCollision()) {
        this.zombies.shift();
        this.demon.shift();
      }
    }.bind(this),
    1500 / this.fps
  );
};

Game.prototype.stopGame = function() {
  clearInterval(this.interval);
};

Game.prototype.gameOver = function() {
  this.stopGame();

  if (confirm("GAME OVER. Play again?")) {
    this.reset();
    this.start();
  }
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.backgroundboss = new Backgroundboss(this);
  this.boss = new Boss(this);
  this.player = new Player(this);
  this.framesCounter = 0;
  this.obstacles = [];
  this.zombies = [];
  this.bigpapa = [];
  this.demon = [];

  this.score = 0;
};

//obstaculos
Game.prototype.obstacleCollision = function() {
  return this.obstacles.some(
    function(obstacle) {
      return (
        this.player.x + this.player.w >= obstacle.x &&
        this.player.x < obstacle.x + obstacle.w &&
        this.player.y + (this.player.h - 20) >= obstacle.y
      );
    }.bind(this)
  );
};

Game.prototype.clearObstacles = function() {
  this.obstacles.unshift();
};

Game.prototype.generateObstacle = function() {
  this.obstacles.push(new Obstacle(this));
};

//zombies

Game.prototype.clearZombies = function() {
  this.zombies = this.zombies.filter(function(zombie) {
    return zombie.x >= 0;
  });
};

Game.prototype.generateZombies = function() {
  this.zombies.push(new Zombie(this));
};

Game.prototype.zombieCollision = function() {
  return this.zombies.some(
    function(zombie) {
      return (
        this.player.x + this.player.w >= zombie.x &&
        this.player.x < zombie.x + zombie.w &&
        this.player.y + (this.player.h - 20) >= zombie.y
      );
    }.bind(this)
  );
};

//bigPapa

Game.prototype.clearBigpapa = function() {
  this.bigpapa = this.bigpapa.filter(function(bigpapa) {
    return bigpapa.x >= 0;
  });
};

Game.prototype.generateBigpapa = function() {
  this.bigpapa.push(new Bigpapa(this));
};

Game.prototype.bigPapaCollision = function() {
  return this.bigpapa.some(
    function(bigpapa) {
      return (
        this.player.x + this.player.w >= bigpapa.x &&
        this.player.x < bigpapa.x + bigpapa.w &&
        this.player.y + (this.player.h - 20) >= bigpapa.y
      );
    }.bind(this)
  );
};

//demons
Game.prototype.clearDemons = function() {
  this.demon = this.demon.filter(function(demon) {
    return demon.x >= 0;
  });
};

Game.prototype.generateDemons = function() {
  if (this.framesCounter % 15 === 0) {
    this.demon.push(new Demon(this));
  }
};

Game.prototype.demonCollision = function() {
  return this.demon.some(
    function(demon) {
      return (
        this.player.x + this.player.w >= demon.x &&
        this.player.x < demon.x + demon.w &&
        this.player.y + (this.player.h - 20) >= demon.y
      );
    }.bind(this)
  );
};

Game.prototype.bulletCollision = function() {
  var isCollision = false;

  this.zombies.filter(
    function(zombie) {
      this.player.bullets.filter(
        function(elem, i) {
          if (
            this.player.bullets[i].x > zombie.x &&
            this.player.bullets[i].x < zombie.x + zombie.w &&
            this.player.bullets[i].y > zombie.y &&
            this.player.bullets[i].y < zombie.y + zombie.h
          ) {
            isCollision = true;
            this.player.bullets.pop();
          }
        }.bind(this)
      );
    }.bind(this)
  );
  
  this.bigpapa.filter(
    function(big) {
      this.player.bullets.filter(
        function(elem, i) {
          if (
            this.player.bullets[i].x > big.x &&
            this.player.bullets[i].x < big.x + big.w &&
            this.player.bullets[i].y > big.y &&
            this.player.bullets[i].y < big.y + big.h
            ) {
              isCollision = true;
            
            big.hp -= 100;
            if(big.hp < 0)this.bigpapa.shift()
            this.bigpapaDead();
            this.player.bullets.pop();
          }
        }.bind(this)
      );
    }.bind(this)
  );

  this.demon.filter(
    function(demon) {
      this.player.bullets.filter(
        function(elem, i) {
          if (
            this.player.bullets[i].x > demon.x &&
            this.player.bullets[i].x < demon.x + demon.w &&
            this.player.bullets[i].y > demon.y &&
            this.player.bullets[i].y < demon.y + demon.h
          ) {
            isCollision = true;
            this.player.bullets.pop();
          }
        }.bind(this)
      );
    }.bind(this)
  );

  this.player.bullets.filter(
    function(elem, i) {
      if (this.boss.appear === true) {
        if (
          this.player.bullets[i].x > this.boss.x &&
          this.player.bullets[i].x < this.boss.x + this.boss.w &&
          this.player.bullets[i].y > this.boss.y &&
          this.player.bullets[i].y < this.boss.y + this.boss.h
        ) {
          this.youWin();
          isCollision = true;
          this.boss.img.src = "img/boss.png";
          this.player.bullets.pop();
          this.boss.hp -= 10;
          this.boss.img.frameIndex = 2;
        }
      }
    }.bind(this)
  );

  return isCollision;
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.drawBoss = function() {
  this.backgroundboss.draw();
  this.boss.draw();
  this.demon.forEach(function(demon) {
    demon.draw();
  });
  this.player.draw();
};

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
  this.obstacles.forEach(function(obstacle) {
    obstacle.draw();
  });
  this.zombies.forEach(function(zombie) {
    zombie.draw();
  });
  this.bigpapa.forEach(function(bigpapa) {
    bigpapa.draw();
  });

  this.drawScore();
};

Game.prototype.moveAll = function() {
  this.background.move();
  this.player.move();
  this.obstacles.forEach(function(obstacle) {
    obstacle.move();
  });

  this.zombies.forEach(function(zombies) {
    zombies.move();
  });
  this.bigpapa.forEach(function(bigpapa) {
    bigpapa.move();
  });
  this.demon.forEach(function(demon) {
    demon.move();
  });
};

Game.prototype.drawScore = function() {
  this.ctx.font = "30px sans-serif";
  this.ctx.fillStyle = "white";
  this.ctx.fillText(Math.floor(this.score), 50, 50);
};

Game.prototype.youWin = function() {
  if (this.boss.hp < 0) {
    this.stopGame();
    alert("you win");
  }
};
