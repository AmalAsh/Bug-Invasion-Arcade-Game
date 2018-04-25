//------- Enemies-------
class Enemy {
  constructor(){
    this.reset();
    this.sprite = 'images/enemy-bug.png';
  }

  checkCollision(){
    if (allPlayers[currentPlayer].y + 131 >= this.y + 90 &&
    allPlayers[currentPlayer].y + 73 <= this.y + 135 &&
    allPlayers[currentPlayer].x + 25 <= this.x + 88 &&
    allPlayers[currentPlayer].x + 76 >= this.x + 11) {
      collisionReset();
    }else if (allPlayers[currentPlayer].y<20) {
      if (currentPlayer>0){
        currentPlayer--; //next player
        allPlayers[currentPlayer].reset(); //bring the next player to the center
      }else { //this is the last player
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

  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x= this.x+this.velocity*dt;
    if (this.x > 707) {
          this.reset();
    }
    this.checkCollision();
  }

  // Draw the enemy on the screen, required method for game
  render(){
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}


//----------players-------------

class Player{
  constructor(n,img){
    this.order=n;
    this.reset();
    this.sprite = img;
    console.log(this);
  }

  reset(){
    if(currentPlayer===this.order){
      this.x = 300;
      if(this.order===3){ //first player
        this.y=377;
      }else{
        this.y = 460;
      }
    }else {
      this.x = 0+(this.order*100); //position the players waiting to be saved side by side
      this.y = 460;
    }
  }

  handleInput(key){
    if(key==='up'&& this.y > 0){
      this.y-=83;
    }else if (key==='right'&& this.x < 600) {
      this.x+=100;
    }else if (key==='left'&& this.x > 0) {
      this.x-=100;
    }else if (key==='down'&& this.y < 600) {
      this.y+=83;
    }
  }

  update(dt) {

  }

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
  currentPlayer=3;
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

// ----instantiate objects---------
//Enemies
let allEnemies=[];

for (let i=0; i<5; i++){
  allEnemies.push(new Enemy());
}

// Players
let allPlayers = [];

let currentPlayer = 3;

let charImgs = ['images/char-princess-girl.png',
  'images/char-boy.png',
  'images/char-catgirl.png',
  'images/char-horn-girl.png'];

for (let i=0; i<4; i++){
  allPlayers.push(new Player(i,charImgs[i]));
}

//----- supporting variables ----

let gameStatus="playing";

let lives = 3;
updateLives();

// -----This listens for key presses and sends the keys to your
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

//------Alerts for the 2 outcomes: winning and losing
let finishOutcomes = [{
  title: 'Oh no!',
  html: "<p>Looks like the bugs won this round</p>",
  confirmButtonColor: '#9ada75',
  confirmButtonText: 'Restart Game',
  allowOutsideClick: false
},
{
  title: 'What a hero!',
  html: "<p>You've saved everyone</p>",
  confirmButtonColor: '#9ada75',
  confirmButtonText: 'New Game',
  allowOutsideClick: false
}];
