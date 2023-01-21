const turnDisplay = document.querySelector('.turn-display');
let turn;
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

let player1 = Player('Player One', 'X', true);
let player2 = Player('Player Two', 'O', false);


// An object to control the flow of the game itself.
//
const gameFlow = (() => {
  const launchGame = () => {
    let boxId;
    let winner = undefined;
    const boardGameBox = document.querySelectorAll('.boardgame-box');
    boardGameBox.forEach(box => {
      box.addEventListener('click', (e) => {
      boxId = e.target.id; // Get the ID of the clicked box
      if (gameBoard.gameBoardArray[boxId] === undefined && !gameOver) { // Authorize move only if the clicked box is empty
        addMoveToArray(boxId);
        addMoveToDisplay(e.target, boxId);
        turnChange();
        turn++;
        console.log();
        checkWin(turn);
        if (gameOver) {
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
    player1.isPlaying? turnDisplay.textContent = `Player One\'s turn ( ${player1.mark} )` : turnDisplay.textContent = `Player Two\'s turn ( ${player2.mark} )`;
  };

  const checkWin = (turn) => {
    const movesBoard = gameBoard.gameBoardArray;
    for (let i = 0; i < 7; ) { // check rows
      if (movesBoard[i] !== undefined &&
        movesBoard[i] === movesBoard[i+1] &&
        movesBoard[i] === movesBoard[i+2]) {
        console.log('win by row');
        movesBoard[i] === 'X' ? winner = `${player1.playerName}` : winner = `${player2.playerName}`;
        console.log(winner);
        gameOver = true;
      }
      i = i + 3;
    }
    for (let i = 0; i < 3; i++) { // check columns
      if (movesBoard[i] !== undefined &&
        movesBoard[i] === movesBoard[i+3] &&
        movesBoard[i] === movesBoard[i+6]) {
          movesBoard[i] === 'X' ? winner = `${player1.playerName}` : winner = `${player2.playerName}`;
          gameOver = true;
          console.log('win by column');
        }
    }
    if (movesBoard[4] !== undefined && // check diagonals
      (movesBoard[0] === movesBoard[4] && movesBoard[0] === movesBoard[8] ||
      movesBoard[2] === movesBoard[4] && movesBoard[2] === movesBoard[6])) {
        movesBoard[4] === 'X' ? winner = `${player1.playerName}` : winner = `${player2.playerName}`;
        console.log('win by diagonal');
        gameOver = true;
      }
    if (turn === 9) {
      console.log('It\'s a tie');
      winner = 'Tie';
      gameOver = true;
    }
  };

  const gameOverModal = () => {
    document.querySelector('.game-over-modal').style.display = 'block';
    document.querySelector('.backdrop').style.display = 'block';
    document.querySelector('.winner-text').textContent = `${winner} wins!`;
  };

  return {
    launchGame,
  };
})();


// Initialize game
const newGame = (() => {
  document.getElementById('start-game__btn').addEventListener('click', () => {
    gameOver = false;
    gameBoard.gameBoardArray = []; // Reset current game
    turn = 0;
    player1.isPlaying = true;
    player2.isPlaying = false;
    turnDisplay.textContent = `Player One\'s turn ( X )`;
    document.querySelectorAll('.boardgame-box').forEach(box => {
      box.textContent = '';
    });
    gameFlow.launchGame(); // Launch the game's logic
  });
})();

// Modals
const modalsHandler = (() => {
  document.querySelector('.close-modal__btn').addEventListener('click', () => {
    document.querySelector('.options-modal').style.display = 'none';
    document.querySelector('.game-over-modal').style.display = 'none';
    document.querySelector('.backdrop').style.display = 'none';
  });
})();


// OLD CODE

// Write a JavaScript function that will render the contents of the gameboard array to the webpage
// Get the ID of the clicked box
/*const getBoxID = (() => {
  let boxId;
  const boardGameBox = document.querySelectorAll('.boardgame-box');
  boardGameBox.forEach(box => {
    box.addEventListener('click', (e) => {
    boxId = e.target.id;
    addMoveToArray(boxId);
    addMoveToDisplay(e.target, boxId);
    console.log(gameBoard.gameBoardArray);
    });
  });

  return { boxId };
})();

// Fill the array with players' moves
const addMoveToArray = (boxId) => {
  if (gameBoard.gameBoardArray[boxId] === undefined) {
  player1.isPlaying? gameBoard.gameBoardArray[boxId] = player1.mark : gameBoard.gameBoardArray[boxId] = player2.mark;
  }
  player1.isPlaying = !player1.isPlaying;
};

// Edit DOM to display moves
const addMoveToDisplay = (target, boxId) => {
  target.textContent= gameBoard.gameBoardArray[boxId];
};*/

