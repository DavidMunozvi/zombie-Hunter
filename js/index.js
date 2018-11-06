window.onload = function() {
  var game = new Game("canvas");
  
  document.getElementById("pause-button").onclick = function(){
    game.stopGame()
    
  };
  document.getElementById("level1-btn").onclick = function(){
    document.getElementById("levels-cont").style.display = "none";
    document.getElementById("canvas-cont").style.display = "flex";


    game.start()

};

document.getElementById("play-btn").onclick = function(){
    document.getElementById("play-cont").style.display = "none";
    document.getElementById("levels-cont").style.display = "block";
  };
}