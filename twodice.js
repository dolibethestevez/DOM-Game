/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls two dice as many times as they wishe. Each result get added to thier ROUND score
- BUT, if the player rolls a 1, all thier ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that thier ROUND score gets added to thier GLOBAL score.
After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, currentPlayer, prevRoll;
var diceDOM = document.querySelector('.dice1');
var gamePlaying = true;
newGame();
//want to set up an eventLitener for when the roll the dice button is clicked
document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying){
    //need to calculate a random number for each die roll
    var dice = Math.floor(Math.random() * 6 + 1);
    var dice2 = Math.floor(Math.random() * 6 + 1);
    //display the result
    document.querySelector('.dice2').style.display = 'block';
    diceDOM.style.display = 'block';

    diceDOM.src = 'dice-' + dice + '.png';
    document.querySelector('.dice2').src = 'dice-' + dice2 + '.png';

    //update the roundScore, only if die roll !== 1
    if (dice !== 1 && dice2 !== 1) {
      roundScore = roundScore + dice + dice2;
      document.querySelector('#current-' + currentPlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

//want to set up addEventListener for when the player wants to 'hold'
//their scores
document.querySelector('.btn-hold').addEventListener('click', function(){
  if (gamePlaying){
    // move the roundScore to the global score
    scores[currentPlayer] += roundScore;

    // update the UI
    document.querySelector('#score-' + currentPlayer).textContent = scores[currentPlayer];

    //check if the player won the game
    if (scores[currentPlayer] >= 100) {
      document.querySelector('#name-' + currentPlayer).textContent = 'Winner!';
      diceDOM.style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
      document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
      //document.querySelector('.btn-roll').addEventListener('click', newGame);
      gamePlaying = false;
    } else {
      //go to the next players
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', newGame);

function nextPlayer() {
  currentPlayer = (currentPlayer + 1) % 2;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  diceDOM.style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}

function newGame(){
  gamePlaying = true;
  scores = [0, 0];
  roundScore = 0;
  currentPlayer = 0;
  document.querySelector('.dice2').style.display = 'none';
  diceDOM.style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
