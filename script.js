const optionsForm = document.getElementById('options-form');
const turnDisplay = document.querySelector('.turn-display');
let turn;
let AI_mode;
let gameOver;

// Store the gameboard as an array inside of a Gameboard object
//
const gameBoard = (() => {
  const gameBoardArray = [,,,,,,,,,];

  return { 
    gameBoardArray,
  };
})();

// Players created via factory function
//
const Player = (playerName, mark, isPlaying) => {
  this.playerName = playerName;
  this.mark = mark;
  this.isPlaying = isPlaying;

  return { playerName, mark, isPlaying};
};


let player1 = Player('', 'X', true);
let player2 = Player('', 'O', false);

// Start game modal
const startGameBtnAction = (() => {
    document.getElementById('start-game__btn').addEventListener('click', () => {
    document.querySelector('.options-modal').style.display = 'block';
    document.querySelector('.backdrop').style.display = 'block';
  });
})();

// Get infos from form, then start game
const getFormData = (() => {optionsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(optionsForm);
  const optionsData = Object.fromEntries(formData);
  player1.playerName = optionsData.playerOneName;
  player2.playerName = optionsData.playerTwoName;
  if (optionsData.playerType === 'human') {
    AI_mode = false;
  } else if (optionsData.playerType === 'computer') {
    AI_mode = true;
  }
  document.querySelector('.options-modal').style.display = 'none';
  document.querySelector('.backdrop').style.display = 'none';
  newGame();
  });
})();

// Initialize game, set all variables to default state and empty the gameBoard array
const newGame = (() => {
  gameOver = false;
  gameBoard.gameBoardArray = [,,,,,,,,,]; // Reset current game
  turn = 0;
  player1.isPlaying = true;
  player2.isPlaying = false;
  turnDisplay.textContent = `${player1.playerName}'s turn ( X )`;
  document.querySelectorAll('.boardgame-box').forEach(box => {
    box.textContent = '';
  });
  gameFlow.launchGame(); // Launch the game's logic
});



// An object to control the flow of the game itself.
//
const gameFlow = (() => {
  const launchGame = () => {
    let boxId;
    let winner;
    const boardGameBox = document.querySelectorAll('.boardgame-box');
    boardGameBox.forEach(box => {
      box.addEventListener('click', (e) => {
      boxId = e.target.id; // Get the ID of the clicked box
      if (gameBoard.gameBoardArray[boxId] === undefined && !gameOver) { // Authorize move only if the clicked box is empty
        addMoveToArray(boxId);
        addMoveToDisplay(e.target, boxId);
        if (!AI_mode) {
          turnChange();
        } else if (AI_mode && (gameBoard.gameBoardArray).includes(undefined)) {
          AI_plays();
          turn++;
          checkWin(turn);
        }
        turn++;
        checkWin(turn);
        if (gameOver) {
          turnDisplay.textContent = '—  Game Over  —';
          gameOverModal();
        }
      }
      });
    });
  };
  
  // Fill the array with players' moves
  const addMoveToArray = (boxId) => {
    if (gameBoard.gameBoardArray[boxId] === undefined) {
    player1.isPlaying? gameBoard.gameBoardArray[boxId] = player1.mark : gameBoard.gameBoardArray[boxId] = player2.mark;
    }
  };
  
  // Render the contents of the gameboard array to the webpage
  const addMoveToDisplay = (target, boxId) => { 
    target.textContent= gameBoard.gameBoardArray[boxId];
    player1.isPlaying? target.style.color = '#93adcc' : target.style.color = 'RGB(245,249,173)';
  };

  const turnChange = () => {
    player1.isPlaying = !player1.isPlaying;
    player2.isPlaying = !player2.isPlaying;
    player1.isPlaying? turnDisplay.textContent = `${player1.playerName}'s turn ( ${player1.mark} )` : turnDisplay.textContent = `${player2.playerName}'s turn ( ${player2.mark} )`;
  };

  const checkWin = (turn) => {
    const movesBoard = gameBoard.gameBoardArray;
    for (let i = 0; i < 7; ) { // check rows
      if (movesBoard[i] !== undefined &&
        movesBoard[i] === movesBoard[i+1] &&
        movesBoard[i] === movesBoard[i+2]) {
        movesBoard[i] === 'X' ? winner = player1.playerName : winner = player2.playerName;
        gameOver = true;
      }
      i = i + 3;
    }
    for (let i = 0; i < 3; i++) { // check columns
      if (movesBoard[i] !== undefined &&
        movesBoard[i] === movesBoard[i+3] &&
        movesBoard[i] === movesBoard[i+6]) {
          movesBoard[i] === 'X' ? winner = player1.playerName : winner = player2.playerName;
          gameOver = true;
        }
    }
    if (movesBoard[4] !== undefined && // check diagonals
      (movesBoard[0] === movesBoard[4] && movesBoard[0] === movesBoard[8] ||
      movesBoard[2] === movesBoard[4] && movesBoard[2] === movesBoard[6])) {
        movesBoard[4] === 'X' ? winner = player1.playerName : winner = player2.playerName;
        gameOver = true;
      } else if (!gameBoard.gameBoardArray.includes(undefined)) {
      winner = 'tie';
      gameOver = true;
      }
  };

  const gameOverModal = () => {
    document.querySelector('.game-over-modal').style.display = 'flex';
    document.querySelector('.backdrop').style.display = 'block';
    if (winner === 'tie') {
      document.querySelector('.winner-text').textContent = `It's a tie!`;
    } else {
    document.querySelector('.winner-text').textContent = `${winner} wins!`;
    }
  };

  return {
    launchGame,
  };
})();

// Modals
const modalsHandler = (() => {
  document.querySelector('.close-modal__btn').addEventListener('click', () => {
    document.querySelector('.options-modal').style.display = 'none';
    document.querySelector('.game-over-modal').style.display = 'none';
    document.querySelector('.backdrop').style.display = 'none';
  });
  document.querySelector('.backdrop').addEventListener('click', () => {
    document.querySelector('.options-modal').style.display = 'none';
    document.querySelector('.game-over-modal').style.display = 'none';
    document.querySelector('.backdrop').style.display = 'none';
  });
})();


// Easy AI
// Generate a number between 0 and 9, fill the array by this index number if it is empty
const AI_plays = () => {
  let randomIndex = Math.floor(Math.random() * 9);
  if (gameBoard.gameBoardArray[randomIndex] === undefined) {
  gameBoard.gameBoardArray[randomIndex] = 'O';
  // Display move on page
  const randomIndexTarget = document.getElementById(randomIndex);
  randomIndexTarget.textContent = 'O';
  randomIndexTarget.style.color = '#ed7777';
  } else {
    AI_plays();
  }
  turnDisplay.textContent = `${player1.playerName}'s turn ( ${player1.mark} )`;
};
