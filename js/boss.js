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
    
    this.maxHp = 100;
    this.hp = 100;

    this.appear = false;
    this.showHp();
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

    Boss.prototype.showHp = function (score) {
        document.querySelector(".health-bar").dataset.total = this.maxHp;
        document.querySelector(".health-bar").dataset.value = this.hp;
        document.querySelector(".bar").style.width = (this.hp / this.maxHp) * 100 + "%";

        score ? document.querySelector(".health-bar").style.display = "block" : '';
    }