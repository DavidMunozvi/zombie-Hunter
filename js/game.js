function Game(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;


  this.reset();
}

Game.prototype.start = function() {
  this.interval = setInterval(function() {
    this.clear();
 
    this.framesCounter++;

    if (this.framesCounter > 1000) {
      this.framesCounter = 0;
    }

    if (this.framesCounter % 80 === 0) {
      this.generateObstacle(); //obstaculos velocidad de gen
    } 

    if (this.framesCounter % 10 === 0) {
      this.generateZombies(); //zombies velocidad de gen
    } 
    
    this.score += 1;
    
    this.moveAll();

    
    
    
    if(this.score > 7){
      this.drawBoss();
      this.generateDemons();
      this.zombies = [];
      this.obstacles = [];
    }else{
      this.draw();
    }

    // eliminamos obstáculos /zombies fuera del canvas
    this.clearObstacles();
    this.clearZombies();
    this.clearDemons();

    if (this.obstacleCollision()) {
      this.gameOver();
    };
    if (this.zombieCollision()) {
      this.gameOver();
    }
    if (this.demonCollision()) {
      this.gameOver();
    }

    if (this.bulletCollision()) {
      this.zombies.shift()
      this.demon.shift()
    }

  }.bind(this), 1500 / this.fps);
};



Game.prototype.stopGame = function() {
  clearInterval(this.interval);
};



Game.prototype.gameOver = function() {
  this.stopGame();
  
  if(confirm("GAME OVER. Play again?")) {
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
  this.demon = [];
 
  this.score = 0;
};

//obstaculos
Game.prototype.obstacleCollision = function() {
  return this.obstacles.some(function(obstacle) {
    return (
      ((this.player.x + this.player.w) >= obstacle.x &&
       this.player.x < (obstacle.x + obstacle.w) &&
       this.player.y + (this.player.h - 20) >= obstacle.y)
    );
  }.bind(this));
};

Game.prototype.clearObstacles = function() {
  this.obstacles.unshift()
    
  
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
  return this.zombies.some(function(zombie) {
    return (
      ((this.player.x + this.player.w) >= zombie.x &&
       this.player.x < (zombie.x + zombie.w) &&
       this.player.y + (this.player.h - 20) >= zombie.y)
    );
  }.bind(this));
};

//demons
Game.prototype.clearDemons = function() {
  this.demon = this.demon.filter(function(demon) {
    return demon.x >= 0;
  });
};

Game.prototype.generateDemons = function() {
  if (this.framesCounter % 50 === 0) {
    this.demon.push(new Demon(this));
 } 
  
};

Game.prototype.demonCollision = function() {
  return this.demon.some(function(demon) {
    return (
      ((this.player.x + this.player.w) >= demon.x &&
       this.player.x < (demon.x + demon.w) &&
       this.player.y + (this.player.h - 20) >= demon.y)
    );
  }.bind(this));
};



Game.prototype.bulletCollision = function() {
  var isCollision = false;
    this.zombies.filter(function(zombie) {
       this.player.bullets.filter(function(elem,i){
        if(this.player.bullets[i].x > zombie.x && this.player.bullets[i].x < (zombie.x + zombie.w)){
          isCollision = true;
          this.player.bullets.pop();
        }
    }.bind(this))
  }.bind(this));


  this.demon.filter(function(demon) {
    this.player.bullets.filter(function(elem,i){
     if(this.player.bullets[i].x > demon.x && this.player.bullets[i].x < (demon.x + demon.w)){
       isCollision = true;
       this.player.bullets.pop();
     }
 }.bind(this))
}.bind(this));

  return isCollision;
};



Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}; 


Game.prototype.drawBoss = function(){
  this.backgroundboss.draw();
  this.boss.draw();
  this.demon.forEach(function(demon) { demon.draw(); });
  this.player.draw();
  
}


Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
  this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
  this.zombies.forEach(function(zombie) { zombie.draw(); });
  
  this.drawScore();  
};



Game.prototype.moveAll = function() {
  this.background.move();
  this.player.move();
  this.obstacles.forEach(function(obstacle) { obstacle.move(); });

  this.zombies.forEach(function(zombies) { zombies.move(); });

  this.demon.forEach(function(demon) { demon.move(); });

};

Game.prototype.drawScore = function() {
  this.ctx.font = "30px sans-serif";
  this.ctx.fillStyle = "white";
  this.ctx.fillText(Math.floor(this.score), 50, 50);
}

