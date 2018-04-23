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
    if (player.y + 131 >= this.y + 90 &&
    player.y + 73 <= this.y + 135 &&
    player.x + 25 <= this.x + 88 &&
    player.x + 76 >= this.x + 11) {
    console.log('collision');
    resetGame();
    }
  }

  reset(){
    this.x = -100;
    this.y = (Math.floor(Math.random() * 4) + 1) * 83 - 25;
    this.velocity = Math.floor(Math.random() * 300) + 170;
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
// This class requires an update(), render() and
// a handleInput() method.

class Player{
  constructor(){
    this.reset();
    this.sprite = 'images/char-boy.png';
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

function resetGame(){
  player.reset();
  lives--;
  if (lives<1){
    console.log("he dead");
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies=[];

for (let i=0; i<6; i++){
  allEnemies.push(new Enemy()); 
}

// Place the player object in a variable called player
let player = new Player();

let lives = 3;
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
