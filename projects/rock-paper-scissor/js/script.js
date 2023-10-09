document.addEventListener("DOMContentLoaded", () => {

  let playerScore = 0;
  let computerScore = 0;
  let roundWinner = '';

  const result = document.getElementById('result');
  const reset = document.getElementById('reset');

  const endGameId = document.getElementById('end-game');

  let playerScoreID = document.getElementById('user-score');
  let computerScoreID = document.getElementById('computer-score');

  let playerChoice = document.getElementById('user-choice');
  let computerChoice = document.getElementById('computer-choice');

  const hand = document.getElementById('hand');
  const rock = document.getElementById('rock');
  const scissor = document.getElementById('scissor');

  const endGameModal = document.getElementById('end-game-modal');
  const overlay = document.getElementById('overlay');
  const endGameBtn = document.getElementById('end-game-btn');

  const getComputerChoice = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;

    switch(randomNumber) {
      case 1:
        return 'hand';
      case 2:
        return 'rock';
      case 3:
        return 'scissor';
    }
  }

  const update = (playerSelection, computerSelection) => {
    switch(playerSelection) {
      case 'hand':
        playerChoice.textContent = '✋';
        break;
      case 'rock':
        playerChoice.textContent = '✊';
        break;
      case 'scissor':
        playerChoice.textContent = '✌️';
        break;
    }

    switch(computerSelection) {
      case 'hand':
        computerChoice.textContent = '✋';
        break;
      case 'rock':
        computerChoice.textContent = '✊';
        break;
      case 'scissor':
        computerChoice.textContent = '✌️';
        break;
    }
  }

  const updateMessage = (roundWinner) => {

    playerScoreID.textContent = playerScore;
    computerScoreID.textContent = computerScore;

    if(roundWinner === 'player') {
      result.textContent = 'Player wins' 
      return;
    } else if(roundWinner === 'computer') {
      result.textContent = 'Computer wins' 
      return;
    }

    result.textContent = 'Tie'    
  }

  const playRound = (playerSelection, computerSelection) => {
    if(playerSelection === computerSelection) {
      roundWinner = 'Tie';
    }
    if (
      (playerSelection === 'rock' && computerSelection === 'scissor') ||
      (playerSelection === 'scissor' && computerSelection === 'hand') ||
      (playerSelection === 'hand' && computerSelection === 'rock')
    ) {
      playerScore++;
      roundWinner = 'player';
    }
    if (
      (computerSelection === 'rock' && playerSelection === 'scissor') ||
      (computerSelection === 'scissor' && playerSelection === 'hand') ||
      (computerSelection === 'hand' && playerSelection === 'rock')
    ) {
      computerScore++;
      roundWinner = 'computer';
    }

    updateMessage(roundWinner);
  }

  const gameOver = () => {
    return playerScore ===5 || computerScore === 5;
  }

  const endGame = () => {
    result.textContent = ' ';
    if(playerScore > computerScore) {
      endGameId.textContent = 'You Win!';
    }
    endGameId.textContent = 'You Lose!';

    endGameModal.classList.add('active')
    overlay.classList.add('active')

  }

  const handleClick = (playerSelection) => {
    const computerSelection = getComputerChoice();

    playRound(playerSelection, computerSelection);
    updateMessage(roundWinner);
    update(playerSelection, computerSelection);

    if(gameOver()) {
      endGame();
    }
  }

  const handleReset = () => {
    playerScore = 0;
    computerScore = 0;
    roundWinner = '';
    result.textContent = ' ';

    endGameId.textContent = '';

    playerChoice.textContent = '❔';
    computerChoice.textContent = '❔';

    playerScoreID.textContent = playerScore;
    computerScoreID.textContent = computerScore;

    closeEndGameModal();
  }

  const closeEndGameModal = () => {
    endGameModal.classList.remove('active')
    overlay.classList.remove('active')
  }
  
  hand.addEventListener('click', () => handleClick('hand'));
  rock.addEventListener('click', () =>  handleClick('rock'));
  scissor.addEventListener('click', () =>  handleClick('scissor'));

  endGameBtn.addEventListener('click', () => handleReset())

  reset.addEventListener('click', () => handleReset());

  });