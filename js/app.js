// Enemies our player must avoid
console.log("app");
class Enemy {
  constructor(){
    this.reset();
    // speed/vel....3-
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }

  checkCollision(){
    if (allPlayers[currentPlayer].y + 131 >= this.y + 90 &&
    allPlayers[currentPlayer].y + 73 <= this.y + 135 &&
    allPlayers[currentPlayer].x + 25 <= this.x + 88 &&
    allPlayers[currentPlayer].x + 76 >= this.x + 11) {
      console.log('collision');
      collisionReset();
    }else if (allPlayers[currentPlayer].y<20) {
      console.log('won');
      if (currentPlayer<3){
        currentPlayer++;
      }else {
        if(gameStatus==="playing"){ //ensures this is excuted only once
          document.removeEventListener('keyup', keyupListner);
          gameStatus="winning";
          swal(finishOutcomes[1]).then((result) => {
            if (result.value) {
              restartGame();
            }
          });
        }
      }
    }
  }

  reset(){
    this.x = Math.floor(Math.random() * -300) - 100;
    this.y = (Math.floor(Math.random() * 4) + 1) * 83 - 25;
    this.velocity = Math.floor(Math.random() * 300) + 180;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x= this.x+this.velocity*dt;
    if (this.x > 707) {
          this.reset();
    }
    this.checkCollision();
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
  }

  // Draw the enemy on the screen, required method for game
  render(){
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}


// Now write your own player class


class Player{
  constructor(img){
    this.reset();
    this.sprite = img;
    console.log(this);
  }

  reset(){
    this.x = 300; //-----------start in center
    this.y = 460; //-----------start low
  }

  handleInput(key){
    if(key==='up'&& this.y > 0){
      this.y-=83;
    }else if (key==='right'&& this.x < 400) {
      this.x+=100;
    }else if (key==='left'&& this.x > 0) {
      this.x-=100;
    }else if (key==='down'&& this.y < 600) {
      this.y+=83;
    }
    //console.log(this.x +"  and  "+this.y);
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {

      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
  }

  // Draw the enemy on the screen, required method for game
  render(){
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

}

function collisionReset(){ //resets player position after collision
  allPlayers[currentPlayer].reset();
  lives--;
  updateLives();
  if (lives<1){
    console.log("he dead");
    document.removeEventListener('keyup', keyupListner);
    swal(finishOutcomes[0]).then((result) => {
      if (result.value) {
        restartGame();
      }
    });
  }
}

function restartGame(){
  gameStatus="playing";
  currentPlayer=0;
  lives = 3;
  updateLives();
  allPlayers.forEach(function(element) {
      element.reset();
    }
  );
  allEnemies.forEach(function(element) {
      element.reset();
    }
  );
  document.addEventListener('keyup', keyupListner);
}

function updateLives(){
  let s='';
  for(let i=0; i<lives; i++){
    s=s+'<img class="hearts" src="images/Heart.png">  ';
  }
  console.log(s);

  $("#lives").html(s);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies=[];

for (let i=0; i<5; i++){
  allEnemies.push(new Enemy());
}

// Place all player objects in an array called allEnemies
let allPlayers = [];
let playersImgs = ['images/char-boy.png',//'images/char-boy.png','images/char-boy.png','images/char-boy.png'];
'images/char-boy.png',
'images/char-boy.png',
'images/char-boy.png'];
let currentPlayer = 0;

for (let i=0; i<4; i++){
  allPlayers.push(new Player(playersImgs[i]));
}
// Place the player object in a variable called player
//let player = new Player();

let lives = 3;
updateLives();

let gameStatus="playing";
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', keyupListner);

function keyupListner(e){
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };

  allPlayers[currentPlayer].handleInput(allowedKeys[e.keyCode]);
}

let finishOutcomes = [{
  title: 'oops!',
  html: '<p>You dead</p>',
  confirmButtonColor: '#8cd0e8',
  confirmButtonText: 'Restart Game',
  allowOutsideClick: false
},
{
  title: 'Congrats!',
  html: '<p>You finished the game</p>',
  confirmButtonColor: '#8cd0e8',
  confirmButtonText: 'New Game',
  allowOutsideClick: false
}];
