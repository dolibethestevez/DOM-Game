/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, currentPlayer, prevRoll;
var diceDOM = document.querySelector('.dice');
var gamePlaying = true;
newGame();
//want to set up an eventLitener for when the roll the dice button is clicked
document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying){
    //need to calculate a random number for each die roll
    var dice = Math.floor(Math.random() * 6 + 1);
    //display the result
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    //update the roundScore, only if die roll !== 1
    if (dice !== 1) {
      if (prevRoll === 6 && dice === 6) {
        scores[currentPlayer] = 0;
        document.querySelector('#score-' + currentPlayer).textContent = '0';
        nextPlayer();
      }
      roundScore += dice;
      document.querySelector('#current-' + currentPlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
    prevRoll = dice;
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
    var input = document.querySelector('.final-score').value;
    var winningScore;
    if (input){
      winningScore = input;
    } else {
      winningScore = 100;
    }
      //check if the player won the game
    if (scores[currentPlayer] >= winningScore) {
      document.querySelector('#name-' + currentPlayer).textContent = 'Winner!';
      diceDOM.style.display = 'none';
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
}


function newGame(){
  gamePlaying = true;
  scores = [0, 0];
  roundScore = 0;
  currentPlayer = 0;

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
